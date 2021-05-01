import Layout from '@components/Layout'
import ReactMap from '@components/ReactMap'
import airtable_api from '@libs/airtable_api.js'
// import styles from "@styles/Community.module.css";


export default function Community({ structures }) {
  return <Layout title="Communauté">
    <ReactMap data={structures} />
  </Layout>;
}

export async function getStaticProps() {
  const structures = await airtable_api.getStructures({datas : true});
  return { props: { structures } }
}