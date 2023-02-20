export default async (req, res) => {
    //GET ONE OR MANY ENTRIES
    if (req.method === 'GET') {
        try {
            const response = await fetch(process.env.BUILD_HOOK);
            res.status(200).json(response)
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }

    else {
        res.status(404)
    }
}