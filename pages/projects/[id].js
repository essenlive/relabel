import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
import Image from 'next/image'
import Tag from '@components/Tag'
import { useRouter } from 'next/router'
import Sketch from '@components/Sketch';



const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Projects',
});

export default function Project({ Name, Illustration, Address, Typology, Team, Duration, Partners, Production, Gestion, Materials, PartnersCount }) {
    const router = useRouter()
    const { id } = router.query
    return (
        <Layout title={id}>
            <article>
                {Illustration && (<Image
                    src={Illustration[0].thumbnails.large.url}
                    layout='fill'
                    />)}
                {Name && (<h1> {Name} </h1>)}
                {Typology && (<div> {Typology} </div>)}
                {Team && (<div>
                    {Team.map((item, i) => (<Tag key={i} content={item} />))} 
                </div>)}
                {Address && ( <div>
                    {Address}
                </div>)}
                {Duration && ( <div>
                    {Duration}
                </div>)}
                {Partners && ( <div>
                    {Partners.map((item, i) => (<Tag key={i} content={item} />))}
                </div>)}
                <Sketch
                    partners={PartnersCount}
                    materials={Materials}
                    gestion={Gestion}
                    production={Production}
                />
            </article>
        </Layout>
    );
}




export async function getStaticProps({params}) {
    let data = await airtable.read({
        filterByFormula: `Name = "${params.id}"`,
        maxRecords: 1
    });
    data = data[0].fields;
    return { props: data }
}
export async function getStaticPaths() {
    let paths = await airtable.read({
        filterByFormula: `NOT({Illustration} = '')`},{
        tableName: 'Projects'
    });
    paths = paths.map((el,i)=>{
        return({params : {id : el.fields.Name}})
    })

    return {
        paths: paths,
        fallback: false
  };
}