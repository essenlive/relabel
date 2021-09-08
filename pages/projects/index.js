import Layout from '@components/Layout';
import { Button, Card, CardsGrid, Image, Text, Badge, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link'
import airtable_api from '@libs/airtable_api.js'

export default function Projects({ projects }) {

  const theme = useMantineTheme();
  const px750 = useMediaQuery('(max-width: 750px)');
  const px540 = useMediaQuery('(max-width: 540px)');
  const cardsPerRow = px540 ? 1 : px750 ? 2 : 3;


  let colorsKeys = Object.keys(theme.colors).slice(1)
  let typologies = Array.from(new Set(projects.map((el) => (el.typology))))

  return (
    <Layout title='Production' padded>
      <article>

        <CardsGrid cardsPerRow={cardsPerRow}>
          {projects.map((item, i) => {
            return (

              <Link
                key={i}
                href={{
                  pathname: '/projects/[id]',
                  query: { id: item.id },
                }}>
                <Card key={i}
                  shadow="sm"
                  style={{ cursor: 'pointer' }}>
                    
                  {item.illustrations && (<Image
                    src={item.illustrations[0]}
                    height={200}
                    alt="Photo d'illustration"
                  />)}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}
                  >
                    <Title order={4} weight={500}>{item.name}</Title>
                    <Badge color={colorsKeys[typologies.indexOf(item.typology)]}>{item.typology}</Badge>
                  </div>

                  {item.structure && (
                    <Link href={{
                      pathname: '/community/[id]',
                      query: { id: item.structure },
                    }}>
                      <Button variant="link" color="gray">
                        {item.structure}
                      </Button>
                    </Link>
                  )}

                  {item.description && (<Text size="sm">
                    {item.description}
                  </Text>)}
                  <Link
                    href={{
                      pathname: '/projects/[id]',
                      query: { id: item.id },
                    }}>
                    <Button size="sm" variant="light" fullWidth style={{ marginTop: 10 }}>
                      Voir projet
                    </Button>
                  </Link>

                </Card>
              </Link>
            )
          })}

        </CardsGrid>
      </article>
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