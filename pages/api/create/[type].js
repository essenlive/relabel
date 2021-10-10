import Airtable from 'airtable'
import util from 'util'

const base = new Airtable({
    apiKey: process.env.AIRTABLE_APIKEY,
    endpointUrl: "https://proxy.syncinc.so/api.airtable.com",
}).base(process.env.AIRTABLE_BASEID);



export default async function handler (req, res) {
    if (req.method === 'POST') {
        const { type } = req.query;
        const fields = req.body;
        let create;
        switch (type) {
            case "community": {create = util.promisify(base('Communities').create); break}
            case "structure": { create = util.promisify(base('Structures').create); break }
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
