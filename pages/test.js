import Layout from '@components/Layout'
import airtable_api from '@libs/airtable_api.js'
import React from 'react';
import LabelStructure from '@components/LabelStructure';
import LabelCommunity from '@components/LabelCommunity';
import LabelProject from '@components/LabelProject';
import styles from '@styles/pages/Test.module.css';


export default function test({ communities, structures, projects }) {
    return <Layout title="Test" padded>
        <div className={styles.test}>
            <LabelCommunity
                community={communities[1]}
                bordered
            />
            <LabelStructure
                structure={structures[0]}
                bordered
            />
            <LabelProject
                project={projects[2]} 
                bordered
            />

        </div>

    </Layout>;
}

export async function getStaticProps() {

    let structures = await airtable_api.getStructures({ adress: true });
    structures = await Promise.all(structures.map(async (structure) => {
        structure.communities = await Promise.all(structure.communities.map(async (community) => {
            let communityName = await airtable_api.getCommunities({ id: community });
            return communityName[0]
        }))
        return structure
    }))

    let communities = await airtable_api.getCommunities({ status: true });
    communities = await Promise.all(communities.map(async (community) => {
        community.structures = await Promise.all(community.structures.map(async (structure) => {
            let structureEntity = await airtable_api.getStructures({ id: structure });
            return structureEntity[0]
        }))
        return community
    }))

    let projects = await airtable_api.getProjects();
    projects = await Promise.all(projects.map(async (project) => {
        project.designers = await Promise.all(project.designers.map(async (structure) => {
            let structureEntity = await airtable_api.getStructures({ id: structure });
            return structureEntity[0]
        }))
        project.suppliers = await Promise.all(project.suppliers.map(async (structure) => {
            let structureEntity = await airtable_api.getStructures({ id: structure });
            return structureEntity[0]
        }))
        project.workshops = await Promise.all(project.workshops.map(async (structure) => {
            let structureEntity = await airtable_api.getStructures({ id: structure });
            return structureEntity[0]
        }))
        project.others = await Promise.all(project.others.map(async (structure) => {
            let structureEntity = await airtable_api.getStructures({ id: structure });
            return structureEntity[0]
        }))
        return project
    }))



    return {
        props: { structures, communities, projects },
        revalidate: 1
    }
}