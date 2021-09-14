import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
// import Label from '@components/Label';
import styles from "@styles/pages/SingleProject.module.css";
import Carousel from "@components/Carousel";
import { Title, Text, Image } from '@mantine/core';
import Link from 'next/link'


export default function Project({ name, illustrations, description, address, typology, team, duration, partners, production, gestion, materials, partnerscount, structure }) {
    return (
        <Layout padded title={name}>
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

                    <div className={styles.icon}><Image
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                        src="/assets/label-comm-placeholder.png"
                        height={200}
                        alt="Photo d'illustration"
                    /></div>
                    <h2> {name}</h2>

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
    return { props: project[0]}
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects({ illustrations: true });
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}