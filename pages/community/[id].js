import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
import Sketch from '@components/Sketch';
import { useRouter } from 'next/router'

const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'StructuresDatas',
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
        production : data[0].fields.StrucPROD,
        gestion: data[0].fields.StrucGESTION,
        partners: data[0].fields.StrucPARTENAIRES,
        materials: data[0].fields.StrucMATERIAUX
    }
    return { props: data }
}
export async function getStaticPaths() {
    let paths = await airtable.read({
        filterByFormula: `NOT({StructureDatas} = '')`},{
        tableName: 'StructuresID'
    });
    paths = paths.map((el,i)=>{
        return({params : {id : el.fields.StrucID}})
    })

    return {
        paths: paths,
        fallback: false // See the "fallback" section below
  };
}