import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import styles from "@styles/Map.module.css";


export default function ReactMap({data}){
    const [viewport, setViewport] = useState({
        latitude: 48.85658,
        longitude: 2.3518,
        zoom: 11
    });
    const [showPopup, togglePopup] = React.useState(false);
    const [selection, setSelection] = useState({selection : undefined});


    const close = () => { if (selection) setSelection({ selection: undefined }); };
    // const onToggleHover = (cursor, organisation, {type, map}) => {        
    //     map.getCanvas().style.cursor = cursor; 
    // }

    const markerClick = (organisation) => {
        setSelection({ selection: organisation })
        setViewPort({
            latitude: organisation.latitude,
            longitude: organisation.longitude,
            zoom: 14
        });
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
                    console.log(el);
                    return(
                        <Marker
                            className={styles.marker}
                            key={i}
                            latitude={el.fields.StrucLAT}
                            longitude={el.fields.StrucLONG}
                            offsetLeft={-12}
                            offsetTop={-24}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                        </Marker>
                    )
                })}
                {showPopup && <Popup
                    latitude={48.85658}
                    longitude={2.3518}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => togglePopup(false)}
                    anchor="top" >
                    <div>You are here</div>
                </Popup>}

            </ReactMapGL>
        </section>)
}