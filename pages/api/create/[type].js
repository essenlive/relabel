import Airtable from 'airtable'
import util from 'util'
import fetch from 'node-fetch'

const base = new Airtable({
    apiKey: process.env.AIRTABLE_APIKEY,
    endpointUrl: "https://proxy.syncinc.so/api.airtable.com",
}).base(process.env.AIRTABLE_BASEID);



export default async function handler (req, res) {
    if (req.method === 'POST') {
        const { type } = req.query;
        let fields = req.body.map((el)=>({fields : el}));
        let create;
        switch (type) {
            case "community": {create = util.promisify(base('Communities').create); break}
            case "structure": { 
                create = util.promisify(base('Structures').create);
                let adress = fields.adress.replace(/ /g, "+")
                const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${adress}`);
                const data = await response.json();
                fields.longitude = data.features[0].geometry.coordinates[0]
                fields.latitude = data.features[0].geometry.coordinates[1]
                break 
            }
            case "project": {create = util.promisify(base('Projects').create); break}
            default : 
                res.status(500)
                res.end()
                return
        }
        try {
            let response = await create(fields, { typecast: true })
            res.status(200).json(response);
            res.end()
            return
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
            res.end()
            return
        }
    }

}