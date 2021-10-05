import React, { useState } from 'react';
import ReactMapGL, { Source, Layer, Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import styles from "@styles/components/Map.module.css";
import Link from 'next/link'
import { LabelStructure } from './Labels';
import Card from './Card';


// const geojson = {
//     type: 'FeatureCollection',
//     features: [
//         { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } },
//         { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 40.8] } },
//         { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 41] } },
//         { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 41] } }
//     ]
// };

// const layerStyle = {
//     id: 'point',
//     type: 'circle',
//     paint: {
//         'circle-radius': 10,
//         'circle-color': '#007cbf'
//     }
// };
export default function ReactMap({ data }) {
    let colors = ["primary", "secondary", "tertiary", "quaternary", "pink-500", "cyan-500" ];
    let activities = Array.from(new Set(data.map((el) => (el.activity)).flat()))

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

    return( 
        <>
            <div className={styles.add}>
                <Link
                    href={{
                        pathname: '/structures/add',
                    }}>
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
                {/* <Source id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} />
                </Source> */}
                {data.map((item,i)=>{
                    return(
                        <Marker
                            className={styles.marker}
                            key={i}
                            latitude={Number(item.latitude)}
                            longitude={Number(item.longitude)}
                            offsetLeft={-6}
                            offsetTop={-6}
                            onClick={()=>{
                                markerClick(item)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={`var(--${ colors[activities.indexOf(item.activity[0])]})`} viewBox="0 0 12 12" stroke="none">
                                
                                <circle cx="6" cy="6" r="6"/>
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
                            link={{ path: `/structures/${selection.id}`,text:"Voir la structure"}}
                        >

                            <LabelStructure
                                name={selection.name}
                                adress={selection.adress}
                                communities={selection.community}
                            />
                        </Card>

                </Popup>}

            </ReactMapGL>
        </>)
}