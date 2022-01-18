import Layout from '@components/Layout'
import styles from '@styles/pages/Practices.module.css';

export default function Practices() {
    return (<Layout
        meta={{
            title : "Bonnes pratiques",
            description: 'Partage de bonne pratiques afin de favoriser les pratiques responsables.',
            image: "/assets/logo.png"
        }}
            fullWidth
        >
        <div className={styles.practices}>
            <embed src="/assets/GUIDE-DE-BONNES-PRATIQUES_V1_Export.pdf" width="100%" height="100%" />
        </div>

    </Layout>)
}