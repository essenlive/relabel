import airtable_api from '@libs/airtable_api';
import Layout from '@components/Layout'
import classNames from 'classnames';
import styles from "@styles/pages/SingleStructure.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'


export default function Structure({ name, website, illustrations, status, description, adress, activity, datas, community, projects }) {
    
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
                    <img
                        src="/assets/label-comm-placeholder.png"
                        height={200}
                        alt="Photo d'illustration"
                    />
                    {name && (<h2 className={styles.cardTitle}>{name}</h2>)}
                    {adress && (<div className={styles.cardAdress}>{adress}</div>)}
                    {community && (<div className={styles.cardCommunities}>{community.map((el) => (
                        <h3>{el}</h3>
                    ))}</div>)}
                </div>

                <div className={styles.productions}>
                    <div className={styles.productionsTitle}>
                        <span>{projects.length}</span> production.s
                    </div>
                    <div className={styles.productionsList}>
                        {projects && projects.map((el) => (
                        <Link
                            href={{
                            pathname: '/projects/[id]',
                            query: { id: el.id },
                            }}>
                            <div>
                                <div className={classNames(styles.productionsListName, 'link')}> {el.name} </div>
                                <div className={styles.productionsListProject}> {el.team[0]} </div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className={styles.carousel}>
                    {illustrations && (
                        <Carousel images={illustrations} />
                    )}
                </div>


            </div>
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

    structure.community = await Promise.all(structure.community.map(async (community) => {
        let communityName = await airtable_api.getCommunities({ id: community });
        return communityName[0].name
    }))
    structure.projects = await Promise.all(structure.projects.map(async (el) => {
        let project = await airtable_api.getProjects({ id: el });
        return project[0]
    }))
    return { props: structure }
}


export async function getStaticPaths() {
    let paths = await airtable_api.getStructures();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}