import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import LabelProduction from '@components/LabelProduction';
import styles from "@styles/pages/SingleProject.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'


export default function Project({ name, illustrations, description, data, structure }) {
    return (
        <Layout title={name}>
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
    project[0].structure = await Promise.all(project[0].structure.map(async (el)=>{
        let structure = await airtable_api.getStructures({ id: el });
        return structure[0]
    }))
    project[0].data = {
        partners: project[0].partnerscount,
        materials: project[0].materials,
        gestion: project[0].gestion,
        production: project[0].production
    }
    project[0].structure = project[0].structure.map((el)=>el.name)
    
    return { props: project[0]}
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}