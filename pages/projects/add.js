import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";


export default function AddProjects() {
 

  return (
    <Layout
      title='Labeliser un projet'
      padded
    >
      <iframe className={"airtable-embed", styles.form} src="https://airtable.com/embed/shrJHEslO47jW9XL1" frameborder="0" ></iframe>
    </Layout>
  );
}

