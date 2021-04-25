import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
import Image from 'next/image'
import { useRouter } from 'next/router'



const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Projects',
});

export default function Home({ data }) {

    const router = useRouter()
    const { id } = router.query
    return (
        <Layout title={id}>
            <article>
                <h1>
                    {id}
                </h1>
                <Image
                    src={data[0].fields.Image[0].thumbnails.large.url}
                    layout='fill'
                />
                <div>
                    {data[0].fields.Typology}
                </div>
            </article>
        </Layout>
    );
}




export async function getStaticProps({params}) {
    const data = await airtable.read({
        filterByFormula: `Name = "${params.id}"`,
        maxRecords: 1
    });
    return { props: { data } }
}
export async function getStaticPaths() {
    let paths = await airtable.read({
        filterByFormula: `NOT({Image} = '')`},{
        tableName: 'Projects'
    });
    paths = paths.map((el,i)=>{
        return({params : {id : el.fields.Name}})
    })

    return {
        paths: paths,
        fallback: false // See the "fallback" section below
  };
}