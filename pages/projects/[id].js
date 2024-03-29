import Layout from '@components/Layout'
import LabelProject from '@components/LabelProject';
import styles from "@styles/pages/SinglePage.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'
import ReactMap, {prepareData} from '@components/ReactMap'
import { BiCopy } from "react-icons/bi";
import { mean } from 'mathjs';
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";
import { useRef, useState, useEffect, useCallback } from "react";
import ReactToPrint from "react-to-print";
import classNames from 'classnames';
import prisma, { manageImages, serialize } from '@libs/prisma';
import { projectForm } from '@libs/formsData';

import Certificate from "@components/Certificate";
import Tags from '@components/Tags';

const ProjectAttributes = ({ name, options, selection, key, baseColor, accentColor}) => {
    selection = [selection].flat();
    let indexes=[];
    selection.forEach((selection)=>{
        indexes.push(options.indexOf(selection))
    })
    
    let colorMap = new Array(options.length).fill(baseColor);
    indexes.forEach((index) => { if (index < options.length && index >= 0) { colorMap[index] = accentColor } })
    return(
        <div key={key}>
            <p><b>{name}</b></p>
            <Tags tags={options} colorMap={colorMap} dark/>
        </div>
    )
}


export default function Project({ project }) {
    let [copied, setCopied] = useState(false)
    function addToClipboard(text) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => { setCopied(false) }, 1000)
    }
    const componentRef = useRef(null);
    const onBeforeGetContentResolve = useRef(null);
    const [visible, setVisible] = useState(false);
    const handleAfterPrint = useCallback(() => {  setVisible(false);}, []);
    const handleBeforePrint = useCallback(() => { setVisible(true);}, []);
    const handleOnBeforeGetContent = useCallback(() => {
        setVisible(true);
        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setTimeout(() => {
                setVisible(false);
                resolve();
            }, 500);
        });
    }, [setVisible]);

    useEffect(() => {
        if (typeof onBeforeGetContentResolve.current === "function") { onBeforeGetContentResolve.current(); }
    }, [onBeforeGetContentResolve.current]);

    const reactToPrintContent = useCallback(() => { return componentRef.current; }, [componentRef.current]);
    const reactToPrintTrigger = useCallback(() => {
        return (<button className={classNames(styles.print,"button")}> Imprimer le certificat </button>); // eslint-disable-line max-len
    }, []);




    return (
        <Layout
            meta={{
                title: project.name,
                description: project.description ? project.description : null,
                image: project.illustrations ? project.illustrations[0] : null
            }}
            padded>
            <div className={styles.projectBanner}>
                <div className={styles.carousel}>
                    {project.illustrations && (
                        <Carousel images={project.illustrations} />
                    )}
                </div>
                <div className={styles.title}> 
                    {project.name && (<h1> {project.name}</h1>)} 
                    {project.typology && (<h2>{project.typology}</h2>)}
                </div>
                <div className={styles.description}> 
                    {project.description && (<p> {project.description} </p>)}
                    {project.website && (<p className={"link"}> <Link href={project.website}> Voir le site</Link></p>)}
                </div>
                <div className={styles.detail}>
                    <div className={styles.materials}>
                        <h3>Materiaux</h3>
                        <div>
                            <b>Fournisseurs</b>
                            {project.structures.filter(el=>el.typologies.indexOf("stockage")>=0).map(el => (<span className='link' key={el.id}><Link href={`/structures/${el.id}`}>{el.name}</Link></span>))}
                        </div>

                        {projectForm.inputs.filter(el => el.group === "material").map((input, i) => (
                            <ProjectAttributes
                            key={i}
                            name={input.prefix}
                            options={input.options.map(el => el.value) }
                            selection={project[input.name]}
                                baseColor={"--gray-100"}
                                accentColor={project.colors[0]}
                            />
                        ))}
                    </div>
                    <div className={styles.design}>
                        <h3>Conception</h3>
                        <div>
                            <b>Designers</b>
                            {project.structures.filter(el => el.typologies.indexOf("designer") >= 0).map(el => (<span className='link' key={el.id}><Link href={`/structures/${el.id}`}>{el.name}</Link></span>))}
                        </div>

                        {projectForm.inputs.filter(el => el.group === "design").map((input, i) => (
                            <ProjectAttributes
                                key={i}
                                name={input.prefix}
                                options={input.options.map(el => el.value)}
                                selection={project[input.name]}
                                baseColor={"--gray-100"}
                                accentColor={project.colors[1]}
                            />
                        ))}
                    </div>
                    <div className={styles.fab}>
                        <h3>Fabrication</h3>
                        <div>
                            <b>Ateliers</b>
                            {project.structures.filter(el => el.typologies.indexOf("atelier") >= 0).map(el => (<span className='link' key={el.id}><Link href={`/structures/${el.id}`}>{el.name}</Link></span>))}
                        </div>
                        {projectForm.inputs.filter(el => el.group === "fab").map((input, i) => (
                            <ProjectAttributes
                                key={i}
                                name={input.prefix}
                                options={input.options.map(el => el.value)}
                                selection={project[input.name]}
                                baseColor={"--gray-100"}
                                accentColor={project.colors[2]}
                            />
                        ))}
                    </div>
                    <div className={styles.partners}>
                        <h3>Soutien</h3>
                        <div>
                            <b>Partenaires</b>
                            { project.structures.filter(el => el.typologies.indexOf("autre") >= 0).map(el => (<span className='link' key={el.id}><Link href={`/structures/${el.id}`}>{el.name}</Link></span>))}
                        </div>

                    </div>
                </div>
                <div className={styles.map}>

                    {project.structures.length > 0 && (
                    <ReactMap 
                        structures={prepareData(project.structures)}
                        colorMap={project.colors}
                        initialViewport={{
                            latitude: mean(project.structures.map(el => el.latitude)),
                            longitude: mean(project.structures.map(el => el.longitude)),
                            zoom: 12
                        }} />
                    )}
                </div>
                <div className={styles.label}> <LabelProject project={project}/></div>
                <div className={styles.explainer}>
                    <p><span className={styles.node}></span>Les noeuds représentent le nombre de partenaires.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: project.colors[0] }}></span>Matériaux sourcés et responsables.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: project.colors[1] }}></span>Conception ouverte et perenne.</p>
                    <p><span className={styles.legend} style={{ backgroundColor: project.colors[2] }}></span>Fabrication locale et sociale.</p>
                </div>
                <div className={styles.share}>
                    <h2>Share</h2>
                    <div className={styles.sharing}>

                        <EmailShareButton
                            url={`https://re-label.eu/projects/${project.id}`}
                            subject={'Re-Label'}
                            body={'Je viens de faire le Re-label de mon projet : '}
                        >
                            <EmailIcon size={32} round={true} />
                        </EmailShareButton>
                        <FacebookShareButton
                            url={`https://re-label.eu/projects/${project.id}`}
                            hashtag={'relabel'}
                            quote={`Je viens de faire Re-labeliser mon projet ${project.name}`}
                        >
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <LinkedinShareButton
                            url={`https://re-label.eu/projects/${project.id}`}
                            title={'Re-Label'}
                            summary={`Je viens de faire Re-labeliser mon projet ${project.name}`}
                            source={'https://re-label.eu'}
                        >
                            <LinkedinIcon size={32} round={true} />
                        </LinkedinShareButton>
                        <TwitterShareButton
                            url={`https://re-label.eu/projects/${project.id}`}
                            title={'Mon Re-Label'}
                            hashtag={'relabel'}
                        >
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                        
                    </div>
                    <div>
                    </div>

                    <div className={styles.embed}>
                        <span onClick={() => { addToClipboard(`<iframe src="https://re-label.eu/projects/label/${project.id}" name="relabel" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="300px" width="240px" allowfullscreen></iframe>`) }}>
                            <BiCopy /> {copied ? "Ajouté au clipboard !" : "Integrer à votre site"}
                        </span>
                        <textarea readOnly type={"text"} value={`<iframe src="https://re-label.eu/projects/label/${project.id}" name="relabel" scrolling="no" frameborder="0" marginheight="0px" marginwidth="0px" height="300px" width="240px" allowfullscreen></iframe>`} />
                    </div>
                        <ReactToPrint
                            content={reactToPrintContent}
                            documentTitle={`re-label | ${project.name}`}
                            onAfterPrint={handleAfterPrint}
                            onBeforeGetContent={handleOnBeforeGetContent}
                            onBeforePrint={handleBeforePrint}
                            removeAfterPrint
                            trigger={reactToPrintTrigger}
                        />
                </div>

            </div>

            <div className={classNames({ [`${styles.visible}`]: visible }, styles.certif)}>
                <Certificate ref={componentRef} project={project}/>
            </div>
        </Layout>
    );
}

   



