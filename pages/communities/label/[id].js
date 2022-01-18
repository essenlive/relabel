import airtable_api from '@libs/airtable_api.js'
import LabelCommunity from '@components/LabelCommunity';


export default function label({ community }) {
    return (
        <div className={styles.embed}>
            <a href={`https://re-label.eu/communities/${community.id}`} target={"_parent"}></a>
            <LabelCommunity
                community={community}
                bordered
            />
        </div>
    );
}


export async function getStaticProps({ params }) {
    let community = await airtable_api.getCommunities({ id: params.id });
    community = community[0];
    community.structures = await Promise.all(community.structures.map(async (el) => {
        let structure = await airtable_api.getStructures({ id: el });
        return structure[0]
    }))
    return {
        props: {community},
        revalidate: 1
    }
}
export async function getStaticPaths() {
    let paths = await airtable_api.getCommunities();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}