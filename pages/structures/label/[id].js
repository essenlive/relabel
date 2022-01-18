import airtable_api from '@libs/airtable_api';
import LabelStructure from '@components/LabelStructure';
import styles from '@styles/pages/Embeds.module.css'

export default function Structure({ structure}) {
    return (
        <div className={styles.embed}>
            <a  href={`https://re-label.eu/structures/${structure.id}`} target={"_parent"}></a>
            <LabelStructure
                structure={structure}
                bordered
                />
        </div>
    );
}




export async function getStaticProps({ params }) {
    let structure = await airtable_api.getStructures({ id: params.id });
    structure = structure[0];
    structure.communities = await Promise.all(structure.communities.map(async (community) => {
        let communityName = await airtable_api.getCommunities({ id: community });
        return communityName[0]
    }))

    return {
        props: {structure},
        revalidate: 1,
    };
}


export async function getStaticPaths() {
    let paths = await airtable_api.getStructures();
    paths = paths.map((el) => ({ params: { id: el.id } }))
    return { paths: paths, fallback: false };
}