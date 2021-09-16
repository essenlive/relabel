import Layout from '@components/Layout';
import Link from 'next/link'
import styles from "@styles/pages/Projects.module.css";
import airtable_api from '@libs/airtable_api.js'

export default function Projects({ projects }) {

  const Card = (props) => (
  <Link
    href={{
      pathname: '/projects/[id]',
      query: { id: props.id },
    }}>
    <div className={styles.card}>

        <div className={styles.recto}>
          {props.illustrations && (
          <img
            src={props.illustrations[0]}
            height={200}
            alt="Photo d'illustration"
          />)}
        </div>

        <div className={styles.verso}>
          <div className={styles.label}>
          <img
            src="/assets/label-placeholder.png"
            height={200}
            alt="Photo d'illustration"
          />
          </div>
          <div className={styles.name}>
            <h2>{props.name}</h2>
          </div>
          <div className={styles.designer}>
          {props.structure.map((el, i)=>(
            <p>{el}</p>
          ))}

          </div>
        </div>

    </div>
  </Link>
  )
  return (
    <Layout title='Productions' padded>
      <div id="communities-grid" className={styles.projects}>

        {projects.map((item, i) => {
          return (
            <Card
              id={item.id}
              name={item.name}
              description={item.description}
              structure={item.structure}
              typology={item.typology}
              illustrations={item.illustrations}
            />
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
    return project
  }))

  return { props: { projects } }
}