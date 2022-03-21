//import { console } from 'console';
import { client } from '../database/db.js';
import * as l from '../logs/logger.js';

//const databaseUrl = Deno.env.get("DATABASE_URL");
debugger;

var log = [];

//Equipment start
const getSelRecord = async (id) =>{
    let ret = "";
    console.log("getSelRecord");
    await client.connect();
    const rec = await client.queryArray(
        "SELECT * FROM \"Equipment\" WHERE \"equipmentid\" = ($1)",
        id
    );
    await client.end();
    rec.rows.forEach((r) => {
        console.log("service, poistettava recordi", r[11]);
        ret = r[11];
    });
    return ret;
}

const getEqRecord = async (id) =>{
    console.log("getEqRecord");
    await client.connect();
    const rec = await client.queryArray(
        "SELECT * FROM \"Equipment\" WHERE \"equipmentid\" = ($1)",
        id
    );
    await client.end();

    console.log("model arvo kannasta")
    rec.rows.forEach((r) => {
        console.log("r item -> model:", r[7]);    
        r[7] = r[7].replace("\n", "").replace("/","");           
    });

    console.log("Uusi model arvo")
    rec.rows.forEach((r) => {
        console.log("r item -> model:", r[7]);            
    });

    console.log("getEqRecord returns ", rec.rows);
    return rec.rows;
}


const addEquipment = async (
    prefix,
    category,
    number,
    oldid,
    status,                        
    manufacture,
    model,
    serialnro,
    location,
    use,
    equipmentid,
    equipmentdesc,
    categorydesc
) => {
    
    await client.connect();
    
    console.log("service, lisätään laite, oldid = ", oldid);
    await client.queryArray(
        //'INSERT INTO "Equipment" (prefix,category) VALUES( $1, $2 )', prefix, category);
        
        'INSERT INTO "Equipment" (prefix,category,number,oldid,status,manufacture, model, serialnro, location, use, equipmentid, equipmentdesc, categorydesc) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', 
        prefix,
        category,
        number,
        oldid,
        status,                        
        manufacture,
        model,
        serialnro,
        location,
        use,
        equipmentid,
        equipmentdesc,
        categorydesc,    
        );
        
    await client.end();
    console.log('Laite rekisteröity');
}
/* id, prefix, category,number, oldID, status, manufacture, model, serialnro, location, use, created, equipmentid, equipmentDesc, categoryDesc */
const updateEquipment = async (equipmentid, equipmentDesc, category) => {
    console.log("service, updateEquipment:")
    console.log('equipmentid = ', equipmentid + ', equipmentDesc = ', equipmentDesc + 
    ', category = ', category);

    await client.connect();
    console.log("service, päivitetään laite");
    await client.queryArray(
        //'UPDATE equipment SET prefix=prefix, category = category,number = number, oldID = oldID, status = status, manufacture = manufacture, model = model, serialnro = serialnro, location = location, use = use, equipmentid = equipmentid, equipmentDesc = equipmentDesc, categoryDesc = categoryDesc) WHERE ($1) = ',         
        'UPDATE \"Equipmen\" SET category = ($2) WHERE equipmentid = ($1)',
        equipmentid,
        category
        );
    await client.end();
    console.log('Laite päivitetty');
}


const getAllEquipments = async () => {
    console.log('Equipments taulusta haku');
    await client.connect();
    const res = await client.queryArray(
        "SELECT * FROM \"Equipment\" ORDER BY created DESC"
    );
    await client.end();
    //console.log('devices -> ' + res.rows);
    res.rows.forEach((e) => {
        console.log("created ", e[10]);    
        e[10] = e[10].toLocaleDateString('fi-FI');
    });

    return res.rows;
};

const deleteRecord = async (equipmentid) => {
    console.log('Laitteen poisto');
    await client.connect();
    const res = await client.queryArray(
        "DELETE FROM \"Equipment\" WHERE \"equipmentid\" = ($1)",
        equipmentid
    );
    await client.end();
    console.log('services, poistettu');
    return res.rows;
};


//Equipment end



const getOtherData = async () => {
    console.log('Other taulusta haku');
    await client.connect();
    const res = await client.queryArray(
        "SELECT * FROM \"Other\" ORDER BY \"otherID\" ASC"
    );
    await client.end();
    console.log('other -> ' + res.rows);
    return res.rows;
};


const getProductData = async () => {
    console.log('Product taulusta haku');
    await client.connect();
    const res = await client.queryArray(        
        "SELECT * FROM \"Product\" ORDER BY \"productID\" ASC"
    );
    await client.end();
    console.log('Product -> ' + res.rows);
    return res.rows;
};

const getCalibrationData = async () => {
    console.log('Calibration taulusta haku');
    await client.connect();
    const res = await client.queryArray(
        "SELECT * FROM \"Calibration\" ORDER BY \"calilbID\" ASC"
    );
    await client.end();
    console.log('calibration -> ' + res.rows);
    return res.rows;
};


export {
    addEquipment,
    getAllEquipments,
    getOtherData,
    getProductData,
    getCalibrationData,
    getSelRecord,
    getEqRecord,
    updateEquipment,
    deleteRecord
};
