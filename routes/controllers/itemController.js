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
    response.body = await renderFile('../views/selector.eta');
};


const removeRec = async ({ response, params }) => {
    console.log("controller, getRemoveRec");
    const eqid = await itemServices.getSelRecord(params.equipmentid);
    console.log("controller, eqid ", eqid);

    //alert, confirmation, prompt antavat deno - oak zydeemissä vain cli versiot.
    //Kuinka saada windows confirmation prompt aikaiseksi ?    
    await itemServices.deleteRecord(eqid);
    //alert("Tietue tuhottu");        
    
    response.redirect("/");
}

const register = async ({ request, response }) => {
    try {
        console.log('Laitteen lisäys');
        const body = request.body();
        const formData = await body.value;
        console.log('equipment formi ', formData);

        const prefix = formData.get('prefix');
        const category = formData.get('category');
        const number = formData.get('number');
        const oldid = formData.get('oldid');
        const status = formData.get('status');
        const manufacture = formData.get('manufacture');
        const model = formData.get('model');
        const serialnro = formData.get('serialnro');
        const location = formData.get('location');
        const use = formData.get('useby');
        const equipmentid = formData.get('equipmentid');
        const equipmentdesc = formData.get('equipmentDesc');
        const categorydesc = formData.get('categoryDesc');

        console.log('controller, manufacture', manufacture);

        await itemServices.addEquipment(
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
        );
        console.log('Laite lisätty');
        response.redirect('/');
    } catch (err) {
        console.log('Controller error, ', err);
        const errorNote = new Date() + '_error: ' + err;
        //log.push(errorNote);
        //loggaus(log);
    }
};

const getEquipments = async ({ response }) => {
    response.body = await renderFile('../views/equipment.eta', {
        equipments: await itemServices.getAllEquipments(),
    });
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
    response.body = await renderFile('../views/editeq.eta', {
        eqdata: await itemServices.getEqRecord(params.equipmentid),
    });
}

const updaterec = async ({ response, params }) => {
    console.log("Recordin update klikattu. Params: ", params);
    await itemServices.updateEquipment(params.equipmentid, params.equipmentDesc, params.category);
    response.redirect('/');
}


export {
    showMain,
    getEquipments,
    getOther,
    getProducts,
    getCalibrations,
    gotoNewRecord,
    createEq,
    editEq,
    updaterec,
    register,
    removeRec
};
