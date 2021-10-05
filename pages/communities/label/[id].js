import airtable_api from '@libs/airtable_api.js'
import Link from 'next/link'
import { LabelCommunity } from '@components/Labels';


export default function label({ name, colors, year, id }) {
    return (

        <Link href={`/communities/${id}`}>
            <LabelCommunity
                name={name}
                year={year}
                data={{
                    partners: '0',
                    materials: '1',
                    gestion: '0.1',
                    production: '0.9'
                }}
                colors={colors}
                bordered
            />
        </Link>
                
    );
}


export async function getStaticProps({ params }) {
    let community = await airtable_api.getCommunities({ id: params.id });
    community[0].members = await Promise.all(community[0].members.map(async (el) => {
        let member = await airtable_api.getStructures({ id: el });
        return member[0]
    }))
    return {
        props: community[0],
        revalidate: 1
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getCommunities();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}