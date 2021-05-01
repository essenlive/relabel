import AirtablePlus from 'airtable-plus';
import mappings from './mappings'
let {tablesMapping, columnsMapping} = mappings;

const airtable = new AirtablePlus({
baseID: process.env.AIRTABLE_BASEID,
apiKey: process.env.AIRTABLE_APIKEY
});

const airtable_api = {
    data : {},
    initData : async function(table){
        console.log(`airtable request : "${table}"`);
        const rawData = await airtable.read(null, {
            tableName: tablesMapping.get(table)
        });
        const data = [];
        rawData.forEach((el, i) => {
            data[i] = { id: el.id}
            for (let key of columnsMapping[table].keys()) {
                data[i][key] = typeof (el.fields[columnsMapping[table].get(key)]) !== 'undefined' ? el.fields[columnsMapping[table].get(key)] : null;
            }
        });
        airtable_api.data[table] = data;
    },
    getProjects : async function(filter){
        console.log('getProjects');
        if (!airtable_api.data['projects']) await airtable_api.initData('projects');
        let data = airtable_api.data['projects'];
        if (!filter) return data;
        data = data.filter((el, i) => {
            if ( typeof Object.values(filter)[0] === 'boolean') {
                return (el[Object.keys(filter)[0]] === null !== Object.values(filter)[0])
            }
            else{
                return (el[Object.keys(filter)[0]] === Object.values(filter)[0] )
            }
        })
        return data
    },
    getStructures: async function (filter) {
        console.log('getStructures');
        if (!airtable_api.data['structures']) await airtable_api.initData('structures');
        let data = airtable_api.data['structures'];
        if (!filter) return data;
        data = data.filter((el, i) => {
            if (typeof Object.values(filter)[0] === 'boolean') {
                return (el[Object.keys(filter)[0]] === null !== Object.values(filter)[0])
            }
            else {
                return (el[Object.keys(filter)[0]] === Object.values(filter)[0])
            }
        })
        return data
    },
    getDatas: async function (filter) {
        console.log('getDatas');
        if (!airtable_api.data['structuresDatas']) await airtable_api.initData('structuresDatas');
        let datas = airtable_api.data['structuresDatas'];
        if (!filter) return datas;
        datas = datas.filter((el) => {
            // console.log(el.id, "---", Object.values(filter)[0], "----->", el[Object.keys(filter)[0]] == Object.values(filter)[0]);
            if (typeof Object.values(filter)[0] === 'boolean') {
                return (el[Object.keys(filter)[0]] === null !== Object.values(filter)[0])
            }
            else {
                return (el[Object.keys(filter)[0]] == Object.values(filter)[0])
            }
        })
        return datas
    }
}

export default airtable_api