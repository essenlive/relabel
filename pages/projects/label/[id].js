import airtable_api from '@libs/airtable_api.js'
import {LabelProduction} from '@components/Labels';
import Link from 'next/link'


export default function Project({ id, name, typology, description, illustrations, team, designers, workshops, suppliers, duration, production, gestion, materials, date, data }) {
    return (

        <a href={`https://re-label.eu/projects/${id}`}>
            <LabelProduction
                data={data}
                date={date}
                name={name}
                structure={designers}
            />
        </a>
    );
}

   



export async function getStaticProps({ params }) {
    let project = await airtable_api.getProjects({ id: params.id });
    project = project[0];
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
    project.date = {
        day: new Date(project.created_time).getDate(),
        month: new Date(project.created_time).getMonth() + 1
    }

    
    return {
        props: project,
        revalidate: 1,
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getProjects();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}