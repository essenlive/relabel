import airtable_api from '@libs/airtable_api.js'
import LabelProject from '@components/LabelProject';


export default function Project({project}) {
    return (
        <div className={styles.embed}>
            <a href={`https://re-label.eu/projects/${project.id}`} target={"_parent"}></a>
            <LabelProject
                project={project}
                bordered
            />
        </div>
    );
}

   



export async function getStaticProps({ params }) {
    let project = await airtable_api.getProjects({ id: params.id });
    project = project[0];
    project.designers = await Promise.all(project.designers.map(async (structure) => {
        let structureEntity = await airtable_api.getStructures({ id: structure });
        return structureEntity[0]
    }))
    
    return {
        props: {project},
        revalidate: 1,
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}