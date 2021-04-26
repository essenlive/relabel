import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
import Tag from '@components/Tag'
import Label from '@components/Label';
import styles from "@styles/pages/Project.module.css";
import Carousel from "@components/Carousel";



const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Projects',
});

export default function Project({ Name, Illustration, Address, Typology, Team, Duration, Partners, Production, Gestion, Materials, PartnersCount }) {
    return (
        <Layout title={Name}>
            <article>

                {Illustration && (
                    <div
                        className={styles.illustration}>

                    <Carousel
                        images={Illustration}
                        />
                    </div>
                )}
                <div className={styles.content}>
                    <div className={styles.label}>

                        <Label
                            title={Name}
                            status={Typology}
                            date={Duration}
                            data={{
                                partners: PartnersCount,
                                materials: Materials,
                                gestion: Gestion,
                                production: Production
                            }}
                        />
                    </div>

                    {Name && (<h1> {Name} </h1>)}
                    {Typology && (<div> {Typology} </div>)}
                    {Team && (<div>
                        {Team.map((item, i) => (<Tag key={i} content={item} />))} 
                    </div>)}
                    {/* {Address && ( <div>
                        {Address}
                    </div>)}
                    {Duration && ( <div>
                        {Duration}
                    </div>)} */}
                    {Partners && ( <div>
                        {Partners.map((item, i) => (<Tag key={i} content={item} />))}
                    </div>)}


                </div>

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