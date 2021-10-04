import Sketch from '@components/Sketch'
import classNames from "classnames"
import styles from "@styles/components/Labels.module.css";

export function LabelProduction({ data, name, date, structure, colors, bordered}) {
    return (
        <div className={classNames(styles.labelProduction,
            { [`${styles.bordered}`]: bordered })}>
            <div className={styles.label}>
                {data && 
               <Sketch
                    partners={data.partners}
                    materials={data.materials}
                    gestion={data.gestion}
                    production={data.production}
                    colors={colors}
                    />}
            </div>


            <div className={styles.name}>
                {name &&
                    <h2>{name}</h2>}
            </div>
            {date &&
                <div className={styles.date}>
                        <p>{date.day}</p>
                        <p>/</p>
                        <p>{date.month}</p>
                </div>
            }
            <div className={styles.designer}>
                { structure && structure.map((el, i) => {
                    return(
                    <p key={i}>{el}</p>
                )})}
            </div>
        </div>
    )
}


export function LabelCommunity({ data, name, date, structure, colors, bordered }) {
    return (
        <div className={classNames(styles.labelProduction,
            { [`${styles.bordered}`]: bordered })}>
            <div className={styles.label}>
                {data &&
                    <Sketch
                        partners={data.partners}
                        materials={data.materials}
                        gestion={data.gestion}
                        production={data.production}
                        colors={colors}
                    />}
            </div>


            <div className={styles.name}>
                {name &&
                    <h2>{name}</h2>}
            </div>
            {date &&
                <div className={styles.date}>
                    <p>{date.day}</p>
                    <p>/</p>
                    <p>{date.month}</p>
                </div>
            }
            <div className={styles.designer}>
                {structure && structure.map((el, i) => {
                    return (
                        <p key={i}>{el}</p>
                    )
                })}
            </div>
        </div>
    )
}