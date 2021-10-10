import Airtable from 'airtable'
import util from 'util'

const base = new Airtable({
    apiKey: process.env.AIRTABLE_APIKEY,
    endpointUrl: "https://proxy.syncinc.so/api.airtable.com",
}).base(process.env.AIRTABLE_BASEID);



export default async function handler (req, res) {
    const { type } = req.query
    switch (type) {
        case "community": {
            const baseCreate = util.promisify(base('Communities').create)
            if (req.method === 'POST') {
                let fields = req.body
                try {
                    let response = await baseCreate(fields, { typecast: true })
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
        case "structure": {
            const baseCreate = util.promisify(base('Structures').create)
            if (req.method === 'POST') {
                let fields = req.body
                try {
                    let response = await baseCreate(fields, { typecast: true })
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
        default :
        res.status(500)
        res.end()
    }

}
