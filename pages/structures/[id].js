import airtable_api from '@libs/airtable_api';
import Layout from '@components/Layout'
import classNames from 'classnames';
import styles from "@styles/pages/SinglePage.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'
import LabelStructure from '@components/LabelStructure';
import { BiCopy } from "react-icons/bi";

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TwitterShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    TwitterIcon
} from "react-share";


export default function Structure({structure}) {
    return (
        <Layout  title={structure.name} padded>

            <div className={classNames(styles.structureBanner)}>

                <div className={styles.carousel}>
                    {structure.illustrations && (
                        <Carousel images={structure.illustrations} />
                    )}
                </div>

                <div className={styles.title}>
                    {structure.name && (<h1> {structure.name} </h1>)}
                    {structure.typologies && (<h2>{structure.typologies.map((el, i) => (<span key={i}>{el}  </span>))}</h2>)}
                </div>
                <div className={styles.description}>
                    {structure.description && (<p> {structure.description} </p>)}
                    {structure.website && ( <p className={"link"}> 
                        <Link href={structure.website}> Voir le site </Link>
                    </p> )}
                </div>

                <div className={styles.productions}>
                    <div className={styles.productionsTitle}>
                        <span>{structure.projects.length}</span> production.s
                    </div>
                    <div className={styles.productionsList}>
                        {structure.projects && structure.projects.map((el) => (
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

                <div className={styles.label}>
                    <LabelStructure
                        structure={structure}
                        bordered
                    />
                </div>

                <div className={styles.explainer}>
                    <p>Chaque arc repésente les projets portés.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: structure.colors[0] }}></span>Les projets designés.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: structure.colors[3] }}></span>Les projets produits chez vous.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: structure.colors[2] }}></span>Les projets dont vous avez fournis la matière.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: structure.colors[1] }}></span>Les projets soutenus.</p>
                </div>

                <div className={styles.share}>
                    <h2>Share</h2>
                    <div className={styles.sharing}>

                        <EmailShareButton
                            url={`https://re-label.eu/structures/${structure.id}`}
                            subject={'Mon Re-Label'}
                            body={'Je viens de faire mon Re-label sur : '}
                        >
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                        <FacebookShareButton
                            url={`https://re-label.eu/structures/${structure.id}`}
                            hashtag={'relabel'}
                            quote={'Je viens de faire mon Re-label sur re-label.eu '}
                        >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <LinkedinShareButton
                            url={`https://re-label.eu/structures/${structure.id}`}
                            title={'Mon Re-Label'}
                            summary={'Je viens de faire mon Re-label sur re-label.eu'}
                            source={'https://re-label.eu'}
                        >
                            <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                        <span className="toCopy">
                            <BiCopy />
                            <input readOnly type={"text"} value={`<a target="_blank" href="https://re-label.eu/structures/${structure.id}"><iframe src="https://re-label.eu/structures/label/${structure.id}" name="relabel" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="300px" width="240px" allowfullscreen></iframe></a>`} />
                        </span>
                    </div>
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
    structure.projects = [...structure.projects_designer, ...structure.projects_supplier, ...structure.projects_workshop, ...structure.projects_other]
    structure.projects = [...new Set(structure.projects)]
    
    structure.projects = await Promise.all(structure.projects.map(async (el) => {
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