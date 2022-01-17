import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import classNames from "classnames"
import styles from "@styles/pages/SinglePage.module.css";
import Link from 'next/link'
import LabelCommunity from '@components/LabelCommunity';
import Tags from '@components/Tags';
import ReactMap, {prepareData} from '@components/ReactMap'
import { BiCopy } from "react-icons/bi";
import {mean} from 'mathjs';
import { createMap } from '@libs/getColors';

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

export default function Community({community}) {

    const colorMap = createMap(community.colors)

    return (
        <Layout title={community.name} padded>
            <div className={styles.communityBanner}>
                <div className={styles.title}>
                    {community.name && (<h1> {community.name} </h1>)}
                    {community.cities && (<h2>{community.cities.map((el,i) => (<span key={i}>{el}  </span>))}</h2>)}
                </div>
                <div className={styles.description}>
                    {community.description && (<p> {community.description} </p>)}
                    {community.website && (
                        <p className={"link"}> 
                        <Link href={community.website}> Voir le site</Link>
                        </p>
                    )}
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
                                    <div className={styles.structuresListProject}> <Tags tags={el.typologies} colorMap={colorMap} /></div>
                            </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className={styles.map}>
                    <ReactMap 
                        structures={community.mapData} 
                        initialViewport={{
                            latitude: mean(community.structures.map(el=>el.latitude)),
                            longitude: mean(community.structures.map(el => el.longitude)),
                            zoom: 10
                        }}
                        colorMap={community.colors}
                        />
                </div>

                <div className={styles.label}>
                    <LabelCommunity community={community} />
                </div>
                <div className={styles.explainer}>
                    <p><span className={styles.node}></span>Les noeuds représentent les membres de la communauté.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: community.colors[0] }}></span>Designers, architectes, artisans, créateurs...</p>
                    <p><span className={styles.legend} style={{ backgroundColor: community.colors[1] }}></span>Ateliers de fabrication, menuiserie, céramique, métal...</p>
                    <p><span className={styles.legend} style={{ backgroundColor: community.colors[2] }}></span>Fournisseurs, ressourcerie ou espace de stockage...</p>
                    <p><span className={styles.legend} style={{ backgroundColor: community.colors[3] }}></span>Structures partenaires, institutions, incubateurs...</p>
                </div>

                <div className={styles.share}>
                    <h2>Share</h2>
                    <div className={styles.sharing}>
                        <EmailShareButton
                            url={`https://re-label.eu/community/${community.id}`}
                            subject={'Mon Re-Label'}
                            body={'Je viens de faire mon Re-label sur : '}
                        >
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                        <FacebookShareButton
                            url={`https://re-label.eu/community/${community.id}`}
                            hashtag={'relabel'}
                            quote={'Je viens de faire mon Re-label sur re-label.eu '}
                        >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <LinkedinShareButton
                            url={`https://re-label.eu/community/${community.id}`}
                            title={'Mon Re-Label'}
                            summary={'Je viens de faire mon Re-label sur re-label.eu'}
                            source={'https://re-label.eu'}
                        >
                            <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                        <span className="toCopy">
                            <BiCopy />
                            <input readOnly type={"text"} value={`<a target="_blank" href="https://re-label.eu/communities/${community.id}"><iframe src="https://re-label.eu/communities/label/${community.id}" name="relabel" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="300px" width="240px" allowfullscreen></iframe></a>`} />
                        </span>
                    </div>
                </div>

             

            </div>
        </Layout>
    );
}




export async function getStaticProps({ params }) {
    let community = await airtable_api.getCommunities({ id: params.id });
    community = community[0];
    console.log(community);
    community.structures = await Promise.all(community.structures.map(async (el) => {
        let structure = await airtable_api.getStructures({ id: el });
        structure[0].communities = [{name : community.name}];
        return structure[0]
    }))

    community.mapData = prepareData(community.structures)


    
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