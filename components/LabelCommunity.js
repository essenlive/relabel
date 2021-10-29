import classNames from "classnames"
import styles from "@styles/components/LabelCommunity.module.css";
import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic'
const P5Wrapper = dynamic(() => import('react-p5-wrapper'), { ssr: false })


export default function LabelCommunity({ community, bordered }) {

    community.data = {designers: 0,suppliers: 0,workshops: 0,others: 0}
    if (!community.structures) {
        community.data = { designers: 4, suppliers: 6, workshops: 2, others: 4 }
    }else{
        community.structures.forEach(structure => {
            if (structure.typologies.indexOf('autre') >= 0) community.data.others++
            if (structure.typologies.indexOf('designer') >= 0) community.data.designers++
            if (structure.typologies.indexOf('atelier') >= 0) community.data.workshops++
            if (structure.typologies.indexOf('stockage') >= 0) community.data.suppliers++
        });
    }
    
    const [width, setWidth] = useState(400)
    const ref = useRef(null);
    useEffect(() => { setWidth(ref.current ? ref.current.offsetWidth : 30); }, [ref.current]);

    return (
        <div
            ref={ref}
            style={{ fontSize: `${width / 20}px` }}
            className={classNames(styles.label,
                { [`${styles.bordered}`]: bordered })}>

            <div className={styles.sketch}>
                <Sketch data={community.data} />
            </div>
            <h2 className={styles.name}> {community.name && community.name}</h2>
            <h4 className={styles.date}> {community.year && community.year}</h4>

        </div>
    )
}


