import airtable_api from '@libs/airtable_api';
import Layout from '@components/Layout'
import classNames from 'classnames';
import styles from "@styles/pages/SingleStructure.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'
import LabelStructure from '@components/LabelStructure';


export default function Structure({structure}) {
    
    return (
        <Layout  title={structure.name} padded>
            <div className={styles.banner}>
                <div className={styles.title}>
                    {structure.name && (<h1> {structure.name} </h1>)}
                </div>
                <div className={styles.description}>
                    {structure.description && (<p> {structure.description} </p>)}
                </div>
                <div className={styles.website}>
                    {structure.website && (
                        <Link href={structure.website}>
                            <p> Voir le site </p>
                        </Link>
                    )}
                </div>

                <div className={styles.productions}>
                    <div className={styles.productionsTitle}>
                        <span>{structure.projects_designer.length}</span> production.s
                    </div>
                    <div className={styles.productionsList}>
                        {structure.projects_designer && structure.projects_designer.map((el) => (
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
                    {structure.illustrations && (
                        <Carousel images={structure.illustrations} />
                    )}
                </div>

                <div className={styles.label}>
                    <LabelStructure
                        structure={structure}
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
    
    structure.communities = await Promise.all(structure.communities.map(async (community) => {
        let communityEntity = await airtable_api.getCommunities({ id: community });
        return communityEntity[0]
    }))
    structure.projects_designer = await Promise.all(structure.projects_designer.map(async (el) => {
        let project = await airtable_api.getProjects({ id: el });
        return project[0]
    }))
    
    return {
        props: {structure},
        revalidate: 1,
    };
}


export async function getStaticPaths() {
    let paths = await airtable_api.getStructures();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: "blocking" };
}