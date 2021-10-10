import Layout from '@components/Layout'
import airtable_api from '@libs/airtable_api.js'
import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import styles from "@styles/components/Map.module.css";
import Link from 'next/link'
import { LabelStructure } from '@components/Labels';
import Card from '@components/Card';


export default function Structures({ structures }) {
  let colors = ["primary", "secondary", "tertiary", "quaternary", "pink-500", "cyan-500"];
  let typologies = Array.from(new Set(structures.map((el) => (el.typologies)).flat()))

  const [viewport, setViewport] = useState({
    latitude: 48.85658,
    longitude: 2.3518,
    zoom: 10
  });
  const [selection, setSelection] = useState(undefined);
  const close = () => { if (selection) setSelection(undefined); };

  const markerClick = (organisation) => {
    setViewport({
      latitude: Number(organisation.latitude),
      longitude: Number(organisation.longitude),
      zoom: viewport.zoom,
      transitionDuration: 500,
      transitionInterpolator: new FlyToInterpolator(),
    });
    setSelection(organisation)
  };
  return <Layout title="Carte" full>
    <div className={styles.add}>
      <Link
        href={{ pathname: '/structures/add' }}>
        <p className='link'>Réferencer votre structure</p>
      </Link>
    </div>
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOXTOKEN}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/essen/cjtsfp7dc00201fmfl8jllc3k"
      onViewportChange={(viewport) => setViewport(viewport)}
    >

      {structures.map((item, i) => {
        return (
          <Marker
            className={styles.marker}
            key={i}
            latitude={Number(item.latitude)}
            longitude={Number(item.longitude)}
            offsetLeft={-6}
            offsetTop={-6}
            onClick={() => {
              markerClick(item)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={`var(--${colors[typologies.indexOf(item.typologies[0])]})`} viewBox="0 0 12 12" stroke="none">
              <circle cx="6" cy="6" r="6" />
            </svg>
          </Marker>
        )
      })}
      {selection && <Popup
        latitude={Number(selection.latitude)}
        longitude={Number(selection.longitude)}
        closeButton={true}
        closeOnClick={false}
        onClose={() => close()}
        anchor="top" >
        <Card
          title={selection.name}
          description={selection.description}
          image={{ src: selection.illustrations[0], alt: selection.name }}
          link={{ path: `/structures/${selection.id}`, text: "Voir la structure" }}
        >

          <LabelStructure
            name={selection.name}
            adress={selection.adress}
            communities={selection.communities}
          />
        </Card>

      </Popup>}
    </ReactMapGL>
  </Layout>;
}

export async function getStaticProps() {
  let structures = await airtable_api.getStructures({adress : true});

  structures = await Promise.all(structures.map(async (structure) => {
    structure.communities = await Promise.all(structure.communities.map(async (community) => {
      let communityName = await airtable_api.getCommunities({ id: community });
      return communityName[0].name
      }))
    return structure
  }))
  return {
    props: { structures },
    revalidate: 1 }
}