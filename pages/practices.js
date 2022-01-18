import Layout from '@components/Layout'
import styles from '@styles/pages/Practices.module.css';


export default function Practices() {
    return <Layout
        meta={{
            title : "Bonnes pratiques",
            description: 'Partage de bonne pratiques afin de favoriser les pratiques responsables.',
            image: "/assets/logo.png"
        }}
        padded
        >
        <div className={styles.practices}>
            <h1>
                Page en construction
            </h1>
        </div>

    </Layout>;
}
