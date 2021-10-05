import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import classNames from "classnames"
import styles from "@styles/pages/SingleCommunity.module.css";
import Link from 'next/link'
import { LabelCommunity } from '@components/Labels';


export default function Community({ name, members, description, colors, year, website, cities }) {
    return (
        <Layout title={name} padded>
            <div className={styles.banner}>
                <div className={styles.title}>
                    {name && (<h1> {name} </h1>)}
                </div>
                <div className={styles.description}>
                    {description && (<p> {description} </p>)}
                </div>
                <div className={styles.website}>
                    {website && (
                    <Link href={website}>
                            <p> Voir le site </p>
                    </Link>
                    )}
                </div>

                <div className={styles.label}>
                    <LabelCommunity
                        name={name}
                        year={year}
                        data={{
                            partners: '0',
                            materials: '1',
                            gestion: '0.1',
                            production: '0.9'
                        }}
                        colors={colors}
                    />
                
                </div>

                <div className={styles.structures}>
                    <div className={styles.structuresTitle}>
                        <span>{members.length}</span> membres
                    </div>
                    <div className={styles.structuresList}>
                        {members && members.map((el, i) => (
                        <Link
                            href={{
                            pathname: '/structures/[id]',
                            query: { id: el.id },
                            }}>
                            <div>
                                <div className={classNames(styles.structure, 'link')}> {el.name} </div>
                                <div className={styles.structuresListProject}> {el.projects.length} </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className={styles.cities}>
                    {cities && cities.map((el, i) => (
                        <div> {el} </div>
                    ))}
                </div>
             

            </div>
        </Layout>
    );
}




export async function getStaticProps({ params }) {
    let community = await airtable_api.getCommunities({ id: params.id });
    community[0].members = await Promise.all(community[0].members.map(async (el) => {
        let member = await airtable_api.getStructures({ id: el });
        return member[0]
    }))
    return {
        props: community[0],
        revalidate: 1
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getCommunities();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}