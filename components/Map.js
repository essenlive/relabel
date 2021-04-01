// import React, { useState, useEffect } from 'react';
// import ReactMap, { Layer, Feature, Popup, ZoomControl } from 'react-mapbox-gl';
// import Link from 'next/link'
// import styles from "@styles/Map.module.css";


// const MapBox = ReactMap({ accessToken: process.env.REACT_APP_MAPBOX_TOKEN });

// const Map = (props) => {

//     const [organisations, setOrganisations] = useState([]);
//     const [map, setMap] = useState({
//     fitBounds: undefined,
//     center: [2.35183, 48.85658],
//     zoom: [11],
//     });
//     const [selection, setSelection] = useState({selection : undefined});

//     useEffect(() => {
//         const fetchData = async () => {

//             try {
//                 let organisations = await fetch('/.netlify/functions/getData?organisations=all');
//                 organisations = await organisations.json(); 
//                 setOrganisations(organisations);
//             } catch (error) { console.log(error); }
//         };

//         fetchData();
//     }, []);

//     const close = () => { if (selection) setSelection({ selection: undefined }); };
//     const onToggleHover = (cursor, organisation, {type, map}) => {        
//         map.getCanvas().style.cursor = cursor; 
//     }

//     const markerClick = (organisation) => {
//         setSelection({ selection: organisation })
//         setMap({ center: organisation.coordinates, zoom: [14] });
//     };

//     return(
//         <section>
//             <MapBox
//                 // eslint-disable-next-line
//                 style={'mapbox://styles/essen/cjtsfp7dc00201fmfl8jllc3k'}
//                 // fitBounds= {map.fitbounds}
//                 containerStyle={{ height: '100%', width: '100%' }}
//                 center={map.center}
//                 onDrag={close.bind(this)}
//                 zoom={map.zoom}
//                 flyToOptions={{ speed: 0.8 }}
//             >
//                 <ZoomControl />

//                 <Layer type="circle" id="organisations" >
//                     {organisations.map((item, i) => {
//                         return (
//                             <Feature
//                                 key={i}
//                                 onMouseEnter={onToggleHover.bind(this, 'pointer', item)}
//                                 onMouseLeave={onToggleHover.bind(this, '', 'undefined')}
//                                 onClick={markerClick.bind(this, item)}
//                                 coordinates={item.coordinates}
//                             />
//                         )
//                     })}
//                 </Layer>


//                 {selection.selection && (
//                     <Popup coordinates={selection.selection.coordinates} maxWidth={"300px"} >
//                         <div>
//                             <div className='Section  Section--Simple'>
//                                     <h3 className='Section__Title'>{selection.selection.name}</h3>
//                                     <div className='Section__Subtitle'>{selection.selection.type}</div>
//                             </div>
//                             <div className="Close__Button"  onClick={close}> </div>
//                         </div>
//                     </Popup>
//                 )}

//             </MapBox>
//         </section>)
// }

// export default Map