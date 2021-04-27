import Layout from '@components/Layout'
import ReactMap from '@components/ReactMap'
import AirtablePlus from 'airtable-plus';
// import styles from "@styles/Community.module.css";

const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASEID,
  apiKey: process.env.AIRTABLE_APIKEY,
  tableName: 'Structures',
});

export default function Community({ data }) {
  return <Layout title="Communauté">
    <ReactMap data={data} />
  </Layout>;
}

export async function getStaticProps({ params }) {
  const rawData = await airtable.read({
    filterByFormula: `NOT({Datas} = '')`}, {
    tableName: 'Structures'
  });
  const mapping = {
    name: "Name",
    illustrations: "Illustration",
    satuts: "Status",
    activity: "Activity",
    adress: "Adress",
    longitude: "Longitude",
    latitude: "Latitude"
  }
  const data = Array(rawData.length)
  rawData.forEach((el, i) => {
    data[i] = {};
    for (const key in mapping) {
      data[i][key] = typeof (el.fields[mapping[key]]) !== 'undefined' ? el.fields[mapping[key]] : null;
    }
  })
  return { props: { data } }
}