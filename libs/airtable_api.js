import AirtablePlus from 'airtable-plus';
import mappings from '@libs/mappings'
import prisma from '@libs/prisma.js'
let {tablesMapping, columnsMapping} = mappings;


const airtable_api = {
    validateData: function (data) {
        return JSON.parse(JSON.stringify(data))
    },
    filterData: function (data, filter = false) {
        if (!filter) return data;
        data = data.filter((el, i) => {
            if (typeof Object.values(filter)[0] === 'boolean') {
                if (!!el[Object.keys(filter)[0]] === false) { return false }
                else if (el[Object.keys(filter)[0]] == false) { return false }
                else { return true }
            }
            else {
                return (el[Object.keys(filter)[0]] === Object.values(filter)[0])
            }
        })
        return data
    },
    getProjects : async function(filter){
        console.log('getProjects');
        let data = await prisma.project.findMany();
        data = airtable_api.filterData(data, filter);
        return airtable_api.validateData(data)
    },
    getStructures: async function (filter) {
        console.log('getStructures');
        let data = await prisma.structure.findMany();
        data = airtable_api.filterData(data, filter);
        return airtable_api.validateData(data)
    },
    getDatas: async function (filter) {
        console.log('getDatas');
        let data = await prisma.data.findMany();
        data = airtable_api.filterData(data, filter);
        return airtable_api.validateData(data)
    },
    getCommunities: async function (filter) {
        console.log('getCommunities');
        let data = await prisma.communities.findMany();
        data = airtable_api.filterData(data, filter);
        return airtable_api.validateData(data)
    }

}

export default airtable_api