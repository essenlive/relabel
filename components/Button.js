import Link from 'next/link'
import styles from "@styles/components/Button.module.css";


export default function Button({ content, link }) {


    return (
        <Link href={link}>
            <a className={styles.button}>{content}</a>
        </Link>
    )
}