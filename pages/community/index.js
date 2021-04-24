import Layout from '@components/Layout'
import ReactMap from '@components/ReactMap'
import AirtablePlus from 'airtable-plus';
// import styles from "@styles/Community.module.css";

const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASEID,
  apiKey: process.env.AIRTABLE_APIKEY,
  tableName: 'Structure',
});

export default function Community({data}) {
  return <Layout title="Communauté">
        <ReactMap data={data}/>
    </Layout>;
}


export async function getServerSideProps() {
  const data = await airtable.read();
  return { props: { data } }
}