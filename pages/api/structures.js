import prisma, { filter, createApi } from '@libs/prisma'

export default async (req, res) => {
    //GET ONE OR MANY ENTRIES
    if (req.method === 'GET') {
        try {
            let data = await prisma.structure.findMany();
            //Added own filter function instead of Prisma because of Boolean parsing
            let filteredData = filter(data, req.query)
            res.status(200).json(filteredData)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }

    //CREATE A NEW ENTRY
    else if (req.method === 'POST') {
        let fields = req.body.map(el => ({ fields: el }));
        fields = await Promise.all(fields.map(async structure => {
            if (structure.fields.adress) {
                const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${structure.fields.adress.replace(/ /g, "+")}`);
                const data = await response.json();
                structure.fields.longitude = data.features[0].geometry.coordinates[0]
                structure.fields.latitude = data.features[0].geometry.coordinates[1]
            }
            return structure
        }));

        try {
            let response = await createApi('structures', fields)
            res.status(200).json(response);
            res.end()
            return
        } catch (error) {
            res.status(500).json(error);
            res.end()
            return
        }
    }
    else {
        res.status(404)
    }
}