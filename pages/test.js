import Layout from '@components/Layout'
import styles from "@styles/pages/Structures.module.css";
import Link from 'next/link'
import LabelCommunity from '@components/LabelCommunity';
import Card from '@components/Card';
import prisma from '@libs/prisma'

export default function Test({communities}) {
    communities = JSON.parse(communities)
    return(
    <Layout
        meta={{
            title: "Communautés",
            description: "Le Re-Label vise animer des communautés de bonnes pratiques localisées sur le territoire.",
            image: "/assets/logo.png"
        }}
        padded
        grid
    >

        {communities.map((community, i) => {
            return (
                <Card
                    key={i}
                    title={community.name}
                    tags={community.cities}
                    description={community.description}
                    colorMap={community.colors}
                    link={{ path: `/communities/${community.id}`, text: "Voir la communauté" }}
                >
                    <LabelCommunity
                        community={community}
                    />
                </Card>
            )
        })}
        <Card
            title={"La vôtre ?"}
            description={"Vous faites partie d'une communauté qui oeuvre pour des pratiques plus reponsables et solidaires dans la fabrication et la production ?"}
            link={{ path: `/communities/add`, text: "Proposer une communauté" }}
        />

    </Layout>
    )}


export async function getStaticProps() {
    let communities = await prisma.community.findMany();
    let structures = await prisma.structure.findMany();

    communities = communities.map((community) => {
        community.structures = community.structures.map((structureId) => {
            let structure = structures.filter((el) => el.id === structureId);
            return structure[0]
        })
        return community
    })

    communities = JSON.stringify(communities)

    return {
        props: { communities },
        revalidate: 1
    }
}