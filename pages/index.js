import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout'
import styles from "@styles/Home.module.css";
import Sketch from '@components/Sketch';


const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASEID,
  apiKey: process.env.AIRTABLE_APIKEY,
  tableName: 'Structure',
});

export default function Home({data}) { 

  return (
    <Layout title='Home'>
      <article>
        <h1>
          Generator
        </h1>
        <Sketch data={data} />
      </article>
    </Layout>
  );
}




export async function getServerSideProps() {
  const data = await airtable.read();
  return { props: { data } }
}