const Sketch = ({ data }) => {

    function sketch(p5) {

        // Constantes graphiques
        const width = 700;
        const height = width;
        const dim = 100;
        const nbCases = width / dim;
        const ep = 20;

        let dataDesigners, dataWorkshops, dataSuppliers, dataOthers, dataEmpty, dataPartners;

        let [c1, c2, c3, c4] = ["#D3494E", "#FFE5AD", "#13BBAF", "#7BC8F6"]
        let empty = "#e1e1e1";

        let noeuds = [];
        let couleursDispo = [];


        p5.setup = function () {
            p5.createCanvas(width, height);
            p5.strokeCap(p5.ROUND);
            c1 = p5.color(c1);
            c2 = p5.color(c2);
            c3 = p5.color(c3);
            c4 = p5.color(c4);
            empty = p5.color(empty);


            calculateDatas()
            initAvailableColors()
            initNodes(nbCases)
            initPartnerNodes(dataPartners);
        }

        // Setup and calculate datas
        function calculateDatas() {
            // partners = partners <= 0 ? 1 : partners
            // let dataDesigners = structures.designers.length;
            // let dataWorkshops = structures.workshops.length;
            // let dataSuppliers = structures.suppliers.length;
            // let dataOthers = structures.others.length;
            let dataDesigners = data.designers;
            let dataWorkshops = data.workshops;
            let dataSuppliers = data.suppliers;
            let dataOthers = data.others;

            dataPartners = dataDesigners + dataWorkshops + dataSuppliers;
            let ratio = (nbCases - 2) * (nbCases - 2) + (nbCases - 3) * 4;
            // To have exactly the right number of colors in the stack
            dataEmpty = ratio - dataPartners < 0 ? 0 : ratio - dataPartners;
        }
        // Fill couleursDispo colorstack 
        function initAvailableColors() {
            const designers = Array(dataDesigners).fill(c1)
            const workshops = Array(dataWorkshops).fill(c2)
            const suppliers = Array(dataSuppliers).fill(c3)
            couleursDispo = [...designers, ...workshops, ...suppliers];
        }
        // Initialize false node grid
        function initNodes(nbCases) {
            for (let i = 0; i < nbCases; i++)  noeuds[i] = Array(nbCases).fill(false);
        }
        // Create partner nodes in node grid
        function initPartnerNodes(partnerNodes) {
            var compteur = 0;
            while (compteur < partnerNodes) {
                let togglei = p5.floor(p5.random(1, nbCases - 1));
                let togglej = p5.floor(p5.random(1, nbCases - 1));
                if (noeuds[togglei][togglej] == false) {
                    noeuds[togglei][togglej] = true;
                    compteur++;
                }
            }

        }

        // Pick a color from the color stack
        function pickColorFromStack() {
            let toggleColor = p5.floor(p5.random(couleursDispo.length));
            let maCouleur = couleursDispo[toggleColor];
            couleursDispo.splice(toggleColor, 1);
            return maCouleur;
        }

        p5.draw = function () {
            p5.push();
            p5.translate(width / 2, height / 2);
            p5.rotate(p5.PI / 4);

            let maCouleur;
            // Draw center grid
            for (let i = 1; i < nbCases - 1; i++) {
                for (let j = 1; j < nbCases - 1; j++) {

                    // Pick a random color from couleursDispo
                    // If it is a partner use a circle else use a random pattern
                    if (noeuds[i][j] == true) {
                        maCouleur = pickColorFromStack();
                        picto5(dim * i - width / 2, dim * j - height / 2, dim, maCouleur, ep);
                    } else {
                        maCouleur = c4;
                        var toggle = p5.floor(p5.random(3));
                        switch (toggle) {
                            case 0:
                                picto1(dim * i - width / 2, dim * j - height / 2, dim, maCouleur, ep);
                                break;
                            case 1:
                                picto2(dim * i - width / 2, dim * j - height / 2, dim, maCouleur, ep);
                                break;

                            case 2:
                                picto4(dim * i - width / 2, dim * j - height / 2, dim, maCouleur, ep);
                                break;

                            default:
                        }
                    }
                }
            }
            // Draw grid edges
            for (var k = 1; k < nbCases - 2; k++) {
                maCouleur = c4;
                if (typeof (maCouleur) !== "undefined") picto6((nbCases - 1) * dim - width / 2, dim * (k + 0.5) - height / 2, dim, maCouleur, ep);
                maCouleur = c4;
                if (typeof (maCouleur) !== "undefined") picto7(-width / 2, dim * (k + 0.5) - height / 2, dim, maCouleur, ep);
            }

            for (var l = 1; l < nbCases - 2; l++) {
                maCouleur = c4;
                if (typeof (maCouleur) !== "undefined") picto8(dim * l - width / 2, -height / 2, dim, maCouleur, ep);
                maCouleur = c4;
                if (typeof (maCouleur) !== "undefined") picto9(dim * l - width / 2, (nbCases - 1) * dim - height / 2, dim, maCouleur, ep);
            }
            p5.pop();
            p5.noLoop();
        }


        function picto1(posX, posY, dim, couleur = c4, ep) {
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX, posY, dim, dim, 0, p5.PI / 2);
            p5.arc(posX + dim, posY + dim, dim, dim, -p5.PI, -p5.PI / 2);
        }
        function picto2(posX, posY, dim, couleur = c4, ep) {
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX, posY + dim, dim, dim, -p5.PI / 2, 0);
            p5.arc(posX + dim, posY, dim, dim, p5.PI / 2, p5.PI);
        }
        function picto3(posX, posY, dim, couleur = c4, ep) { // point central
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.ellipse(posX + dim / 2, posY + dim / 2, dim / 2, dim / 2);
        }
        function picto4(posX, posY, dim, couleur = c4, ep) {
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.line(posX + dim / 2, posY, posX + dim / 2, posY + dim);
            p5.line(posX, posY + dim / 2, posX + dim, posY + dim / 2);
        }
        function picto5(posX, posY, dim, couleur = c4, ep) {
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.line(posX + dim / 2, posY, posX + dim / 2, posY + dim);
            p5.line(posX, posY + dim / 2, posX + dim, posY + dim / 2);
            p5.fill(255);
            p5.ellipse(posX + dim / 2, posY + dim / 2, dim / 2, dim / 2);
        }
        function picto6(posX, posY, dim, couleur = c4, ep) { // courbe de bord
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX, posY + dim / 2, dim, dim, -p5.PI / 2, p5.PI / 2);
        }
        function picto7(posX, posY, dim, couleur = c4, ep) { // courbe de bord
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX + dim, posY + dim / 2, dim, dim, p5.PI / 2, 3 * p5.PI / 2);
        }
        function picto8(posX, posY, dim, couleur = c4, ep) { // courbe de bord
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX + dim, posY + dim, dim, dim, p5.PI, 2 * p5.PI);
        }
        function picto9(posX, posY, dim, couleur = c4, ep) { // courbe de bord
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX + dim, posY, dim, dim, 0, p5.PI);
        }


    };
    return (<P5Wrapper sketch={sketch} />)
}