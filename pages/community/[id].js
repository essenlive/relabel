import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
import Sketch from '@components/Sketch';
import { useRouter } from 'next/router'



const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'StructuresDatas',
});

export default function Home({ data }) {

    const router = useRouter()
    const { id } = router.query
    return (
        <Layout title='Home'>
            <article>
                <h1>
                    {id}
                 </h1>
                <Sketch data={data} />
            </article>
        </Layout>
    );
}




export async function getStaticProps({params}) {
    const data = await airtable.read({
        filterByFormula: `Structure = "${params.id}"`,
        maxRecords: 1
    });
    return { props: { data } }
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