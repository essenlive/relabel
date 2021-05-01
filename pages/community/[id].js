import airtable_api from '@libs/airtable_api';
import Layout from '@components/Layout'
import Tag from '@components/Tag'
import Label from '@components/Label';
import styles from "@styles/pages/Project.module.css";
import Carousel from "@components/Carousel";


export default function Structure({ name, date, illustrations, status, description, adress, activity, datas }) {
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
                            date={datas.date.split("-")[0]}
                            data={{
                                partners: datas.partnersCount,
                                materials: datas.materials,
                                gestion: datas.gestion,
                                production: datas.production
                            }}
                        />
                    </div>

                    <div className={styles.infos}>
                        {name && (<h1 className={styles.name}> {name} </h1>)}
                        {activity && (<div>{ activity.map((item, i) => (<Tag key={i} content={item} />))}</div>)}
                        {adress && (<div> {adress} </div>)}
                    </div>


                </div>

            </article>
        </Layout>
    );
}




export async function getStaticProps({ params }) {
    let structure = await airtable_api.getStructures({ name: params.id });
    structure = structure[0];
    if (!!structure.datas) {
        structure.datas = await airtable_api.getDatas({ id: structure.datas[0] })
        structure.datas = structure.datas[0];
    }
    else{
        structure.datas = {
            date : 'NC-01-01',
            partners: [],
            production: 0,
            gestion: 0,
            materials: 0,
            partnersCount : 0
        }
    }   
    return { props: structure }
}


export async function getStaticPaths() {
    // let paths = await airtable_api.getStructures({ datas: true });
    let paths = await airtable_api.getStructures();
    paths = paths.map((el) => ({ params: { id: el.name } }))
    return { paths: paths, fallback: false };
}