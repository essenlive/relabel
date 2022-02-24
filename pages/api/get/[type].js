import airtable_api from '@libs/airtable_api';

export default async function handler (req, res) {
    if (req.method === 'GET') {
        const { type } = req.query;
        let response;
        if (type === "structures") response = await airtable_api.getStructures()
        if (type === "communities") response = await airtable_api.getCommunities()
        if (type === "projects") response = await airtable_api.getProjects()

        if(response){
            res.status(200).json(response);
            res.end()
            return
        }
        else{
            res.status(500).json(error);
            res.end()
            return
        }
    }
}
