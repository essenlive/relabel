import dynamic from 'next/dynamic'
const P5Wrapper = dynamic(
  () => import('react-p5-wrapper'), { ssr: false })


export default function Sketch({data}) {
    const sketch = (p5) => {

        let PARTNERS = [], IDStructure = [], PROD = [], MATERIO = [], GESTION = [];
        let nbStruct;
        let modules = [];
        let width = 500;
        let height = 500;
        let tileSize = 50;
        let gridResolutionX = p5.round(width / tileSize) + 2;
        let gridResolutionY = p5.round(height / tileSize) + 2;
        let tiles = [];
        let tilesBase = [];

        p5.setup = function () {
            let canva = p5.createCanvas(width, height);
            initTiles();
            prepareData(data);
            canva.mouseClicked(toggleTileMouse);
        }

        p5.preload = function () {

            // load svg modules
            modules[0] = p5.loadImage("/data/00.svg");
            modules[1] = p5.loadImage("/data/01.svg");
            modules[2] = p5.loadImage("/data/02.svg");
            modules[3] = p5.loadImage("/data/03.svg");
            modules[4] = p5.loadImage("/data/04.svg");
            modules[5] = p5.loadImage("/data/05.svg");
            modules[6] = p5.loadImage("/data/06.svg");
            modules[7] = p5.loadImage("/data/07.svg");
            modules[8] = p5.loadImage("/data/08.svg");
            modules[9] = p5.loadImage("/data/09.svg");
            modules[10] = p5.loadImage("/data/10.svg");
            modules[11] = p5.loadImage("/data/11.svg");
            modules[12] = p5.loadImage("/data/12.svg");
            modules[13] = p5.loadImage("/data/13.svg");
            modules[14] = p5.loadImage("/data/14.svg");
            modules[15] = p5.loadImage("/data/15.svg");

        }

        p5.draw = function () {
            p5.background(220);
            drawGrid()
            drawModules();
        }


        function prepareData(data) {
            nbStruct = data.length;

            for (var i = 0; i < nbStruct; i++) {
                PARTNERS.push(data[i].fields.StrucPARTENAIRES);
                IDStructure.push(data[i].fields.StrucID);
                PROD.push(data[i].fields.StrucPROD);
                MATERIO.push(data[i].fields.StrucMATERIAUX);
                GESTION.push(data[i].fields.StrucGESTION);
            }

            // INIT DES POINTS D'ANCRAGE PARTNERS
            if (PARTNERS[0] > 0) {
                for (let k = 0; k < PARTNERS[0]; k++) {
                    var m = p5.int(p5.map(k, 0, PARTNERS[0], gridResolutionX / 4, 3 * gridResolutionX / 4));
                    var l = 1 + p5.int(gridResolutionY / 2 + (p5.map(p5.random(GESTION[0] * 1000), 0, 100, (-1) * gridResolutionY / 3, gridResolutionY / 3)));

                    p5.print(m, " ", l);
                    setTile(m, l);
                    setTile(m + 1, l);
                    setTile(m, l + 1);
                    setTile(m + 1, l + 1);
                }
            }

            // LIENS ENTRE LES NOEUDS DE DEPART SELON PROD
            for (let gridY = 1; gridY < gridResolutionY - 1; gridY++) {
                for (let gridX = 1; gridX < gridResolutionX - 1; gridX++) {
                    // use only active tiles
                    if (tilesBase[gridX][gridY] == '1') {

                        for (let n = 0; n < PROD[0] * 5; n++) {
                            var toggle = p5.int(p5.random(0, 4));
                            if (toggle == 0) {
                                if (gridX + n < gridResolutionX) setTile(gridX + n, gridY);
                            } else if (toggle == 1) {
                                if (gridY + n < gridResolutionY) setTile(gridX, gridY + n);
                            } else if (toggle == 2) {
                                if (gridY - n > gridResolutionY) setTile(gridX, gridY - n);
                            } else if (toggle == 3) {
                                if (gridX - n > 1) setTile(gridX - n, gridY);
                            }
                        }

                        /// echappees selon materiaux
                        for (let p = 0; p < MATERIO[0] * 10; p++) {
                            var toggle2 = p5.int(p5.random(0, 2));
                            p5.print(toggle2, p);
                            if (toggle2 == 0) {
                                setTile(gridX, gridY + p);
                            } else {
                                setTile(gridX, gridY - p);
                            }
                        }
                    }
                }



            }
        }

        function drawModules() {
            p5.imageMode(p5.CENTER);
            for (let gridY = 1; gridY < gridResolutionY - 1; gridY++) {
                for (let gridX = 1; gridX < gridResolutionX - 1; gridX++) {
                    // use only active tiles
                    if (tiles[gridX][gridY] == '1') {
                        // check the four neighbours, each can be 0 or 1
                        var east = p5.int(tiles[gridX + 1][gridY]);
                        var south = p5.int(tiles[gridX][gridY + 1]);
                        var west = p5.int(tiles[gridX - 1][gridY]);
                        var north = p5.int(tiles[gridX][gridY - 1]);
                        // create a binary result out of it, eg. 1011
                        var decimalResult = 1 * east + 2 * south + 4 * west + 8 * north;
                        var posX = tileSize * gridX - tileSize / 2;
                        var posY = tileSize * gridY - tileSize / 2;
                        // decimalResult is the also the index for the shape array
                        // p5.print(decimalResult);
                        p5.image(modules[decimalResult], posX, posY, tileSize, tileSize);


                    }
                }
            }
        }

        function initTiles() {
            for (let gridX = 0; gridX < gridResolutionX; gridX++) {
                tiles[gridX] = [];
                tilesBase[gridX] = [];
                for (let gridY = 0; gridY < gridResolutionY; gridY++) {
                    tiles[gridX][gridY] = '0';
                    tilesBase[gridX][gridY] = '0';
                }
            }
        }

        function drawGrid() {
            p5.rectMode(p5.CENTER);
            for (let gridY = 0; gridY < gridResolutionY; gridY++) {
                for (let gridX = 0; gridX < gridResolutionX; gridX++) {
                    var posX = tileSize * gridX - tileSize / 2;
                    var posY = tileSize * gridY - tileSize / 2;
                    p5.strokeWeight(0.15);
                    p5.fill(255);
                    p5.rect(posX, posY, tileSize, tileSize);
                }
            }
        }

        // CONVERT MOUSE POSITION TO GRID COORDINATES
        function setTile(index, indey) {
            tiles[index][indey] = '1';
            tilesBase[index][indey] = '1';
        }

        function toggleTileMouse() {
            let [gridX, gridY] = getTilesCoordinates(p5.mouseX, p5.mouseY)
            tiles[gridX][gridY] = `${(p5.int(tiles[gridX][gridY]) + 1) % 2}`
        }
        // CONVERT MOUSE POSITION TO GRID COORDINATES
        function getTilesCoordinates(mouseX, mouseY) {
            let gridX = p5.floor(p5.float(mouseX) / tileSize) + 1;
            gridX = p5.constrain(gridX, 1, gridResolutionX - 2);
            let gridY = p5.floor(p5.float(mouseY) / tileSize) + 1;
            gridY = p5.constrain(gridY, 1, gridResolutionY - 2);
            return [gridX, gridY]
        }

    };
    return (<P5Wrapper sketch={sketch} />)
}