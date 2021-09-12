import Layout from '@components/Layout'
import ReactMap from '@components/Map'
import airtable_api from '@libs/airtable_api.js'


export default function Structures({ structures }) {
  return <Layout title="Communauté">
    <ReactMap data={structures} />
  </Layout>;
}

export async function getStaticProps() {
  const structures = await airtable_api.getStructures({adress : true});
  return { props: { structures } }
}