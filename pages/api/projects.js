import prisma, { filter, createApi } from '@libs/prisma'

export default async (req, res) => {
    //GET ONE OR MANY ENTRIES
    if (req.method === 'GET') {
        try {
            let data = await prisma.project.findMany();
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

        try {
            let response = await createApi('projects', fields)
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