import LabelProject from '@components/LabelProject';
import styles from '@styles/pages/Embeds.module.css'
import prisma, { serialize } from '@libs/prisma'


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
    let project = await prisma.project.findMany({ where: { id: params.id } });
    project = project[0];
    let structures = await prisma.structure.findMany();
    project.designers = project.designers.map((structureId) => {
        let structure = structures.filter((el) => el.id === structureId);
        return structure[0]
    })

    return {
        props: { project: serialize(project) },
        revalidate: 1,
    }
}
export async function getStaticPaths() {
    let projects = await prisma.project.findMany();
    let paths = projects.map((project) => ({ params: { id: project.id } }))
    return { paths: paths, fallback: "blocking" };
}