import Airtable from 'airtable'
const base = new Airtable({
    apiKey: process.env.AIRTABLE_APIKEY,
    endpointUrl: "https://api.airtable.com",
}).base(process.env.AIRTABLE_BASEID);



export default function handler(req, res) {

    if (req.method === 'POST') {
        let fields = req.body
        delete fields.cities
        console.log(fields);
        // Handle any other HTTP method
        base('Communities').create([{ fields }], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            res.status(200).json(records)
        });
    } else {
    }
    
}
