import Airtable from 'airtable'

const base = new Airtable({
    apiKey: process.env.AIRTABLE_APIKEY,
    endpointUrl: "https://proxy.syncinc.so/api.airtable.com",
}).base(process.env.AIRTABLE_BASEID);

export function filter(data, filter){
    if (!Object.keys(filter).length) return data;

    let singleFilter = Object.entries(filter)[0]
    let filteredData = data.filter(el => {
        if (
            typeof singleFilter[1] === 'boolean'
            || singleFilter[1] === 'true'
            || singleFilter[1] === 'false'
        ) {
            if (!!el[singleFilter[0]] === false) { return false }
            else if (el[singleFilter[0]] == false) { return false }
            else { return true }
        }
        else {
            return (el[singleFilter[0]] === singleFilter[1])
        }
    })
    
    return filteredData
}


export function createApi (type, fields) {
    return new Promise((resolve, reject) => {
        base(type).create(fields, { typecast: true }, function (err, records) {
            if (err) { reject(err); }
            resolve(records);
        });
    });
}
