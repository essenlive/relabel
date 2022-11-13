import { PrismaClient } from '@prisma/client'
import Airtable from 'airtable'
import fs from 'fs';

// Avoid instantiating too many instances of Prisma in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem
let prisma

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient()
        console.log("Instantiate new PrismaClient");
}
    prisma = global.prisma
}

export default prisma


const base = new Airtable({
    apiKey: process.env.AIRTABLE_APIKEY,
    endpointUrl: "https://proxy.syncinc.so/api.airtable.com",
}).base(process.env.AIRTABLE_BASEID);

export function filter(data, filter) {
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


export function createApi(type, fields) {
    return new Promise((resolve, reject) => {
        base(type).create(fields, { typecast: true }, function (err, records) {
            if (err) { reject(err); }
            resolve(records);
        });
    });
}

export function serialize(data) {
    return JSON.parse(JSON.stringify(data))
}




export async function manageImages(url, name, id) {

    const normalizeName = (name, id) => {
        name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]/g, " ").toLowerCase().replace(/\ /g, "_");
        return `${name}-${id}.png`
    }
    const filename = normalizeName(name, id);
    if (!fs.existsSync(`./public/assets/illustrations/${filename}`)) {
        let res = await fetch(url, {
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_APIKEY}` }
        })

        // To do, check for any file format
        // let extension = "png";
        // if (res.headers.get('content-type').indexOf("webp") >= 0) extension = "webp";
        // if (res.headers.get('content-type').indexOf("jpg") >= 0 ) extension = "jpg";
        res.body.pipe(fs.createWriteStream(`./public/assets/illustrations/${filename}`))
        console.log(`downloading image ${filename}`);
    }
    return `/assets/illustrations/${filename}`
}