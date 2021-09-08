import Layout from '@components/Layout';
import { Button, Card, CardsGrid, Image, Text, Badge, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link'
import styles from "@styles/pages/Projects.module.css";
import airtable_api from '@libs/airtable_api.js'

export default function Projects({ projects }) {

  const theme = useMantineTheme();
  let colorsKeys = Object.keys(theme.colors).slice(1)
  let typologies = Array.from(new Set(projects.map((el) => (el.typology))))

  const Card = (props) => (
    <div className={styles.card}>

      <div className={styles.illustration}>

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

      <div className={styles.infos}>
        <Title order={4} weight={500}>{props.name}</Title>
        <Badge color={colorsKeys[typologies.indexOf(props.typology)]}>{props.typology}</Badge>

        {props.structure && (
          <Link href={{
            pathname: '/community/[id]',
            query: { id: props.structure },
          }}>
            <Button variant="link" color="gray">
              {props.structure}
            </Button>
          </Link>
        )}

        {props.description && (<Text size="sm">
          {props.description}
        </Text>)}

        <Link
          href={{
            pathname: '/projects/[id]',
            query: { id: props.id },
          }}>
          <Button size="sm" variant="light" style={{ marginTop: 10 }}>
            Voir projet
          </Button>
        </Link>
      </div>

    </div>
  )
  return (
    <Layout title='Production' padded>
        <div id="communities-grid" className={styles.projects}>

          {projects.map((item, i) => {
            console.log(item);
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