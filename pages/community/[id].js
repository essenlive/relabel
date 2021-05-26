import airtable_api from '@libs/airtable_api';
import Layout from '@components/Layout'
import Label from '@components/Label';
import styles from "@styles/pages/SinglePage.module.css";
import Carousel from "@components/Carousel";
import { Title, Text, Badge, Button, useMantineTheme } from '@mantine/core';
import Link from 'next/link'


export default function Structure({ name, website, illustrations, status, description, adress, activity, datas }) {
    const theme = useMantineTheme();
    let colorsKeys = Object.keys(theme.colors).slice(1);
    let activities = Array.from(new Set(activity))
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
                            date={datas.year.split("-")[0]}
                            data={{
                                partners: datas.partnerscount,
                                materials: datas.materials,
                                gestion: datas.gestion,
                                production: datas.production
                            }}
                        />
                    </div>

                    <div className={styles.infos} style={{ maxWidth: 300 }} >
                        {name && (<Title order={1}> {name} </Title>)}
                        {activity && (<div style= {{marginBottom: 10, }} >{
                            activity.map((item, i) => (
                                <Badge key={i} variant='filled' color={colorsKeys[activities.indexOf(item)]}>{item}</Badge>
                            ))}
                        </div>)}
                        {/* {team && (<div>
                            {team.map((item, i) => (<Text component="span" key={i}>{item} </Text>))}
                        </div>)} */}
                        {adress && (<Text weight="bold" component="div"> {adress} </Text>)}
                        {description && (<Text component="div"> {description} </Text>)}
                        {website && (<Link
                            href={website}>
                            <Button style={{ marginTop: 10 }} variant='light'> Voir le site </Button>
                        </Link>)}
                    </div>


                </div>

            </article>
        </Layout>
    );
}




export async function getStaticProps({ params }) {
    let structure = await airtable_api.getStructures({ id: params.id });
    structure = structure[0];
    if (structure.datas != false) {
        structure.datas = await airtable_api.getDatas({ id: structure.datas[0] })
        structure.datas = structure.datas[0];
    }
    else{
        structure.datas = {
            year : 'NC-01-01',
            partners: [],
            production: 0,
            gestion: 0,
            materials: 0,
            partnerscount : 0
        }
    }
    return { props: structure }
}


export async function getStaticPaths() {
    let paths = await airtable_api.getStructures();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}