import Layout from '@components/Layout';
import airtable_api from '@libs/airtable_api.js'
import {LabelProduction} from '@components/Labels';
import Card from '@components/Card';

export default function Projects({ projects }) {

 
  return (
    <Layout title='Productions' padded grid>

        {projects.map((project, i) => {
          return (
          <Card
            key={i}
            title={project.name}
            image={{src:project.illustrations[0], alt:project.name}}
            link={{path:`/projects/${project.id}`, text:"Voir le projet"}}
          >
                <LabelProduction
                  data={project.data}
                  date={project.date}
                  name={project.name}
                  structure={project.structure}
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
    project.date = {
      day: new Date(project.created_time).getDate(),
      month: new Date(project.created_time).getMonth() + 1
    }
    return project
  }))

  return {
    props: { projects },
        revalidate: 1 }
}