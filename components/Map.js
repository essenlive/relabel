import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from "@styles/Map.module.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOXTOKEN;

export default function Map(props){

    useEffect(() => {
        const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/essen/cjtsfp7dc00201fmfl8jllc3k',
        center: [lng, lat],
        zoom: zoom
        });
        // add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        return () => map.remove();  
    }, []);

    const mapContainer = useRef(null);
    const [lng, setLng] = useState(2.35183);
    const [lat, setLat] = useState(48.85658);
    const [zoom, setZoom] = useState(11);

    // const [selection, setSelection] = useState({selection : undefined});


    // const close = () => { if (selection) setSelection({ selection: undefined }); };
    // const onToggleHover = (cursor, organisation, {type, map}) => {        
    //     map.getCanvas().style.cursor = cursor; 
    // }

//     const markerClick = (organisation) => {
//         setSelection({ selection: organisation })
//         setMap({ center: organisation.coordinates, zoom: [14] });
//     };

    return( 
        <section className={styles.map} ref={mapContainer}>
        </section>)
}