import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout';
import Card from '@components/Card';
import Link from 'next/link';
import styles from "@styles/Projects.module.css";


const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Structure',
});
export default function Projects({data}) {
  return (
    <Layout title='Projets'>
      <article>
        <h1>
          Projets
        </h1>
        <section className={styles.projectGrid}>
          {data.map((item, i) => {
                  return (
                    <div 
                      className={styles.projectItem}
                      key={item.id}>
                      <Card
                        image={{
                          url: item.fields.Image[0].thumbnails.large.url,
                          alt:"Photo d'illustration"
                        }}
                        title={item.fields.Name}
                        subtitle={item.fields.Typology}
                        // tags={}
                        // content={}
                        link={{
                            pathname: '/projects/[id]',
                            query: { id: item.fields.Name },
                          }}
                      />
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