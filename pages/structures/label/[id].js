import airtable_api from '@libs/airtable_api';
import Layout from '@components/Layout'
import classNames from 'classnames';
import styles from "@styles/pages/SingleStructure.module.css";
import Carousel from "@components/Carousel";
import Link from 'next/link'
import { LabelStructure } from '@components/Labels';


export default function Structure({ name, adress, community, id }) {
    
    return (

        <Link href={`/structures/${id}`}>
                  
                    <LabelStructure
                        communities={community}
                        adress={adress}
                        name={name}
                        bordered
                    />
                    </Link>
    );
}




export async function getStaticProps({ params }) {
    let structure = await airtable_api.getStructures({ id: params.id });
    structure = structure[0];
    if (structure.datas != false) {
        structure.datas = await airtable_api.getDatas({ id: structure.datas[0] })
        structure.datas = structure.datas[0];
    }
    else{
        structure.datas = {
            year : 'NC-01-01',
            partners: [],
            production: 0,
            gestion: 0,
            materials: 0,
            partnerscount : 0
        }
    }

    structure.community = await Promise.all(structure.community.map(async (community) => {
        let communityName = await airtable_api.getCommunities({ id: community });
        return communityName[0].name
    }))
    structure.projects = await Promise.all(structure.projects.map(async (el) => {
        let project = await airtable_api.getProjects({ id: el });
        return project[0]
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