import styles from "@styles/components/Tags.module.css";

export default function Button({ content }) {


    return (
            <span className={styles.tag}>{content}</span>
    )
}