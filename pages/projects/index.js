import AirtablePlus from 'airtable-plus';
import Layout from '@components/Layout';
import Card from '@components/Card';
import styles from "@styles/pages/Projects.module.css";


const airtable = new AirtablePlus({
    baseID: process.env.AIRTABLE_BASEID,
    apiKey: process.env.AIRTABLE_APIKEY,
    tableName: 'Structure',
});
export default function Projects({data}) {
  return (
    <Layout title='Projets' padded>
      <article>
        <section className={styles.projectGrid}>
          {data.map((item, i) => {
                  return (
                    <div 
                      className={styles.projectItem}
                      key={item.id}>
                      <Card
                        image={{
                          url: item.fields.Illustration[0].thumbnails.large.url,
                          alt:"Photo d'illustration"
                        }}
                        title={item.fields.Name}
                        subtitle={item.fields.Typology}
                        tags={item.fields.Team}
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
    filterByFormula: `NOT({Illustration} = '')`
  }, {
    tableName: 'Projects'
  });
  return { props: { data } }
}