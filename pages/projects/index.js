import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout';
import Link from 'next/link';
// import styles from "@styles/Catalog.module.css";


const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Structure',
});
export default function Catalog({data}) {
  return (
    <Layout title='Catalog'>
      <article>
        <h1>
          Projets
        </h1>
        <section>
          {data.map((item, i) => {
                  return (
                      <div key={item.id}>
                        <h2>
                          {item.fields.Name}
                        </h2>
                        <div>
                          {item.fields.Typology}
                      </div>
                      <Link
                        href={{
                          pathname: '/projects/[id]',
                          query: { id: item.fields.Name },
                        }}
                      >
                        <a>Voir projet</a>
                      </Link>
                      </div>
                  )
              })}
        </section>
      </article>
    </Layout>
  );
}


export async function getStaticProps({ params }) {
  const data = await airtable.read({
    filterByFormula: `NOT({Image} = '')`
  }, {
    tableName: 'Projects'
  });
  return { props: { data } }
}