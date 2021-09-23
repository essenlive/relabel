import Layout from '@components/Layout';
import Link from 'next/link'
import styles from "@styles/pages/Projects.module.css";
import airtable_api from '@libs/airtable_api.js'
import LabelProduction from '@components/LabelProduction';

export default function Projects({ projects }) {

 
  return (
    <Layout title='Productions' padded>
      <div id="communities-grid" className={styles.projects}>

        {projects.map((item, id) => {
          return (
            <Link
              href={{
                pathname: '/projects/[id]',
                query: { id: item.id },
              }}
              key={id}
              >
              <div className={styles.card}>

                <div className={styles.recto}>
                  {item.illustrations && (
                    <img
                      src={item.illustrations[0]}
                      height={200}
                      alt="Photo d'illustration"
                    />)}
                </div>

                <div className={styles.verso}>
                  <LabelProduction
                    data={item.data}
                    name={item.name}
                    structure={item.structure}
                  />
                </div>

              </div>
            </Link>
          )
        })}

        <div className={styles.add}>
          <h2>Votre projet ?</h2>
          <p>Vous voulez documenter un projet éco-conçu et en quantifier la démarche ?</p>

          <Link
            href={{
              pathname: '/projects/add',
            }}>
            <p className='link'>Labeliser un projet</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}


export async function getStaticProps() {
  let projects = await airtable_api.getProjects({ illustrations: true });
  projects = await Promise.all(projects.map(async (project) => {
    project.structure = await Promise.all(project.structure.map(async (structure) => {
      let structureName = await airtable_api.getStructures({ id: structure });
      return structureName[0].name
    }))
    project.data = {
      partners: project.partnerscount,
      materials: project.materials,
      gestion: project.gestion,
      production: project.production
    }
    console.log(project);
    return project
  }))

  return { props: { projects } }
}