export async function getStaticProps({ params }) {
    let project = await prisma.project.findMany({ where: { id: params.id } });
    project = project[0];
    project.illustrations = await Promise.all(project.illustrations.map(async (illu, i) => await manageImages(illu, project.name, i)))
    let structures = await prisma.structure.findMany();
    let communities = await prisma.community.findMany();


    project.structures = [...project.designers, ...project.suppliers, ...project.workshops, ...project.others]
    project.structures = [...new Set(project.structures)]

    project.structures = project.structures.map((structureId) => {
        let structure = structures.filter((el) => el.id === structureId);
        structure = structure[0];
        structure.communities = structure.communities.map((communityId) => {
            let community = communities.filter((el) => el.id === communityId);
            return community[0]
        })
        structure.typologies = []
        if (project.designers.indexOf(structureId) >= 0) structure.typologies = [...structure.typologies, "designer"]
        if (project.suppliers.indexOf(structureId) >= 0) structure.typologies = [...structure.typologies, "stockage"]
        if (project.others.indexOf(structureId) >= 0) structure.typologies = [...structure.typologies, "autre"]
        if (project.workshops.indexOf(structureId) >= 0) structure.typologies = [...structure.typologies, "atelier"]
        return structure
    })

    return {
        props: {project : serialize(project)},
        revalidate: 1,
    }
}
export async function getStaticPaths() {
    let projects = await prisma.project.findMany();
    let paths = projects.map((project) => ({ params: { id: project.id } }))
    return { paths: paths, fallback: "blocking" };
}