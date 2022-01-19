import Airtable from 'airtable'
import fetch from 'node-fetch'

const base = new Airtable({
    apiKey: process.env.AIRTABLE_APIKEY,
    endpointUrl: "https://proxy.syncinc.so/api.airtable.com",
}).base(process.env.AIRTABLE_BASEID);

const createApi = (type, fields) => {
    return new Promise((resolve, reject) => {
        base(type).create(fields, { typecast: true }, function (err, records) {
            if (err) { reject(err); }
            resolve(records);
        });
    });
}



export default async function handler (req, res) {
    if (req.method === 'POST') {
        const { type } = req.query;
        let fields = req.body.map((el) => {
            delete el.rgpd
            return ({ fields: el })
        });
        if (type === "structures" ) {
            fields = await Promise.all(fields.map(async structure => {
                if (structure.fields.adress){
                    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${structure.fields.adress.replace(/ /g, "+")}`);
                    const data = await response.json();
                    structure.fields.longitude = data.features[0].geometry.coordinates[0]
                    structure.fields.latitude = data.features[0].geometry.coordinates[1]
                }
                return structure
            }));
        }

        try {
            let response = await createApi(type, fields)
            res.status(200).json(response);
            res.end()
            return
        } catch (error) {
            res.status(500).json(error);
            res.end()
            return
        }
    }

}
