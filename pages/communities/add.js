import Layout from '@components/Layout'
import styles from "@styles/pages/Form.module.css";


export default function AddCommunities() {
 

  return (
    <Layout
      title='Proposer une communauté'
      padded
    >
      <iframe className={"airtable-embed", styles.embedForm} src="https://airtable.com/embed/shryaZYeozzU6hzDO" frameborder="0" ></iframe>
    </Layout>
  );
}

