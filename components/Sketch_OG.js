import dynamic from 'next/dynamic'

const P5Wrapper = dynamic(
  () => import('react-p5-wrapper'), { ssr: false })


export default function Sketch({ partners, production, materials, gestion }) {
    function sketch(p5) {
        // Constantes graphiques
        const width = 600;
        const height = width;
        const dim = 100;
        const nbCases = width / dim;
        const ep = 20;

        let dataPartner, dataMaterio, dataGestion, dataProd;
        let c1, c2, c3, c4;

        let noeuds = [];
        let couleursDispo = [];


        p5.setup = function () {
            p5.createCanvas(width, height);
            p5.strokeCap(p5.ROUND);
            c1 = p5.color(123, 186, 126),
            c2 = p5.color(42, 90, 125),
            c3 = p5.color(78, 103, 94),
            c4 = p5.color(125);
            
            calculateDatas()
            initAvailableColors()
            initNodes(nbCases)
            initPartnerNodes(dataPartner);
        }

        // Setup and calculate datas
        function calculateDatas() {
            // partners = partners <= 0 ? 1 : partners
            production = production <= 0 ? 0 : production
            production = production >= 1 ? 1 : production
            gestion = gestion <= 0 ? 0 : gestion
            gestion = gestion >= 1 ? 1 : gestion
            materials = materials <= 0 ? 0 : materials
            materials = materials >= 1 ? 1 : materials
            let total = materials * 100 + gestion * 100 + production * 100;
            total = total <= 0 ? 1 : total;
            let ratio = (nbCases - 2) * (nbCases - 2) + (nbCases - 3) * 4 ;
            dataPartner = partners < (nbCases - 2) * (nbCases - 2) ? partners : (nbCases - 2) * (nbCases - 2);
            dataMaterio = p5.floor(ratio * materials * 100 / total);
            dataGestion = p5.floor(ratio * gestion * 100 / total);
            // To have exactly the right number of colors in the stack
            dataProd = ratio - dataMaterio - dataGestion;

        }
        // Fill couleursDispo colorstack 
        function initAvailableColors() {
            const materiaux = Array(dataMaterio).fill(c1)
            const gestion = Array(dataGestion).fill(c2)
            const production = Array(dataProd).fill(c3)
            couleursDispo = [...materiaux, ...gestion, ...production];
        }
        // Initialize false node grid
        function initNodes(nbCases) {
            for (let i = 0; i < nbCases  ; i++)  noeuds[i] = Array(nbCases).fill(false);
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
        // Reset on mousepress
        // p5.mousePressed = function () {
        //     initAvailableColors()
        //     initNodes(nbCases)
        //     initPartnerNodes(dataPartner);
        //     p5.loop();
        // }

        p5.draw = function () {
            // p5.background(255);
            p5.push();
            p5.translate(width / 2, height / 2);
            p5.rotate(p5.PI / 4);

            let maCouleur;
            // Draw center grid
            for (let i = 1; i < nbCases - 1; i++) {
                for (let j = 1; j < nbCases - 1; j++) {
                    
                    // Pick a random color from couleursDispo
                    maCouleur = pickColorFromStack();
                    // If it is a partner use a circle else use a random pattern
                    if (noeuds[i][j] == true) {
                        picto5(dim * i - width / 2, dim * j - height / 2, dim, maCouleur, ep);
                    } else {
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
                maCouleur = pickColorFromStack();
                if (typeof(maCouleur) !== "undefined") picto6((nbCases - 1) * dim - width / 2, dim * (k + 0.5) - height / 2, dim, maCouleur, ep);
                maCouleur = pickColorFromStack();
                if (typeof (maCouleur) !== "undefined") picto7(-width / 2, dim * (k + 0.5) - height / 2, dim, maCouleur, ep);
            }

            for (var l = 1; l < nbCases - 2; l++) {
                maCouleur = pickColorFromStack();
                if (typeof (maCouleur) !== "undefined") picto8(dim * l - width / 2, -height / 2, dim, maCouleur, ep);
                maCouleur = pickColorFromStack();
                if (typeof (maCouleur) !== "undefined") picto9(dim * l - width / 2, (nbCases - 1) * dim - height / 2, dim, maCouleur, ep);
            }
            p5.pop();
            p5.noLoop();
        }


        function picto1(posX, posY, dim, couleur, ep) {
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX, posY, dim, dim, 0, p5.PI / 2);
            p5.arc(posX + dim, posY + dim, dim, dim, -p5.PI, -p5.PI / 2);
        }
        function picto2(posX, posY, dim, couleur, ep) {
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX, posY + dim, dim, dim, -p5.PI / 2, 0);
            p5.arc(posX + dim, posY, dim, dim, p5.PI / 2, p5.PI);
        }
        function picto3(posX, posY, dim, couleur, ep) { // point central 
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.ellipse(posX + dim / 2, posY + dim / 2, dim / 2, dim / 2);
        }
        function picto4(posX, posY, dim, couleur, ep) {
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.line(posX + dim / 2, posY, posX + dim / 2, posY + dim);
            p5.line(posX, posY + dim / 2, posX + dim, posY + dim / 2);
        }
        function picto5(posX, posY, dim, couleur, ep) {
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.line(posX + dim / 2, posY, posX + dim / 2, posY + dim);
            p5.line(posX, posY + dim / 2, posX + dim, posY + dim / 2);
            p5.fill(255);
            p5.ellipse(posX + dim / 2, posY + dim / 2, dim / 2, dim / 2);
        }
        function picto6(posX, posY, dim, couleur, ep) { // courbe de bord
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX, posY + dim / 2, dim, dim, -p5.PI / 2, p5.PI / 2);
        }
        function picto7(posX, posY, dim, couleur, ep) { // courbe de bord
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX + dim, posY + dim / 2, dim, dim, p5.PI / 2, 3 * p5.PI / 2);
        }
        function picto8(posX, posY, dim, couleur, ep) { // courbe de bord
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX + dim, posY + dim, dim, dim, p5.PI, 2 * p5.PI);
        }
        function picto9(posX, posY, dim, couleur, ep) { // courbe de bord
            p5.strokeWeight(ep);
            p5.stroke(couleur);
            p5.noFill();
            p5.arc(posX + dim, posY, dim, dim, 0, p5.PI);
        }


    };
    return (<P5Wrapper sketch={sketch} />)
}