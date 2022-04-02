import { Context } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import * as itemServices from '../../services/itemService.js';
import { renderFile } from '../../deps.js';
import { getIP } from 'https://deno.land/x/get_ip/mod.ts';
import { readLines } from 'https://deno.land/std/io/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';
import { readline } from 'https://deno.land/x/readline@v1.1.0/mod.ts';
import * as base64 from 'https://deno.land/x/base64@v0.2.1/mod.ts';

import {
    decode as base64Decode,
    encode as base64Encode,
} from 'https://deno.land/std@0.82.0/encoding/base64.ts';

import * as l from '../../logs/logger.js';
//var jpeg = require('jpeg-js');
var log = [];
var imageFilePath = '';
debugger;

const showMain = async ({ response }) => {
    console.log('Main page called');
    response.body = await renderFile('../views/index.eta', {
        mainpage: "Vivagon laiterekisteri"
    });
};


const getSelected  = async ({ request, response }) => {
    console.log('Datan haku');
    const body = request.body();
    const formData = await body.value;
    console.log(body);
    const lookFor = formData.get('searchText');
    console.log('Etsitään ', lookFor + " dataa");

    response.body = await renderFile('../views/equipment.eta', {
        equipments: await itemServices.searchData(lookFor),
    });
}

const getData = async ({ request, response}) => {
    response.body = await renderFile('../views/equipment.eta', {
        equipments: await itemServices.getAllData(),
    });
};


const removeRec = async ({ response, params }) => {
    console.log("controller, getRemoveRec");
    console.log("params: ", params);
    const eid = await itemServices.getSelRecord(params.eid);
    console.log("controller, eid: ", eid);
    await itemServices.deleteRecord(eid);
    response.redirect('/getData');
}

const register = async ({ request, response }) => {
    try {
        console.log('Laitteen lisäys');
        const body = request.body();
        const formData = await body.value;
        console.log('equipment formi ', formData);

        //Equipment
        const prefix = formData.get('prefix');
        const category = formData.get('category');
        const number = formData.get('number');
        const oldid = formData.get('oldid');
        const status = formData.get('status');
        const use = formData.get('use');
        const equipmentid = formData.get('equipmentid');
        const equipmentdesc = formData.get('equipmentdesc');
        const categorydesc = formData.get('categorydesc');
        const specification = formData.get('specification');
        const notes = formData.get('notes');

        //Purhcase
        const purchaseby = formData.get('purchaseby');
        const purchasedate = formData.get('purchasedate');
        const supplier = formData.get('supplier');
        const supplierid = formData.get('supplierid');
        const manufacture = formData.get('manufacture');
        const model = formData.get('model');
        const serialnro = formData.get('serialnro');
        const location = formData.get('location');

        //Product
        const product = formData.get('product');

        //Calibration
        const calduedate = formData.get('calduedate');
        const lastcaldate = formData.get('lastcaldate');
        const calintervalyears = formData.get('calintervalyears');
        const calibrationcert = formData.get('calibrationcert');
        const calapplied = formData.get('calapplied');

        //Maintenance            
        const maintenanceneed = formData.get('maintenanceneed');
        const maintenanceinstruction = formData.get('maintenanceinstruction');

        //Validation            
        const validationneed = formData.get('validationneed');
        const validationdate = formData.get('validationdate');
        const validationreport = formData.get('validationreport');

        console.log('controller, manufacture', manufacture);


        await itemServices.addEquipment(
            //Equipment taulu
            //Default eid, created
            prefix,
            category,
            number,
            oldid,
            status,
            use,
            equipmentid,
            equipmentdesc,
            categorydesc,
            specification,
            notes,

            //purchase taulu
            purchaseby,
            purchasedate,
            supplier,
            supplierid,
            manufacture,
            model,
            serialnro,
            location,

            //calibration
            calduedate,
            lastcaldate,
            calibrationcert,
            calintervalyears,
            calapplied,

            //product
            product,

            //maintenance
            maintenanceneed,
            maintenanceinstruction,

            //Validation            
            validationneed,
            validationdate,
            validationreport
        );
        console.log('Laite lisätty');
        response.redirect('/getData');
    } catch (err) {
        console.log('Controller error, ', err);
        const errorNote = new Date() + '_error: ' + err;
        //log.push(errorNote);
        //loggaus(log);
    }
};

