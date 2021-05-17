import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import Label from '@components/Label';
import styles from "@styles/pages/SinglePage.module.css";
import Carousel from "@components/Carousel";
import { Title, Text, Badge, Button } from '@mantine/core';
import Link from 'next/link'


export default function Project({ name, illustrations, description, address, typology, team, duration, partners, production, gestion, materials, partnersCount, structure }) {
    console.log(structure);
    return (
        <Layout title={name}>
            <article className={styles.project}>

                {illustrations && (
                    <div className={styles.illustration}>
                        <Carousel images={illustrations} />
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
                        {structure && (<Link
                            href={{
                                pathname: '/community/[id]',
                                query: { id: structure[0].name },
                            }}>
                            <Button variant="link" > {structure[0].name} </Button>
                        </Link>)}
                        {name && (<Title order={1}> {name} </Title>)}
                        {typology && (<Badge variant="filled">{typology}</Badge>)}
                        {/* {team && (<div>
                            {team.map((item, i) => (<Text component="span" key={i}>{item} </Text>))}
                        </div>)} */}
                        {description && (<Text component="div"> {description} </Text>)}
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