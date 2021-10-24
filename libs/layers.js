export const clusterLayer = {
    id: 'clusters',
    type: 'circle',
    source: 'structures',
    filter: ['has', 'point_count'],
    paint: {
        'circle-color': "#e2e8f0",
        'circle-radius': 20,
    }
};

export const clusterCountLayer = {
    id: 'cluster-count',
    type: 'symbol',
    source: 'structures',
    filter: ['has', 'point_count'],
    layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
    }
};

export const unclusteredPointLayer = {
    id: 'unclustered-point',
    type: 'circle',
    source: 'structures',
    filter: ['!', ['has', 'point_count']],
    paint: {
        'circle-color': '#000000',
        'circle-radius': 2,
    }
};
export const othersLayer = {
    id: 'others-point',
    type: 'circle',
    source: 'structures',
    filter: ["in", "autre", ["get", "typologies"]],
    paint: {
        'circle-color': '#d946ef',
        'circle-radius': 4,
        // 'circle-stroke-width': 1,
        // 'circle-stroke-color': '#fff',
        'circle-translate': [-5, -5]

    }
};
export const designersLayer = {
    id: 'designers-point',
    type: 'circle',
    source: 'structures',
    filter: ["in", "designer", ["get", "typologies"]],
    paint: {
        'circle-color': '#0ea5e9',
        'circle-radius': 4,
        // 'circle-stroke-width': 1,
        // 'circle-stroke-color': '#fff',
        'circle-translate': [5, -5]

    }
};
export const suppliersLayer = {
    id: 'suppliers-point',
    type: 'circle',
    source: 'structures',
    filter: ["in", "stockage", ["get", "typologies"]],
    paint: {
        'circle-color': '#4ade80',
        'circle-radius': 4,
        // 'circle-stroke-width': 1,
        // 'circle-stroke-color': '#fff',
        'circle-translate': [5, 5]

    }
};
export const workshopsLayer = {
    id: 'workshops-point',
    type: 'circle',
    source: 'structures',
    filter: ["in", "atelier", ["get", "typologies"]],
    paint: {
        'circle-color': '#fb7185',
        'circle-radius': 4,
        // 'circle-stroke-width': 1,
        // 'circle-stroke-color': '#fff',
        'circle-translate': [-5, 5]

    }
};