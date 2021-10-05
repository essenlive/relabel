import Sketch from '@components/Sketch'
import classNames from "classnames"
import styles from "@styles/components/Labels.module.css";
import { useEffect, useState, useRef } from "react";

export function LabelProduction({ data, name, date, structure, colors, bordered }) {
    const [width, setWidth] = useState(400)
    const ref = useRef(null);

    useEffect(() => {
        setWidth(ref.current ? ref.current.offsetWidth : 30);
        }, [ref.current]);

    return (
        <div
        ref={ref}
        style={{ fontSize: `${width / 20}px` }}
        className={classNames(styles.labelP,
            { [`${styles.bordered}`]: bordered })}>
            <div className={styles.labelP__label}>
                {data && 
               <Sketch
                    partners={data.partners}
                    materials={data.materials}
                    gestion={data.gestion}
                    production={data.production}
                    colors={colors}
                    />}
            </div>


                <h2 className={styles.labelP__name}>
                {name && name }
                </h2>
            {date &&
                <div className={styles.labelP__date}>
                        <p>{date.day}</p>
                        <p>{date.month}</p>
                </div>
            }
            <div className={styles.labelP__designer}>
                { structure && structure.map((el, i) => {
                    return(
                    <p key={i}>{el}</p>
                )})}
            </div>
        </div>
    )
}


export function LabelCommunity({ data, name, year, colors, bordered }) {
    const [width, setWidth] = useState(400)
    const ref = useRef(null);

    useEffect(() => {
        setWidth(ref.current ? ref.current.offsetWidth : 30);
    }, [ref.current]);

    return (
        <div
            ref={ref}
            style={{ fontSize: `${width / 20}px` }}
            className={classNames(styles.labelC,
                { [`${styles.bordered}`]: bordered })}>
            <div className={styles.labelC__label}>
                {data &&
                    <Sketch
                        partners={data.partners}
                        materials={data.materials}
                        gestion={data.gestion}
                        production={data.production}
                        colors={colors}
                    />}
            </div>

            {name &&
                <h2 className={styles.labelC__name}> {name}</h2>
            }
            {year &&
                <h4 className={styles.labelC__date}> {year}</h4>
            }

        </div>
    )
}


export function LabelStructure({ name, adress, communities, bordered }) {
    const [width, setWidth] = useState(400)
    const ref = useRef(null);

    useEffect(async() => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWidth(ref.current ? ref.current.offsetWidth : 30);
    }, [ref.current]);

    return (
        <div
            ref={ref}
            style={{ fontSize: `${width / 20}px` }}
            className={classNames(styles.labelS,
                { [`${styles.bordered}`]: bordered })}>
                <img
                    className={styles.labelS__image}
                    src="/assets/label-comm-placeholder.png"
                    height={200}
                    alt="Photo d'illustration"
                />
                {name && (<h2 className={styles.labelS__name}>{name}</h2>)}
                {adress && (<div className={styles.labelS__adress}>{adress}</div>)}
                {communities && (<div className={styles.labelS__communities}>{communities.map((community, i) => (
                    <h3 key={i}>{community}</h3>
                ))}</div>)}

        </div>
    )
}