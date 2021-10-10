import airtable_api from '@libs/airtable_api';
import Layout from '@components/Layout'
import classNames from 'classnames';
import styles from "@styles/pages/SingleStructure.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'
import { LabelStructure } from '@components/Labels';


export default function Structure({ id, name, description, illustrations, status, typologies, adress, website, partners, communities, contact, production, gestion, materials, projects_designer, projects_workshop, projects_supplier }) {
    
    return (
        <Layout  title={name} padded>
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

                <div className={styles.productions}>
                    <div className={styles.productionsTitle}>
                        <span>{projects_designer.length}</span> production.s
                    </div>
                    <div className={styles.productionsList}>
                        {projects_designer && projects_designer.map((el) => (
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

                <div className={styles.label}>
                    <LabelStructure
                        communities={communities}
                        adress={adress}
                        name={name}
                        bordered
                    />
                </div>


            </div>
        </Layout>
    );
}




export async function getStaticProps({ params }) {
    let structure = await airtable_api.getStructures({ id: params.id });
    structure = structure[0];
    
    structure.data = {
        partners: structure.partners.length,
        materials: structure.materials,
        gestion: structure.gestion,
        production: structure.production
    }
    structure.communities = await Promise.all(structure.communities.map(async (community) => {
        let communityName = await airtable_api.getCommunities({ id: community });
        return communityName[0].name
    }))
    structure.projects_designer = await Promise.all(structure.projects_designer.map(async (el) => {
        let project = await airtable_api.getProjects({ id: el });
        return project[0]
    }))
    
    return {
        props: structure,
        revalidate: 1,
    };
}


export async function getStaticPaths() {
    let paths = await airtable_api.getStructures();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}