const getOther = async ({ response }) => {
    response.body = await renderFile('../views/other.eta', {
        other: await itemServices.getOtherData(),
    });
};

const getProducts = async ({ response }) => {
    response.body = await renderFile('../views/product.eta', {
        product: await itemServices.getProductData(),
    });
};

const getCalibrations = async ({ response }) => {
    response.body = await renderFile('../views/calibration.eta', {
        calibration: await itemServices.getCalibrationData(),
    });
};

const gotoNewRecord = async ({ response }) => {
    console.log("+ :aa klikattu");
    response.body = await renderFile('../views/newRecord.eta');
}

const createEq = async ({ response }) => {
    console.log("createEq klikattu");
    response.body = await renderFile('../views/createEq.eta');    
}

const editEq = async ({ response, params }) => {
    console.log("editEq klikattu, params: ", params);
    response.body = await renderFile('../views/editdata.eta', {
        data: await itemServices.getRecord(params.eid),
    });
}

const updaterec = async ({ request, response}) => {
    console.log("Recordin update klikattu.");    

    console.log('Luetaan kenttien tiedot');
    const body = request.body();
    const formData = await body.value;
    console.log("formdata")
    console.log(formData)

    //Equipment
    const eid = formData.get('eid');
    const prefix = formData.get('prefix');
    const category = formData.get('category');
    const number = formData.get('number');
    const oldid = formData.get('oldid');
    const status = formData.get('status');
    const use = formData.get('use');
    const eqid = formData.get('equipmentid');
    const equipmentdesc = formData.get('equipmentdesc');
    const categorydesc = formData.get('categorydesc');
    const specification = formData.get('specification');
    const notes = formData.get('notes');

    //Purhcase
    const purchaseby = formData.get('purchaseby');
    const purchasedate = formData.get('purchasedate');
    const supplier = formData.get('supplier');
    const supplierid = formData.get('supplierid');
    const manufacture = formData.get('manufacture');
    const model = formData.get('model');
    const serialnro = formData.get('serialnro');
    const location = formData.get('location');

    //Product
    const product = formData.get('product');
    console.log("product: ", product);
    //const product2 = document.getElementsByName("product").value
    //console.log("product2: ", product2)

    //Calibration
    const calduedate = formData.get('calduedate');
    const lastcaldate = formData.get('lastcaldate');
    const calintervalyears = formData.get('calintervalyears');
    const calibrationcert = formData.get('calibrationcert');
    const calapplied = formData.get('calapplied');

    //Maintenance            
    const maintenanceneed = formData.get('maintenanceneed');
    const maintenanceinstruction = formData.get('maintenanceinstruction');

    //Validation            
    const validationneed = formData.get('validationneed');
    const validationdate = formData.get('lastValidationDate');
    const validationreport = formData.get('validationreport');

    console.log("controller, eid: ", eid);
    console.log("controller, equipmentdesc: ", equipmentdesc);

    console.log("Controller, updaterec");
    await itemServices.update(
        eid,
        eqid,
        equipmentdesc,
        oldid,
        status,
        specification,
        notes,
        use,
        product,
        purchaseby,
        purchasedate,
        supplier,
        supplierid,
        manufacture,
        model,
        serialnro,
        location,
        calduedate,
        lastcaldate,
        calintervalyears,
        calibrationcert,
        calapplied,
        maintenanceneed,
        maintenanceinstruction,
        validationneed,
        validationdate,
        validationreport
    );
    response.redirect('/getData');
}


export {
    showMain,
    getData,
    getOther,
    getProducts,
    getCalibrations,
    gotoNewRecord,
    createEq,
    editEq,
    updaterec,
    register,
    removeRec,
    getSelected
};
