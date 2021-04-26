import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
import Sketch from '@components/Sketch';
import { useRouter } from 'next/router'

const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Datas',
});

export default function Structure(props) {

    const router = useRouter()
    const { id } = router.query
    return (
        <Layout title={id}>
            <article>
                <h1>
                    {id}
                </h1>
                <Sketch
                    partners={props.partners}
                    production={props.production}
                    gestion={props.gestion}
                    materials={props.materials}
                />
            </article>
        </Layout>
    );
}




export async function getStaticProps({params}) {
    let data = await airtable.read({
        filterByFormula: `Structure = "${params.id}"`,
        maxRecords: 1
    });
    data = {
        production : data[0].fields.Production,
        gestion: data[0].fields.Gestion,
        partners: data[0].fields.PartnersCount,
        materials: data[0].fields.Materials
    }
    return { props: data }
}
export async function getStaticPaths() {
    let paths = await airtable.read({
        filterByFormula: `NOT({Datas} = '')`},{
        tableName: 'Structures'
    });
    paths = paths.map((el,i)=>{
        return({params : {id : el.fields.Name}})
    })

    return {
        paths: paths,
        fallback: false
  };
}