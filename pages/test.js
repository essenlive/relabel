import {useRef, useState, useEffect, useCallback } from "react";
import ReactToPrint from "react-to-print";

import Certificate from "@components/Certificate";

export default function Test() {
    const project = {
        "id": "reckWgt4MFpbxNqsK",
        "created_time": "2021-10-19T09:34:00.000Z",
        "name": "Mimo",
        "typology": "objet",
        "description": "Mimo est un demi-vase, il est conçu pour servir d’extension à un bocal alimentaire et le transformer en vase. Il permet un meilleur maintien des fleurs et aide à la composition des bouquets. \nFabriqué dans notre atelier à Paris en impression 3D à partir de plastique 100% recyclé et recyclable (rPETG).",
        "illustrations": [
    "https://dl.airtable.com/.attachments/feeafaed2c511c3723213e927f541d0b/628bf01e/DSC_2006-C-2048x2048.jpg",
        "https://dl.airtable.com/.attachments/9d8237f2c1a084fc21d157c4977b8dd7/cfca4713/DSC_2026-C-2048x2048.jpg",
        "https://dl.airtable.com/.attachments/367b461a8eb22c0cd0acd0df805771c4/5fb8d62e/warren-laetitia-design-objets-impression-3D-printing-vases-mimo-fleurs-bouquet-flowers-bocal-bocaux-jars-recycle-reuse-vert-green-emeraude-4-2048x2048.jpg"
  ],
    "team": [
        "Warren",
        "Laetitia"
    ],
        "designers": [
            "recm7gdpNqeVTm34Z"
        ],
            "workshops": [
                "recm7gdpNqeVTm34Z"
            ],
                "suppliers": [],
                    "others": [],
                        "website": "https://warrenetlaetitia.fr/demi-vase-mimo-fleurs-designers-recycle-recyclable/",
                            "contact": "warrenetlaetitia@gmail.com",
                                "date": "2020-09-15T00:00:00.000Z",
                                    "duration": "90",
                                        "colors": [
                                            "#e6c773",
                                            "#5c559a",
                                            "#7a458a",
                                            "#dee673"
                                        ],
                                            "fab_expertise": "aucune",
                                                "fab_local": "commune",
                                                    "fab_social": "artisanat",
                                                        "fab_tools": "machines cnc",
                                                            "material_origin": "pays",
                                                                "material_leftovers": "chutes minimes",
                                                                    "material_source": "fournisseur responsable",
                                                                        "material_quality": "certifie",
                                                                            "design_durability": [
                                                                                "stockable"
                                                                            ],
                                                                                "design_reparable": "expert",
                                                                                    "design_replicability": "produit replicable",
                                                                                        "design_sharable": "proprietaire",
                                                                                            "rgpd": false,
                                                                                                "structures": [
                                                                                                    {
                                                                                                        "id": "recm7gdpNqeVTm34Z",
                                                                                                        "created_time": "2021-10-19T09:26:20.000Z",
                                                                                                        "name": "Warren & Laetitia",
                                                                                                        "description": "Nous sommes un studio de design, nous concevons des objets du quotidien sur lesquels nous proposons de poser un regard différent à travers trois principes qui guident notre travail : la modularité, la possibilité de réglage ou d’ajustement, et l’appropriation. Nous travaillons principalement avec nos imprimantes 3D, elles nous permettent de faire des tests et des recherches avec différents matériaux. C’est aussi un moyen d’expérimenter des formes, le principal intérêt pour nous étant d’utiliser l’impression 3D comme un moyen de production et donc de créer des formes qui y soient liées. C’est-à-dire, créer des formes optimisées pour la production en impression 3D. ",
                                                                                                        "illustrations": [
                                                                                                            "https://dl.airtable.com/.attachments/ef6ee6c8ebcc591a4e5c0a286491868b/7b1a1009/DSC_0857-C.jpg"
                                                                                                        ],
                                                                                                        "status": "entreprise",
                                                                                                        "typologies": [
                                                                                                            "designer",
                                                                                                            "atelier"
                                                                                                        ],
                                                                                                        "adress": "10 villa Gagliardini 75020 PARIS",
                                                                                                        "longitude": "2.403768",
                                                                                                        "latitude": "48.875515",
                                                                                                        "website": "https://warrenetlaetitia.fr",
                                                                                                        "partners": [],
                                                                                                        "communities": [
                                                                                                            {
                                                                                                                "id": "recRFSCBLU5pF593f",
                                                                                                                "created_time": "2021-05-17T13:31:57.000Z",
                                                                                                                "name": "Fab City Store",
                                                                                                                "year": "2018",
                                                                                                                "description": "Le Fab City Store soutient les designers, artisans et makers qui construisent la ville de demain; écologique, ouverte et sociale.",
                                                                                                                "cities": [
                                                                                                                    "montreuil",
                                                                                                                    "saint-denis",
                                                                                                                    "aubervilliers",
                                                                                                                    "bagnolet",
                                                                                                                    "pantin"
                                                                                                                ],
                                                                                                                "website": "https://store.fabcity.paris/",
                                                                                                                "structures": [
                                                                                                                    "rectsdTHjlto3CZuP",
                                                                                                                    "recRYJTIOK0F8aOyq",
                                                                                                                    "recdtXaQ6yXeSZQEM",
                                                                                                                    "recyaWIHCV1NqQvsN",
                                                                                                                    "recGN3KhegJi2R52Y",
                                                                                                                    "rec42q9keUSInuEiq",
                                                                                                                    "recIFYtfmlR2wHEf8",
                                                                                                                    "reck4k75MN8XwDP8O",
                                                                                                                    "rechD3KxPxF9cOGJb",
                                                                                                                    "recS10Cu5zGdGXrrb",
                                                                                                                    "recxttFpCVSx0gnbb",
                                                                                                                    "recLA6ekPDzkYCMkT",
                                                                                                                    "recm7gdpNqeVTm34Z",
                                                                                                                    "recLAXYBSyuuW2K7Z",
                                                                                                                    "recJM9FPAsC0SuDWI",
                                                                                                                    "recN5j97KkTtk5o19"
                                                                                                                ],
                                                                                                                "status": true,
                                                                                                                "rgpd": false,
                                                                                                                "colors": [
                                                                                                                    "#e68273",
                                                                                                                    "#54a872",
                                                                                                                    "#5877b1",
                                                                                                                    "#e6b473"
                                                                                                                ],
                                                                                                                "contact": "store@fabcity.paris"
                                                                                                            }
                                                                                                        ],
                                                                                                        "contact": "warrenetlaetitia@gmail.com",
                                                                                                        "projects_designer": [
                                                                                                            "reckWgt4MFpbxNqsK"
                                                                                                        ],
                                                                                                        "projects_workshop": [
                                                                                                            "reckWgt4MFpbxNqsK"
                                                                                                        ],
                                                                                                        "projects_supplier": [],
                                                                                                        "projects_other": [],
                                                                                                        "colors": [
                                                                                                            "#e6c773",
                                                                                                            "#5c559a",
                                                                                                            "#7a458a",
                                                                                                            "#dee673"
                                                                                                        ],
                                                                                                        "rgpd": false
                                                                                                    }
                                                                                                ],
                                                                                                    "mapData": {
        "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "typologies": [
                            "designer",
                            "atelier"
                        ],
                        "structures": [
                            {
                                "id": "recm7gdpNqeVTm34Z",
                                "created_time": "2021-10-19T09:26:20.000Z",
                                "name": "Warren & Laetitia",
                                "description": "Nous sommes un studio de design, nous concevons des objets du quotidien sur lesquels nous proposons de poser un regard différent à travers trois principes qui guident notre travail : la modularité, la possibilité de réglage ou d’ajustement, et l’appropriation. Nous travaillons principalement avec nos imprimantes 3D, elles nous permettent de faire des tests et des recherches avec différents matériaux. C’est aussi un moyen d’expérimenter des formes, le principal intérêt pour nous étant d’utiliser l’impression 3D comme un moyen de production et donc de créer des formes qui y soient liées. C’est-à-dire, créer des formes optimisées pour la production en impression 3D. ",
                                "illustrations": [
                                    "https://dl.airtable.com/.attachments/ef6ee6c8ebcc591a4e5c0a286491868b/7b1a1009/DSC_0857-C.jpg"
                                ],
                                "status": "entreprise",
                                "typologies": [
                                    "designer",
                                    "atelier"
                                ],
                                "adress": "10 villa Gagliardini 75020 PARIS",
                                "longitude": "2.403768",
                                "latitude": "48.875515",
                                "website": "https://warrenetlaetitia.fr",
                                "partners": [],
                                "communities": [
                                    {
                                        "id": "recRFSCBLU5pF593f",
                                        "created_time": "2021-05-17T13:31:57.000Z",
                                        "name": "Fab City Store",
                                        "year": "2018",
                                        "description": "Le Fab City Store soutient les designers, artisans et makers qui construisent la ville de demain; écologique, ouverte et sociale.",
                                        "cities": [
                                            "montreuil",
                                            "saint-denis",
                                            "aubervilliers",
                                            "bagnolet",
                                            "pantin"
                                        ],
                                        "website": "https://store.fabcity.paris/",
                                        "structures": [
                                            "rectsdTHjlto3CZuP",
                                            "recRYJTIOK0F8aOyq",
                                            "recdtXaQ6yXeSZQEM",
                                            "recyaWIHCV1NqQvsN",
                                            "recGN3KhegJi2R52Y",
                                            "rec42q9keUSInuEiq",
                                            "recIFYtfmlR2wHEf8",
                                            "reck4k75MN8XwDP8O",
                                            "rechD3KxPxF9cOGJb",
                                            "recS10Cu5zGdGXrrb",
                                            "recxttFpCVSx0gnbb",
                                            "recLA6ekPDzkYCMkT",
                                            "recm7gdpNqeVTm34Z",
                                            "recLAXYBSyuuW2K7Z",
                                            "recJM9FPAsC0SuDWI",
                                            "recN5j97KkTtk5o19"
                                        ],
                                        "status": true,
                                        "rgpd": false,
                                        "colors": [
                                            "#e68273",
                                            "#54a872",
                                            "#5877b1",
                                            "#e6b473"
                                        ],
                                        "contact": "store@fabcity.paris"
                                    }
                                ],
                                "contact": "warrenetlaetitia@gmail.com",
                                "projects_designer": [
                                    "reckWgt4MFpbxNqsK"
                                ],
                                "projects_workshop": [
                                    "reckWgt4MFpbxNqsK"
                                ],
                                "projects_supplier": [],
                                "projects_other": [],
                                "colors": [
                                    "#e6c773",
                                    "#5c559a",
                                    "#7a458a",
                                    "#dee673"
                                ],
                                "rgpd": false
                            }
                        ]
                    },
                    "id": "lo-2.403768la-48.875515",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            "2.403768",
                            "48.875515",
                            0
                        ]
                    }
                }
            ]
    },
    "data": {
        "partners": 2,
            "materials": 0.58,
                "gestion": 0.38333333333333336,
                    "production": 0.4
    }
}
    const componentRef = useRef(null);
    const onBeforeGetContentResolve = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleAfterPrint = useCallback(() => { console.log("`onAfterPrint` called");}, []);
    const handleBeforePrint = useCallback(() => { console.log("`onBeforePrint` called"); }, []);
    const handleOnBeforeGetContent = useCallback(() => {
        console.log("`onBeforeGetContent` called");
        setLoading(true);
        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve;
            setTimeout(() => {
                setLoading(false);
                resolve();
            }, 500);
        });
    }, [setLoading]);

    useEffect(() => {
        if ( typeof onBeforeGetContentResolve.current === "function" ) { onBeforeGetContentResolve.current();}
    }, [onBeforeGetContentResolve.current]);

    const reactToPrintContent = useCallback(() => { return componentRef.current; }, [componentRef.current]);
    const reactToPrintTrigger = useCallback(() => {
        return (<button className="button" style={{ "position": "fixed", "margin": "1rem" }}> Print </button> ); // eslint-disable-line max-len
    }, []);

    return (
        <div>
            <ReactToPrint
                content={reactToPrintContent}
                documentTitle="relabel"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
            />
            {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
            <Certificate
             ref={componentRef} 
             project={project} />
        </div>
    );
};
