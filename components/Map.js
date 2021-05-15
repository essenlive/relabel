import React, { useState } from 'react';
import ReactMapGL, { Source, Layer, Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import { Button, Card, Hr, Image, Text, Badge, Title, useMantineTheme } from '@mantine/core';
import styles from "@styles/components/Map.module.css";
import Link from 'next/link'


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
    const theme = useMantineTheme();
    let colorsKeys = Object.keys(theme.colors).slice(1);
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
            latitude: organisation.latitude,
            longitude: organisation.longitude,
            zoom: viewport.zoom,
            transitionDuration: 500,
            transitionInterpolator: new FlyToInterpolator(),
        });
        setSelection(organisation)
    };

    return( 
        <section className={styles.map}>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOXTOKEN}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/essen/cjtsfp7dc00201fmfl8jllc3k"
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} />
                </Source>
                {data.map((item,i)=>{
                    return(
                        <Marker
                            className={styles.marker}
                            key={i}
                            latitude={item.latitude}
                            longitude={item.longitude}
                            offsetLeft={-6}
                            offsetTop={-6}
                            onClick={()=>{
                                markerClick(item)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 12 12" stroke="none">
                                
                                <circle cx="6" cy="6" r="6"/>
                            </svg>
                        </Marker>
                    )
                })}
                {selection && <Popup                    
                    latitude={selection.latitude}
                    longitude={selection.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => close()}
                    anchor="top" >
                    <Link
                        href={{
                            pathname: '/community/[id]',
                            query: { id: selection.name },
                        }}>
                        <Card
                            style={{ cursor: 'pointer', maxWidth: 300}}
                            shadow="lg"
                            >

                            {selection.illustrations && (<Image
                                src={selection.illustrations[0].thumbnails.large.url}
                                height={200}
                                alt="Photo d'illustration"
                            />)}

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                <Title order={4} weight={500}>{selection.name}</Title>
                                {selection.activity && (<div>{selection.activity.map((item, i) => (
                                <Badge key={i} color={colorsKeys[activities.indexOf(item)]}>{item}</Badge>
                                ))}</div>)}
                            </div>

                            {selection.status && (<Title order={6}>{selection.status}</Title>)}
                            {selection.adress && (<Text size="sm">{selection.adress}</Text>)}

                            {selection.description && (
                            <>
                                <Hr />
                                <Text size="sm">
                                    {selection.description}
                                </Text>
                            </>
                            )}
                            <Link
                                href={{
                                    pathname: '/community/[id]',
                                    query: { id: selection.name },
                                }}>
                                <Button size="sm" variant="light" fullWidth style={{ marginTop: 10 }}>
                                    Voir structure
                                </Button>
                            </Link>

                        </Card>
                    </Link>
                </Popup>}

            </ReactMapGL>
        </section>)
}