import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import LabelProject from '@components/LabelProject';
import styles from "@styles/pages/SingleProject.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'


export default function Project({project}) {
    return (
        <Layout title={project.name} padded>
            <div className={styles.banner}>
                <div className={styles.title}> {project.name && (<h1> {project.name} </h1>)} </div>
                <div className={styles.description}> {project.description && (<p> {project.description} </p>)}</div>
                <div className={styles.carousel}>
                    {project.illustrations && (
                        <Carousel images={project.illustrations} />
                    )}
                </div>

                <div className={styles.certificate}>
                    {/* <Link href={""}> <p> Voir le certificat </p></Link> */}
                </div>

                <div className={styles.label}> <LabelProject project={project}/></div>
            </div>
        </Layout>
    );
}

   



export async function getStaticProps({params}) {
    let project = await airtable_api.getProjects({ id: params.id });
    project = project[0];
    project.designers = await Promise.all(project.designers.map(async (structure) => {
        let structureEntity = await airtable_api.getStructures({ id: structure });
        return structureEntity[0]
    }))
    return {
        props: {project},
        revalidate: 1,
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: "blocking" };
}