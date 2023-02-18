import Layout from '@components/Layout';
import LabelProject from '@components/LabelProject';
import Card from '@components/Card';
import prisma, { manageImages, serialize } from '@libs/prisma';


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
              image={{ src: project.illustrations[0], alt:project.name}}
              link={{path:`/projects/${project.id}`, text:"Voir le projet"}}
              colorMap={project.colors}
              id={project.id}
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
  let projects = await prisma.project.findMany();
  let structures = await prisma.structure.findMany();


  projects = await Promise.all(projects.map(async (project) => {
    project.illustrations = await Promise.all(project.illustrations.map(async (illu, i) => await manageImages(illu, project.name, i)))
    return project
  }))
 

  projects = projects.map((project) => {
    project.designers = project.designers.map((structureId) => {
      let structure = structures.filter((el) => el.id === structureId);
      return structure[0]
    })
    return project
  })

  return {
    props: { projects : serialize(projects) },
    revalidate: 1
  }
}
