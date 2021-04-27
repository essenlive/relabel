import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
import Tag from '@components/Tag'
import Label from '@components/Label';
import styles from "@styles/pages/Project.module.css";
import Carousel from "@components/Carousel";

const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Datas',
});

export default function Structure({ name, date, illustrations, status, description, adress, activity, partners, production, gestion, materials, partnersCount }) {
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
                            status={status}
                            date={date.split("-")[0]}
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
                        {activity && (<div>{ activity.map((item, i) => (<Tag key={i} content={item} />))}</div>)}
                        {adress && (<div> {adress} </div>)}
                        {partners && ( <div>
                            {/* {partners.map((item, i) => (<span key={i}>{item} </span>))} */}
                        </div>)}
                    </div>


                </div>

            </article>
        </Layout>
    );
}




export async function getStaticProps({ params }) {
    let data;
    let structureData = await airtable.read({
        filterByFormula: `Structure = "${params.id}"`,
        maxRecords: 1,
    }, {
        tableName: 'Datas'
    });
    let structure = await airtable.read({
        filterByFormula: `Name = "${params.id}"`,
        maxRecords: 1,
    }, {
        tableName: 'Structures'
    });
    data = { ...structureData[0].fields, ...structure[0].fields };
    const mapping = {
        name: "Name",
        illustrations: "Illustration",
        description: "Description",
        adress: "Adress",
        date: "Year",
        status: "Status",
        activity: "Activity",
        partners: "Partners",
        production: "Production",
        gestion: "Gestion",
        materials: "Materials",
        partnersCount: "PartnersCount"
    }
    for (const key in mapping) {mapping[key] = typeof data[mapping[key]] !== 'undefined' ? data[mapping[key]] : null;}
    return { props: mapping }
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