import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import classNames from "classnames"
import styles from "@styles/pages/SingleCommunity.module.css";
import Link from 'next/link'
import LabelCommunity from '@components/LabelCommunity';
import Tags from '@components/Tags';


export default function Community({community}) {
    return (
        <Layout title={community.name} padded>
            <div className={styles.banner}>
                <div className={styles.title}>
                    {community.name && (<h1> {community.name} </h1>)}
                </div>
                <div className={styles.description}>
                    {community.description && (<p> {community.description} </p>)}
                    {community.website && (
                        <p className={"link"}> 
                        <Link href={community.website}> Voir le site</Link>
                        </p>
                    )}
                </div>

                <div className={styles.label}>
                    <LabelCommunity community={community} />
                </div>

                <div className={styles.structures}>
                    <div className={styles.structuresTitle}>
                        <span>{community.structures.length}</span> membres
                    </div>
                    <div className={styles.structuresList}>
                        {community.structures && community.structures.map((el, i) => (
                        <Link
                            key = {i}
                            href={{
                            pathname: '/structures/[id]',
                            query: { id: el.id },
                            }}>
                            <div>
                                <div className={classNames(styles.structure, 'link')}> {el.name} </div>
                                    <div className={styles.structuresListProject}> <Tags tags={el.typologies}/></div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className={styles.cities}>
                    {community.cities && community.cities.map((el, i) => (
                        <div key={i}> {el} </div>
                    ))}
                </div>
             

            </div>
        </Layout>
    );
}




export async function getStaticProps({ params }) {
    let community = await airtable_api.getCommunities({ id: params.id });
    community = community[0];
    community.structures = await Promise.all(community.structures.map(async (el) => {
        let structure = await airtable_api.getStructures({ id: el });
        return structure[0]
    }))
    return {
        props: {community},
        revalidate: 1
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getCommunities();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: "blocking" };
}