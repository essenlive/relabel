import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import {LabelProduction} from '@components/Labels';
import styles from "@styles/pages/SingleProject.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'


export default function Project({ id, name, typology, description, illustrations, team, designers, workshops, suppliers, duration, production, gestion, materials, date, data }) {
    return (
        <Layout title={name} padded>
            <div className={styles.banner}>
                <div className={styles.title}>
                    {name && (<h1> {name} </h1>)}
                </div>
                <div className={styles.description}>
                    {description && (<p> {description} </p>)}
                </div>

                <div className={styles.carousel}>
                    {illustrations && (
                        <Carousel images={illustrations} />
                    )}
                </div>


                <div className={styles.certificate}>
                    <Link href={""}>
                        <p> Voir le certificat </p>
                    </Link>
                </div>

                <div className={styles.label}>
                    <LabelProduction
                        data={data}
                        date={{
                            day: date ? new Date(date).getDate() : new Date().getDate(),
                            month: date ? new Date(date).getMonth() + 1 : new Date().getMonth() + 1,
                            year: date ? new Date(date).getYear() + 1900 : new Date().getYear() + 1900
                        }}
                        name={name}
                        structure={designers}
                    />
                    
                </div>

            </div>
        </Layout>
    );
}

   



export async function getStaticProps({params}) {
    let project = await airtable_api.getProjects({ id: params.id });
    project = project[0];
    project.designers = await Promise.all(project.designers.map(async (structure) => {
        let structureName = await airtable_api.getStructures({ id: structure });
        return structureName[0].name
    }))
    project.data = {
        partners: project.designers.length + project.workshops.length + project.suppliers.length,
        materials: project.materials,
        gestion: project.gestion,
        production: project.production
    }
    
    return {
        props: project,
        revalidate: 1,
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: "blocking" };
}