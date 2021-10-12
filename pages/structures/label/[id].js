import airtable_api from '@libs/airtable_api';
import { LabelStructure } from '@components/Labels';


export default function Structure({ id, name, description, illustrations, status, typologies, adress, website, partners, communities, contact, production, gestion, materials, projects_designer, projects_workshop, projects_supplier }) {
    return (
            <LabelStructure
                communities={communities}
                adress={adress}
                name={name}
                bordered
            />
    );
}




export async function getStaticProps({ params }) {
    let structure = await airtable_api.getStructures({ id: params.id });
    structure = structure[0];

    structure.data = {
        partners: structure.partners.length,
        materials: structure.materials,
        gestion: structure.gestion,
        production: structure.production
    }
    structure.communities = await Promise.all(structure.communities.map(async (community) => {
        let communityName = await airtable_api.getCommunities({ id: community });
        return communityName[0].name
    }))

    return {
        props: structure,
        revalidate: 1,
    };
}


export async function getStaticPaths() {
    let paths = await airtable_api.getStructures();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}