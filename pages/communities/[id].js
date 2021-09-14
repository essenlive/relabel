import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import styles from "@styles/pages/SingleCommunity.module.css";
import Link from 'next/link'


export default function Community({ name, members, description, website, cities }) {
    return (
        <Layout padded title={name}>
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

                    <div className={styles.icon}><img
                        src="/assets/label-comm-placeholder.png"
                        height={200}
                        alt="Photo d'illustration"
                    /></div>
                    <h2> {name}</h2>
                
                </div>

                <div className={styles.structures}>
                    <div className={styles.structuresTitle}>
                        <span>{members.length}</span> membres
                    </div>
                    <div className={styles.structuresList}>
                        {members && members.map((el, i) => (
                            <div>
                                <div className={styles.structuresListName}> {el.name} </div>
                                <div className={styles.structuresListProject}> {el.projects.length} </div>
                            </div>
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
    console.log(community[0]);
    return { props: community[0] }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getCommunities({ status: true });
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}