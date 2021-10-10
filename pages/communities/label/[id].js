import airtable_api from '@libs/airtable_api.js'
import Link from 'next/link'
import { LabelCommunity } from '@components/Labels';


export default function label({ id, name, year, description, cities, website, members, status, colors, contact }) {
    return (

        <a href={`https://re-label.eu/communities/${id}`}>
            <LabelCommunity
                name={name}
                year={year}
                data={{
                    partners: members.length,
                    materials: '1',
                    gestion: '0.1',
                    production: '0.9'
                }}
                colors={colors}
                bordered
            />
        </a>
                
    );
}


export async function getStaticProps({ params }) {
    let community = await airtable_api.getCommunities({ id: params.id });
    community = community[0];
    community.members = await Promise.all(community.members.map(async (el) => {
        let member = await airtable_api.getStructures({ id: el });
        return member[0]
    }))
    return {
        props: community,
        revalidate: 1
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getCommunities();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}