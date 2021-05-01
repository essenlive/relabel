const mappings = {
    tablesMapping: new Map([
        ['structures', "Structures"],
        ['structuresDatas', "Datas"],
        ['projects', "Projects"]
    ]),
    columnsMapping: {
        'structures': new Map([
            ['name', "Name"],
            ['illustrations', "Illustrations"],
            ['description', "Description"],
            ['adress', "Adress"],
            ['projects', "Projects"],
            ['latitude', "Latitude"],
            ['longitude', "Longitude"],
            ['ess', "ESS"],
            ['status', "Status"],
            ['datas', "Datas"],
            ['datasPartners', "DatasPartners"],
            ['projects', "projects"],
            ['projectsPartners', "ProjectsPartners"],
            ['activity', "Activity"],
        ]),
        'structuresDatas': new Map([
            ["structure", "Structure"],
            ["dataId", "DataID"],
            ['date', "Year"],
            ["partners", "Partners"],
            ["production", "Production"],
            ["gestion", "Gestion"],
            ["materials", "Materials"],
            ["partnersCount", "PartnersCount"]
        ]),
        'projects': new Map([
            ["name", "Name"],
            ["illustrations", "Illustrations"],
            ["typology", "Typology"],
            ["description", "Description"],
            ["team", "Team"],
            ["adress", "Adress"],
            ["structure", "Structure"],
            ["partners", "Partners"],
            ["production", "Production"],
            ["gestion", "Gestion"],
            ["materials", "Materials"],
            ["partnersCount", "PartnersCount"],
            ["duration", "Duration"]
        ])
    }
}

export default mappings