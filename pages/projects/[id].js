import airtable_api from '@libs/airtable_api.js'
import Layout from '@components/Layout'
import LabelProject from '@components/LabelProject';
import styles from "@styles/pages/SinglePage.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'
import Tags from '@components/Tags';
import ReactMap from '@components/ReactMap'
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

export default function Project({project}) {
    return (
        <Layout title={project.name} padded>
            <div className={styles.projectBanner}>
                <div className={styles.carousel}>
                    {project.illustrations && (
                        <Carousel images={project.illustrations} />
                    )}
                </div>
                <div className={styles.title}> 
                    {project.name && (<h1> {project.name} </h1>)} 
                    {project.typology && (<h2>{project.typology}</h2>)}
                </div>
                <div className={styles.description}> 
                    {project.description && (<p> {project.description} </p>)}
                    {project.website && (<p className={"link"}> <Link href={project.website}> Voir le site</Link></p>)}
                </div>
                <div className={styles.detail}>
                    <div className={styles.materials}>
                        <h3>Materiaux</h3>
                        <p><b>Fournisseurs</b> : {project.suppliers.map(el => (<span className='link' key={el.id}><Link href={`/structure/${el.id}`}>{el.name}</Link></span>))}</p>
                        <p><b>Source</b> : {project.material_source}</p>
                        <p><b>Qualité</b> : {project.material_quality}</p>
                        <p><b>Origine</b> : {project.material_origin}</p>
                        <p><b>Chutes</b> : {project.material_leftovers}</p>
                    </div>
                    <div className={styles.design}>
                        <h3>Conception</h3>
                        <p><b>Designers</b> : {project.designers.map(el => (<span className='link' key={el.id}><Link href={`/structure/${el.id}`}>{el.name}</Link></span>))}</p>
                        <p><b>Réplicabilité</b> : {project.design_replicability}</p>
                        <p><b>Collaboratif</b> : {project.design_sharable}</p>
                        <p><b>Réparable</b> : {project.design_reparable}</p>
                        <p><b>Durable</b> : {project.design_durabtility}</p>
                    </div>
                    <div className={styles.fab}>
                        <h3>Fabrication</h3>
                        <p><b>Ateliers</b> : {project.workshops.map(el => (<span className='link' key={el.id}><Link href={`/structure/${el.id}`}>{el.name}</Link></span>))}</p>
                        <p><b>Expertises</b> : {project.fab_expertise}</p>
                        <p><b>Fabrication locale</b> : {project.fab_local}</p>
                        <p><b>Outils</b> : {project.fab_tools}</p>
                        <p><b>Social</b> : {project.fab_social}</p>
                    </div>
                    <div className={styles.partners}>
                        <h3>Partenaires</h3>
                        <p><b>Partenaires</b> : {project.others.map(el => (<span className='link' key={el.id}><Link href={`/structure/${el.id}`}>{el.name}</Link></span>))}</p>

                    </div>
                </div>
                <div className={styles.map}>
                    <ReactMap structures={project.mapData} />
                </div>
                <div className={styles.label}> <LabelProject project={project}/></div>
                <div className={styles.explainer}>
                    <p><span className={styles.node}></span>Les noeuds représentent le nombre de partenaires.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: project.colors[1] }}></span>Conception ouverte et perenne.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: project.colors[2] }}></span>Fabrication locale et sociale.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: project.colors[0] }}></span>Matériaux sourcés et responsables.</p>
                </div>
                <div className={styles.share}>
                    <h2>Share</h2>
                    <div className={styles.sharing}>

                        <EmailShareButton
                            url={`https://re-label.eu/project/${project.id}`}
                            subject={'Re-Label'}
                            body={'Je viens de faire le Re-label de mon projet : '}
                        >
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                        <FacebookShareButton
                            url={`https://re-label.eu/project/${project.id}`}
                            hashtag={'relabel'}
                            quote={`Je viens de faire Re-labeliser mon projet ${project.name}`}
                        >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <LinkedinShareButton
                            url={`https://re-label.eu/project/${project.id}`}
                            title={'Re-Label'}
                            summary={`Je viens de faire Re-labeliser mon projet ${project.name}`}
                            source={'https://re-label.eu'}
                        >
                            <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                        <span className="toCopy">
                            <BiCopy/>
                            <input type text value={`<a target="_blank" href="https://re-label.eu/projects/${project.id}"><iframe src="https://re-label.eu/projects/label/${project.id}" name="relabel" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="300px" width="240px" allowfullscreen></iframe></a>`} />
                        </span>
                        
                    </div>
                </div>

            </div>
        </Layout>
    );
}

   



export async function getStaticProps({params}) {
    let project = await airtable_api.getProjects({ id: params.id });
    project = project[0];
    project.designers = await Promise.all(project.designers.map(async (structure) => {
        let structureEntity = await airtable_api.getStructures({ id: structure });
        return structureEntity[0]
    }))
    project.suppliers = await Promise.all(project.suppliers.map(async (structure) => {
        let structureEntity = await airtable_api.getStructures({ id: structure });
        return structureEntity[0]
    }))
    project.workshops = await Promise.all(project.workshops.map(async (structure) => {
        let structureEntity = await airtable_api.getStructures({ id: structure });
        return structureEntity[0]
    }))
    project.others = await Promise.all(project.others.map(async (structure) => {
        let structureEntity = await airtable_api.getStructures({ id: structure });
        return structureEntity[0]
    }))
    project.structures = [...project.designers, ...project.suppliers, ...project.workshops, ...project.others]
    let data = {}

    // TODO : Check for duplicates when having multiple roles
    project.structures.forEach((el, i) => {

        let hash = `lo-${el.longitude}la-${el.latitude}`
        if (!data[hash]) {
            data[hash] = {
                type: "Feature",
                properties: {
                    typologies: el.typologies,
                    structures: [el]
                },
                id: hash,
                geometry: {
                    type: "Point",
                    coordinates: [el.longitude, el.latitude, 0]
                }
            }
        }
        else {
            data[hash].properties.typologies = Array.from(new Set([...data[hash].properties.typologies, ...el.typologies]))
            data[hash].properties.structures.push(el)
        }
    })
    project.mapData = {
        type: "FeatureCollection",
        features: Object.values(data)
    }
    return {
        props: {project},
        revalidate: 1,
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: "blocking" };
}