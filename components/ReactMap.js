import React, { useState } from 'react';
import Link from 'next/link'
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import styles from "@styles/Map.module.css";


export default function ReactMap({data}){

    const [viewport, setViewport] = useState({
        latitude: 48.85658,
        longitude: 2.3518,
        zoom: 11
    });
    const [selection, setSelection] = useState(undefined);


    const close = () => { if (selection) setSelection(undefined); };

    const markerClick = (organisation) => {
        setViewport({
            latitude: organisation.latitude,
            longitude: organisation.longitude,
            zoom: viewport.zoom + 1
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
                {data.map((el,i)=>{
                    let organisation = {
                        longitude: el.fields.Longitude,
                        latitude: el.fields.Latitude,
                        name: el.fields.StrucID,
                        adress: el.fields.Adress,
                        status: el.fields.Status,
                        activity: el.fields.Activity,
                    }
                    return(
                        <Marker
                            className={styles.marker}
                            key={i}
                            latitude={organisation.latitude}
                            longitude={organisation.longitude}
                            offsetLeft={-6}
                            offsetTop={-6}
                            onClick={()=>{
                                markerClick(organisation)
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
                    <div className={styles.popup}>
                        <h3>{selection.name}</h3>
                        <p>{selection.activity}</p>
                        <p>{selection.status}</p>
                        <p>{selection.adress}</p>
                        <Link
                            href={{
                                pathname: '/community/[id]',
                                query: { id: selection.name },
                            }}
                        >
                            <a>Voir label</a>
                        </Link>
                    </div>
                </Popup>}

            </ReactMapGL>
        </section>)
}