import Sketch from '@components/Sketch'
import classNames from "classnames"
import styles from "@styles/components/LabelProduction.module.css";

export default function LabelProduction({ data, name, structure, size, bordered}) {
    return (
        <div className={classNames(styles.labelProduction,
        { [`${styles.bordered}`]: bordered },
        { [`${styles.small}`]: size === "small" },
        { [`${styles.medium}`]: size === "medium" },
        { [`${styles.large}`]: size === "large" })}>
            <div className={styles.label}>
                {data && 
               <Sketch
                    partners={data.partners}
                    materials={data.materials}
                    gestion={data.gestion}
                    production={data.production}
                    />}
            </div>


            <div className={styles.name}>
                {name &&
                <h3>{name}</h3>}
            </div>
            <div className={styles.designer}>
                { structure && structure.map((el, i) => {
                    return(
                    <p key={i}>{el}</p>
                )})}
            </div>
        </div>
    )
}