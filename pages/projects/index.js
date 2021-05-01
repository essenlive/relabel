import Layout from '@components/Layout';
import Card from '@components/Card';
import airtable_api from '@libs/airtable_api.js'
import styles from "@styles/pages/Projects.module.css";

export default function Projects({ projects }) {
  return (
    <Layout title='Projets' padded>
      <article>
        <section className={styles.projectGrid}>
          {projects.map((item, i) => {
                  return (
                    <div 
                      className={styles.projectItem}
                      key={i}>
                      <Card
                        image={{
                          url: item.illustrations[0].thumbnails.large.url,
                          alt:"Photo d'illustration"
                        }}
                        title={item.name}
                        subtitle={item.typology}
                        tags={item.team}
                        link={{
                          pathname: '/projects/[id]',
                          query: { id: item.name },
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


export async function getStaticProps(){
  const projects = await airtable_api.getProjects({ illustrations: true});
  return { props: {projects} }
}