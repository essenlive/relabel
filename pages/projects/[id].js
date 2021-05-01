import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import Tag from '@components/Tag'
import Button from '@components/Button'
import Label from '@components/Label';
import styles from "@styles/pages/Project.module.css";
import Carousel from "@components/Carousel";


export default function Project({ name, illustrations, description, address, typology, team, duration, partners, production, gestion, materials, partnersCount, structure }) {
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
                        {structure && (<div>
                            {structure.map((item, i) => (
                                <Button
                                    key={i}
                                    link={{
                                        pathname: '/community/[id]',
                                        query: { id: item.name },
                                    }}
                                    content="Voir la structure"
                                >
                                </Button>))}
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
    let project = await airtable_api.getProjects({ name: params.id });
    project[0].structure = await Promise.all(project[0].structure.map(async (el)=>{
        let structure = await airtable_api.getStructures({ id: el });
        return structure[0]
    }))
    return { props: project[0]}
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects({ illustrations: true });
    paths = paths.map((el) => ({ params: { id: el.name } }))
    return { paths: paths, fallback: false };
}