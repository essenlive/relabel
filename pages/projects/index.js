import Layout from '@components/Layout';
import airtable_api from '@libs/airtable_api.js'
import LabelProject from '@components/LabelProject';
import Card from '@components/Card';

export default function Projects({ projects }) {
  
  return (
    <Layout
      meta={{
          title: "Productions",
        description: "Le Re-Label vise a mettre en avant les projets labelisés et issus d'une démarche responsable.",
        image: "/assets/logo.png"
          }} 
      padded 
      grid
      >

        {projects.map((project, i) => {
          return (
          <Card
            key={i}
              title={project.name}
              tags={[project.typology]}
              image={{src:project.illustrations[0], alt:project.name}}
              link={{path:`/projects/${project.id}`, text:"Voir le projet"}}
              colorMap={project.colors}
            >
                <LabelProject
                  project={project}
                />
            </Card>
        )})}
          <Card
            title={"Votre projet ?"}
            description={"Vous voulez documenter un projet éco-conçu et en quantifier la démarche ?"}
            link={{path:`/projects/add`, text:"Labeliser un projet"}}
          />

    </Layout>
  );
}


export async function getStaticProps() {
  let projects = await airtable_api.getProjects();
  projects = await Promise.all(projects.map(async (project) => {
    project.designers = await Promise.all(project.designers.map(async (structure) => {
      let structureEntity = await airtable_api.getStructures({ id: structure });
      return structureEntity
    }))
    return project
  }))
  return { props: { projects }, revalidate: 1 }
}