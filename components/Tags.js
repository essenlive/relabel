import classNames from "classnames"
import styles from "@styles/components/Tags.module.css";

const Tags = ({tags, className}) => {
    let colors = ["yellow-400","lightBlue-400", "green-400", "rose-400",  "pink-400", "cyan-400"];
    return (
        <div className={classNames(className, styles.tags)}>
            {tags.map((tag,i)=>(
                <span className={styles.tag} style={{backgroundColor:`var(--${colors[i%colors.length]})`}} key={i}>{tag}</span>
            ))}
        </div>
    );
}

export default Tags