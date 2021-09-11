import Layout from '@components/Layout';
import { Image, Text, Button, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link'
import styles from "@styles/pages/Projects.module.css";
import airtable_api from '@libs/airtable_api.js'

export default function Projects({ projects }) {

  // const theme = useMantineTheme();
  // let colorsKeys = Object.keys(theme.colors).slice(1)
  // let typologies = Array.from(new Set(projects.map((el) => (el.typology))))

  const Card = (props) => (
  <Link
    href={{
      pathname: '/projects/[id]',
      query: { id: props.id },
    }}>
    <div className={styles.card}>

        <div className={styles.recto}>
          {props.illustrations && (<Image
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            src={props.illustrations[0]}
            height={200}
            alt="Photo d'illustration"
          />)}
        </div>

        <div className={styles.verso}>
          <div className={styles.label}>
          <Image
            style={{
              position: 'static',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            src="/assets/label-placeholder.png"
            height={200}
            alt="Photo d'illustration"
          />
          </div>
          <div className={styles.name}>
            <Title order={2} weight={500}>{props.name}</Title>
          </div>
          <div className={styles.designer}>
          {props.structure.map((el, i)=>(
            <Text weight={500} size="lg">{el}</Text>
          ))}

          </div>
        </div>

    </div>
  </Link>
  )
  return (
    <Layout title='Production' padded>
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
          <Title order={2}>Votre projet ?</Title>
          <Text size="xl">Vous voulez documenter un projet éco-conçu et en quantifier la démarche ?</Text>

          <Link href="">
            <Button variant="light" color="gray">Labeliser un projet</Button>
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