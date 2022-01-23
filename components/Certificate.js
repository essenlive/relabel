import { forwardRef } from "react";
import LabelProject from '@components/LabelProject';
import styles from "@styles/components/Certificate.module.css";

const Certificate = forwardRef(({project}, ref) => {

    return (
        <div ref={ref} className={styles.certificate}>
            <div className={styles.recto}>
                <div className={styles.signature}>
                    <h1>Remis le : </h1>
                    <div className={styles.signArea}></div>
                    <h1>À : </h1>
                    <div className={styles.signArea}></div>
                    <h1>Par : </h1>
                    <div className={styles.signArea}></div>
                </div>
                <div>
                    <LabelProject project={project} />
                </div>
            </div>
            <div className={styles.verso}>
                <div>
                    {project.illustrations && (
                        <img className={styles.illustration} src={project.illustrations[0]}/>
                    )}
                    <div className={styles.description}>
                        <h1>Le projet </h1>
                        {project.description && (<p> {project.description} </p>)}
                    </div>

                </div>
                <div className={styles.specifications}>
                    <div>
                        <h1><span className={styles.legend} style={{ backgroundColor: project.colors[0] }}></span>Matériaux </h1>
                        <p><b>Fournisseurs</b> : {project.structures.filter(el => el.typologies.indexOf("stockage") >= 0).map(el => (<span className='link' key={el.id}>{el.name}</span>))}</p>
                        <p><b>Source</b> : {project.material_source}</p>
                        <p><b>Qualité</b> : {project.material_quality}</p>
                        <p><b>Origine</b> : {project.material_origin}</p>
                        <p><b>Chutes</b> : {project.material_leftovers}</p>
                    </div> 
                    <div >
                        <h1><span className={styles.legend} style={{ backgroundColor: project.colors[1] }}></span>Conception </h1>
                        <p><b>Designers</b> : {project.structures.filter(el => el.typologies.indexOf("designer") >= 0).map(el => (<span className='link' key={el.id}>{el.name}</span>))}</p>
                        <p><b>Réplicabilité</b> : {project.design_replicability}</p>
                        <p><b>Collaboratif</b> : {project.design_sharable}</p>
                        <p><b>Réparable</b> : {project.design_reparable}</p>
                        <p><b>Durable</b> : {project.design_durabtility}</p>

                    </div>
                    <div>
                        <h1><span className={styles.legend} style={{ backgroundColor: project.colors[2] }}></span>Fabrication </h1>
                        <p><b>Ateliers</b> : {project.structures.filter(el => el.typologies.indexOf("atelier") >= 0).map(el => (<span className='link' key={el.id}>{el.name}</span>))}</p>
                        <p><b>Expertises</b> : {project.fab_expertise}</p>
                        <p><b>Fabrication locale</b> : {project.fab_local}</p>
                        <p><b>Outils</b> : {project.fab_tools}</p>
                        <p><b>Social</b> : {project.fab_social}</p>

                    </div>
                </div>
            </div>
        </div>
    );
});

export default Certificate