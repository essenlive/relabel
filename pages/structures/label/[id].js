import LabelStructure from '@components/LabelStructure';
import styles from '@styles/pages/Embeds.module.css'
import prisma, { serialize } from '@libs/prisma'

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
    let structure = await prisma.structure.findMany({ where: { id: params.id } });
    structure = structure[0];
    let communities = await prisma.community.findMany();

    structure.communities = structure.communities.map((communityId) => {
        let community = communities.filter((el) => el.id === communityId);
        return community[0]
    })

    return {
        props: { structure: serialize(structure)},
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    let structures = await prisma.structure.findMany();
    let paths = structures.map((structure) => ({ params: { id: structure.id } }))
    return { paths: paths, fallback: "blocking" };
}