import Layout from '@components/Layout'
import styles from "@styles/pages/Structures.module.css";
import Link from 'next/link'
import ReactMap, { prepareData } from '@components/ReactMap'
import prisma, { manageImages, serialize } from '@libs/prisma';
import { useState } from 'react';
import Tags from '@components/Tags';

export default function Structures({ structures, communities }) {
  communities = communities.map(el=>el.name);
  const [typologyFilter, setTypologyFilter] = useState(new Set(["designer", "stockage", "atelier", "autre"]))
  const [communityFilter, setCommunityFilter] = useState(new Set(communities))
  const [filteredStructures, setFilteredStructures] = useState(filterStructures())
  const colors = ["#D3494E", "#FFE5AD", "#13BBAF", "#7BC8F6"];
  const colorMap = new Map()
  colorMap.set('designer', colors[0]);
  colorMap.set('atelier', colors[1]);
  colorMap.set('stockage', colors[2]);
  colorMap.set('autre', colors[3]);

  function filterStructures(){
    let filteredStructures = structures.filter((structure) => {
      let typologyCheck = false;
      let communityCheck = false;
      structure.typologies.forEach(typology => { if (typologyFilter.has(typology)) typologyCheck = true });
      structure.communities.forEach(community => { if (communityFilter.has(community.name)) communityCheck = true });
      return typologyCheck && communityCheck
    })
    return(filteredStructures)
  }

  function toggleFilter(selection, filter){
    if (filter.has(selection)) { filter.delete(selection) }
    else (filter.add(selection))
    return(filter);
  }


  return <Layout
    meta={{
      title: "Carte",
      description: "Le Re-Label vise a mettre en valeur les structures du territoire qui portent une démarche responsable et écologique.",
      image: "/assets/logo.png"
    }}
    full>

      <ReactMap
        className={styles.map}
        structures={prepareData(filteredStructures)}
        colorMap= {colors}
        initialViewport={{
          latitude: 48.85658,
          longitude: 2.3518,
          zoom: 4
        }}
    />
    <div className={styles.infos}>
        <h3>Filtres</h3>
        <div className={styles.filters}>
          <div className={styles.filter}>
          <h4>Typologies</h4>
          <ul>
            <li onClick={() => {
              setTypologyFilter(toggleFilter("designer", typologyFilter));
              setFilteredStructures(filterStructures())
            }}>
              <span className={styles.legend} style={typologyFilter.has("designer") ? { backgroundColor: colors[0], borderColor: colors[0] } : {}}></span>
              Designers
            </li>
            <li onClick={() => {
              setTypologyFilter(toggleFilter("stockage", typologyFilter));
              setFilteredStructures(filterStructures())
            }}>
              <span className={styles.legend} style={typologyFilter.has("stockage") ? { backgroundColor: colors[1], borderColor: colors[1] } : {}}></span>
              Ateliers
            </li>
            <li onClick={() => {
              setTypologyFilter(toggleFilter("atelier", typologyFilter));
              setFilteredStructures(filterStructures())
            }}>
              <span className={styles.legend} style={typologyFilter.has("atelier") ? { backgroundColor: colors[2], borderColor: colors[2] } : {}}></span>
              Fournisseurs
            </li>
            <li onClick={() => {
              setTypologyFilter(toggleFilter("autre", typologyFilter));
              setFilteredStructures(filterStructures())
            }}>
              <span className={styles.legend} style={typologyFilter.has("autre") ? { backgroundColor: colors[3], borderColor: colors[3] } : {}}></span>
              Partenaires
            </li>
            <li onClick={() => {
                setTypologyFilter(typologyFilter.add("designer").add("atelier").add("stockage").add("autre"))
              setFilteredStructures(filterStructures())
              }}> <span className={styles.legend} style={typologyFilter.size === 4 ? { backgroundColor: "var(--gray-300)" } : {}}></span>Tout afficher </li>
          </ul>
        </div>
        <div className={styles.filter}>
          <h4>Communautés</h4>
          <ul>
            {communities.map((community, i) => {
              return (
                <li key={i} onClick={() => {
                  setCommunityFilter(toggleFilter(community, communityFilter));
                  setFilteredStructures(filterStructures())
                }}>
                  <span className={styles.legend} style={communityFilter.has(community) ? { backgroundColor: "var(--gray-300)" } : {}}></span>
                  {community}
                </li>
              )
            })}
            {/* <li onClick={() => {
              console.log(communities);
                setCommunityFilter(new Set(communities))
              setFilteredStructures(filterStructures())
              }}> <span className={styles.legend} style={communityFilter.size === communities.length ? { backgroundColor: "var(--gray-300)" } : {}}></span> Tout afficher </li> */}
          </ul>
        </div>


        </div>
        <div className={styles.add}>
          <Link
            href={{ pathname: '/structures/add' }}>
            <p className='link-simple'>Réferencer votre structure</p>
          </Link>
      </div>
      <div className={styles.list}>
        
          {filteredStructures.map((structure,i)=>{
            return(
              <div className={styles.listItem} key={i}>
                <div className={styles.listItemInfo}>
                  <h4> {structure.name} </h4>
                  <Tags tags={structure.typologies} colorMap={colorMap}/>                  
                  <Link
                    href={{ pathname: `/structures/${structure.id}` }}>
                    <p className='link'>Voir la structure</p>
                  </Link>
                </div>
                {structure.illustrations[0] && (<img src={structure.illustrations[0]}/>)}
              </div>
              )
          })}
      </div>
    </div>

  </Layout>;
}



export async function getStaticProps() {
  let communities = await prisma.community.findMany();
  let structures = await prisma.structure.findMany();
  structures = await Promise.all(structures.map(async (structure) => {
    structure.illustrations = await Promise.all(structure.illustrations.map(async (illu, i) => await manageImages(illu, structure.name, i)))
    return structure
  }))

  structures = structures.map((structure) => {
    structure.communities = structure.communities.map((communityId) => {
      let community = communities.filter((el) => el.id === communityId);
      return community[0]
    })
    structure.data = [structure.projects_designer.length, structure.projects_other.length, structure.projects_supplier.length, structure.projects_workshop.length]
    return structure
  })
  return {
    props: {
      structures : serialize(structures),
      communities: serialize(communities) 
    },
    revalidate: 1
  }
}