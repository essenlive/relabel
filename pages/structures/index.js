import Layout from '@components/Layout'
import airtable_api from '@libs/airtable_api.js'
import React, { useState, useRef } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator, Source, Layer } from 'react-map-gl';
import styles from "@styles/components/Map.module.css";
import Link from 'next/link'
import { LabelStructure } from '@components/Labels';
import Card from '@components/Card';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer, workshopsLayer, othersLayer, suppliersLayer, designersLayer } from '@libs/layers';
import dynamic from 'next/dynamic'



export default function Structures({ structures }) {
  // let colors = ["primary", "secondary", "tertiary", "quaternary", "pink-500", "cyan-500"];
  // let typologies = Array.from(new Set(structures.map((el) => (el.typologies)).flat()))

  const [viewport, setViewport] = useState({
    latitude: 48.85658,
    longitude: 2.3518,
    zoom: 10
  });
  const [selection, setSelection] = useState(undefined);
  const close = () => { if (selection) setSelection(undefined); };
  const mapRef = useRef(null);



  const onClick = event => {
    if (event.features.length === 0) return
    const feature = event.features[0];
    if (feature.properties.cluster_id){
      const clusterId = feature.properties.cluster_id;
      const mapboxSource = mapRef.current.getMap().getSource('structures');  
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
        setViewport({
          ...viewport,
          zoom,
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          transitionDuration: 500,
          transitionInterpolator: new FlyToInterpolator(),
        });
      });

    }
    else{
      setViewport({
        ...viewport,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
       });
      setSelection(feature.properties)

    }
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
      interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
      onClick={onClick}
      ref={mapRef}
      clickRadius={5}
    >


      <Source
        id="structures"
        type="geojson"
        data={structures}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={20}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
        <Layer {...workshopsLayer} />
        <Layer {...designersLayer} />
        <Layer {...suppliersLayer} />
        <Layer {...othersLayer} />
      </Source>



      {selection && <Popup
        latitude={Number(selection.latitude)}
        longitude={Number(selection.longitude)}
        closeButton={true}
        closeOnClick={false}
        onClose={() => close()}
        anchor="top" >
        <Card
          title={selection.name}
          // description={selection.description}
          tags={JSON.parse(selection.typologies)}
          image={selection.illustrations ? { src: JSON.parse(selection.illustrations)[0], alt: selection.name } : null}
          link={{ path: `/structures/${selection.id}`, text: "Voir la structure" }}
        >

          <LabelStructure
            name={selection.name}
            adress={selection.adress}
            communities={JSON.parse(selection.communities)}
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

  structures = {
    type : "FeatureCollection",
    features: structures.map((el) => {
      return ({
        type: "Feature",
        properties: el,
        geometry: {
          type: "Point",
          coordinates: [el.longitude, el.latitude, 0]
        }
      })
    })
  }

  return {
    props: { structures },
    revalidate: 1 }
}