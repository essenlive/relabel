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
                  date={{
                    day: project.date ? new Date(project.date).getDate() : new Date().getDate(),
                    month: project.date ? new Date(project.date).getMonth() + 1 : new Date().getMonth() + 1,
                    year: project.date ? new Date(project.date).getYear() + 1900 : new Date().getYear() + 1900
                  }}
                  name={project.name}
                  structure={project.designers}
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
    project.designers = await Promise.all(project.designers.map(async (structure) => {
      let structureName = await airtable_api.getStructures({ id: structure });
      return structureName[0].name
    }))
    project.data = {
      partners: project.designers.length + project.workshops.length + project.suppliers.length,
      materials: project.materials,
      gestion: project.gestion,
      production: project.production
    }
    return project
  }))

  return {
    props: { projects },
        revalidate: 1 }
}