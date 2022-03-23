import classNames from "classnames"
import styles from "@styles/components/Tags.module.css";

const Tags = ({tags, colorMap, className, dark}) => {

    if (!(colorMap instanceof Map)) {
        let colors = colorMap ? colorMap : ["var(--yellow-400)", "var(--lightBlue-400)", "var(--green-400)", "var(--rose-400)", "var(--pink-400)", "var(--cyan-400)"];
        let i = 0;
        colorMap = new Map()
        tags.forEach((tag) => {
            if (!colorMap.has(tag)) {
                colorMap.set(tag, colors[i % colors.length])
                i++
            }
        })
    }
    return (
        <div className={classNames(className, styles.tags)}>
            {tags.map((tag,i)=>(
                <span className={styles.tag} style={{ backgroundColor: colorMap.get(tag), color: dark ? "var(--black)" : "var(--white)"}} key={i}>{tag}</span>
            ))}
        </div>
    );
}

export default Tags