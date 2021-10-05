import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import {LabelProduction} from '@components/Labels';
import styles from "@styles/pages/SingleProject.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'


export default function Project({ name, illustrations, description, date, data, structure }) {
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
                        date={date}
                        name={name}
                        structure={structure}
                    />
                    
                </div>

            </div>
        </Layout>
    );
}

   



export async function getStaticProps({params}) {
    let project = await airtable_api.getProjects({ id: params.id });
    project = project[0];
    project.structure = await Promise.all(project.structure.map(async (el)=>{
        let structure = await airtable_api.getStructures({ id: el });
        return structure[0]
    }))

    project.data = {
        partners: project.partnerscount,
        materials: project.materials,
        gestion: project.gestion,
        production: project.production
    }
    project.date = {
        day: new Date(project.created_time).getDate(),
        month: new Date(project.created_time).getMonth() + 1
    }
    project.structure = project.structure.map((el)=>el.name)

    
    return {
        props: project,
        revalidate: 1,
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}