import styles from "@styles/Tags.module.css";

export default function Button({ content }) {


    return (
            <span className={styles.tag}>{content}</span>
    )
}