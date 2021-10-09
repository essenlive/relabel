import Airtable from 'airtable'
const base = new Airtable({
    apiKey: process.env.AIRTABLE_APIKEY,
    endpointUrl: "https://proxy.syncinc.so/api.airtable.com",
}).base(process.env.AIRTABLE_BASEID);



export default function handler(req, res) {

    if (req.method === 'POST') {
        let fields = req.body
        base('Communities').create(fields, { typecast: true }, function (err, record) {
            if (err) { console.error(err); }
            res.status(200).json(record);
            res.end()
        });
    } else {
        res.status(500)
        res.end()
    }
    
}
