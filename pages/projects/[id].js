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

export default function Project({ name, illustrations, description, address, typology, team, duration, partners, production, gestion, materials, partnersCount }) {
    return (
        <Layout title={name}>
            <article className={styles.project}>

                {illustrations && (
                    <div
                        className={styles.illustration}>

                    <Carousel
                        images={illustrations}
                        />
                    </div>
                )}
                <div className={styles.content}>
                    <div className={styles.label}>

                        <Label
                            size="small"
                            title={name}
                            status={typology}
                            date={duration}
                            data={{
                                partners: partnersCount,
                                materials: materials,
                                gestion: gestion,
                                production: production
                            }}
                        />
                    </div>

                    <div className={styles.infos}>
                        {name && (<h1 className={styles.name}> {name} </h1>)}
                        {typology && (<div><Tag content={typology} /></div>)}
                        {team && (<div>
                            {team.map((item, i) => (<span key={i}>{item} </span>))} 
                        </div>)}
                        {description && (<div> {description} </div>)}
                    {/* {address && ( <div>
                        {address}
                    </div>)}
                    {duration && ( <div>
                        {duration}
                    </div>)} */}
                    {/* {partners && ( <div>
                        {partners.map((item, i) => (<span key={i}>{item} </span>))}
                    </div>)} */}
                    </div>


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
    const mapping = {
        name : "Name",
        illustrations: "Illustration",
        description: "Description",
        address: "Address",
        typology: "Typology",
        team: "Team",
        duration: "Duration",
        partners: "Partners",
        production: "Production",
        gestion: "Gestion",
        materials: "Materials",
        partnersCount: "PartnersCount"
    }
    for (const key in mapping) { mapping[key] = typeof data[mapping[key]] !== 'undefined' ? data[mapping[key]] : null;}
    return { props: mapping}
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