import Sketch from '@components/Sketch'
import classNames from "classnames"
import styles from "@styles/components/Label.module.css";

export default function Label({ data, title, status, date, size}) {

    return (
        <div className={classNames(styles.label, 
        { [`${styles.small}`]: size === "small" },
        { [`${styles.medium}`]: size === "medium" },
        { [`${styles.large}`]: size === "large" })}>
            <div className={styles.sketch}>
               <Sketch
                    partners={data.partners}
                    materials={data.materials}
                    gestion={data.gestion}
                    production={data.production}
               /> 
            </div>
            <div className={styles.infos}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.status}>{status}</div>
                <div className={styles.date}>{date}</div>
            </div>
        </div>
    )
}