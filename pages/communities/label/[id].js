import LabelCommunity from '@components/LabelCommunity';
import styles from '@styles/pages/Embeds.module.css'
import prisma, { serialize } from '@libs/prisma'


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
    let community = await prisma.community.findMany({ where: { id: params.id } });
    community = community[0];
    let structures = await prisma.structure.findMany();


    community.structures = community.structures.map((structureId) => {
        let structure = structures.filter((el) => el.id === structureId);
        structure[0].communities = [{ name: community.name }];
        return structure[0]
    })

    return {
        props: { community: serialize(community) },
        revalidate: 1
    }
}


export async function getStaticPaths() {
    let communities = await prisma.community.findMany();
    let paths = communities.map((community) => ({ params: { id: community.id } }))
    return { paths: paths, fallback: "blocking" };
}