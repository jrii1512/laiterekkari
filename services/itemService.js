

//import { console } from 'console';
import { client } from '../database/db.js';
import * as l from '../logs/logger.js';

//const databaseUrl = Deno.env.get("DATABASE_URL");
debugger;

var log = [];

//Equipment start
const getSelRecord = async (eid) => {
    console.log("Services, getSelRecord: ", eid)
    let ret = "";
    console.log("getSelRecord");
    await client.connect();
    const rec = await client.queryArray(
        "SELECT * FROM \"equip\" WHERE \"eid\" = ($1)",
        eid
    );
    await client.end();
    rec.rows.forEach((r) => {
        console.log("service, poistettava recordi", r[0]);
        ret = r[0];
    });
    console.log(rec.rows);

    return ret;
}

const formatDDMMYYYY = (str) => {
    return str.getDate() +
        "." + (str.getMonth() + 1) +
        "." + str.getFullYear();
}

const getRecord = async (eid) => {
    console.log("getRecord");
    await client.connect();
    const rec = await client.queryArray(
        'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".oldid, \"equip\".status, \"equip\".specification, \"equip\".notes, \"equip\".usedby, \"prod\".product, \"purch\".purchaseby, \"purch\".purchasedate, \"purch\".supplier, \"purch\".supplierid, \"purch\".manufacture, \"purch\".model, \"purch\".serialnro, \"purch\".location, \"calib\".calduedate, \"calib\".lastcaldate, \"calib\".calintervalyears, \"calib\".calibrationcert, \"calib\".applied, \"maint\".maintneed, \"maint\".maintinstruction,\"valid\".validationneed, \"valid\".lastvalidationdate, \"valid\".validationreport FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"calib\".equipid WHERE \"eid\" = ($1) ORDER BY \"equip\".eid DESC LIMIT 1',
        eid
    );
    await client.end();

    rec.rows.forEach((e) => {
        var i = 0;

        e[10] = modifyDateFormat(e[10])
        e[17] = modifyDateFormat(e[17])
        e[18] = modifyDateFormat(e[18])
        e[25] = modifyDateFormat(e[25])

        console.log("purchdate (10): " + e[10] + ", calduedate (17): " + e[17] + ", lastcaldate (18): " + e[18] + ", lastvalidationdate (25): " + e[25])

        console.log("Get Record indeksointi:\n")
        e.forEach((r) => {
            console.log(i, r)
            i++
        })
    });

    console.log("getRecord returns ", rec.rows);
    return rec.rows;
}

const modifyDateFormat = (pvm) => {
    let year = new Date(pvm).getFullYear();
    let month = new Date(pvm).getMonth() + 1;
    let dt = new Date(pvm).getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    /*
    console.log("Modified date")
    console.log(year + '-' + month + '-' + dt);
    */
    const resp = year + '-' + month + '-' + dt

    return resp;
}

const checkDuplicate = async (equipmentid) => {
    var dub = ""
    console.log("Server -> checkDublicate, equipmentid = ", equipmentid)
    await client.connect();
    const res = await client.queryArray(
        "SELECT \"equip\".equipmentid FROM \"equip\" WHERE equipmentid = ", equipmentid
    );
    await client.end();

    console.log('Duplicate resp = ' + res.rows);
    res.rows.forEach((e) => {
        let i = 0;
        if (e === equipmentid) {
            console.log("Dublicate found");
            dub = "Kyllä"
        } else {
            dub = "Ei"
        }
    });
    return dub;
}


const addEquipment = async (
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
) => {

    //if empty date then set default 
    if (purchasedate === "") {
        console.log("invalid purchasedate")
        purchasedate = new Date(0)
        console.log(purchasedate)
    }
    if (lastcaldate === "") {
        console.log("invalid lastcaldate")
        lastcaldate = new Date(0)
        console.log(lastcaldate)
    }
    if (calduedate === "") {

        console.log("invalid calduedate")
        calduedate = new Date(0)
        console.log(calduedate)

    }
    if (validationdate === "") {
        console.log("invalid validationdate")
        validationdate = new Date(0)
        console.log(validationdate)
    }

    console.log("pdate: ", purchasedate)
    console.log("ldate: ", lastcaldate)
    console.log("caldued: ", calduedate)
    console.log("validationdate: ", validationdate)

    //const eidExist = checkIfEquipmentHasValues();
    //console.log("Equipment table has rows, ", eidExist);
    await client.connect();
    await client.queryArray(
        'INSERT INTO "equip" (oldid, status, prefix, category, categorydesc, number, equipmentid, equipmentdesc, specification, notes, usedby) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        oldid,
        status,
        prefix,
        category,
        categorydesc,
        number,
        equipmentid,
        equipmentdesc,
        specification,
        notes,
        use
    );

    //hae Equipment taulun id (viimeinen)    
    const lasteid = await client.queryArray("SELECT eid FROM \"equip\" ORDER BY eid DESC LIMIT 1");
    console.log("Equipment taulun eid arvo: ", lasteid.rows[0]);

    const nextid = parseInt(lasteid.rows[0]);
    console.log("services, next record id to be created: ", nextid);

    await client.end();
    console.log('Equipment taulu täytetty');

    await client.connect();
    await client.queryArray(
        'INSERT INTO "purch" (purchaseby, purchasedate, supplier, supplierid, manufacture, equipid, model, serialnro, location) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9)',
        purchaseby,
        purchasedate,
        supplier,
        supplierid,
        manufacture,
        nextid,
        model,
        serialnro,
        location,
    );

    await client.end();
    console.log('Purchase taulu täytetty');

    await client.connect();
    await client.queryArray(
        'INSERT INTO "prod"(product, equipid) VALUES( $1, $2)',
        product,
        nextid
    );

    await client.end();
    console.log('Product taulu täytetty');

    await client.connect();
    await client.queryArray(
        'INSERT INTO "calib"(equipid, calduedate, lastcaldate, calintervalyears, calibrationcert, applied) VALUES( $1, $2, $3, $4, $5, $6)',
        nextid,
        calduedate,
        lastcaldate,
        calintervalyears,
        calibrationcert,
        calapplied
    );
    await client.end();
    console.log('Calibration taulu täytetty');

    //Jos calibration due date ei ole tyhjä luo alert
    if (calduedate != "") {
        console.log("calduedate is not empty so creating diff");
        let diff = checkCalDueDiff(calduedate);
        await client.connect();
        await client.queryArray(
            'INSERT INTO "alert"(target, diff, equipid) VALUES( $1, $2, $3)',
            "Calibration Due Date",
            diff.toFixed(),
            nextid,
        );
    }
    await client.end();
    console.log('Alert taulu täytetty');

    await client.connect();
    await client.queryArray(
        'INSERT INTO "maint"(maintneed, maintinstruction, equipid) VALUES( $1, $2, $3)',
        maintenanceneed,
        maintenanceinstruction,
        nextid
    );

    await client.end();
    console.log('Maintenance taulu täytetty');

    await client.connect();
    await client.queryArray(
        'INSERT INTO "valid"(validationneed, lastvalidationdate, validationreport, equipid) VALUES( $1, $2, $3, $4)',
        validationneed,
        validationdate,
        validationreport,
        nextid
    );

    await client.end();
    console.log('Validation taulu täytetty');

}
/* id, prefix, category,number, oldID, status, manufacture, model, serialnro, location, use, created, equipmentid, equipmentDesc, categoryDesc */
const update = async (
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
) => {
    console.log("services, update");
    console.log('calduedate:', calduedate)
    console.log('lastcaldate:', lastcaldate)
    console.log('validationdate:', validationdate)

    console.log('equipmentid:', eqid)
    console.log('equipmendesc:', equipmentdesc)

    await client.connect();

    console.log("service, päivitetään recordit");
    const uResp = await client.queryArray(
        "UPDATE equip SET \"equipmentid\" = ($1), \"equipmentdesc\" = ($2), \"oldid\" = ($3),\"status\" = ($4),\"specification\" = ($5),\"notes\" = ($6),\"usedby\" = ($7)  WHERE eid = ($8)",
        eqid,
        equipmentdesc,
        oldid,
        status,
        specification,
        notes,
        use,
        eid
    );

    const uResp2 = await client.queryArray(
        "UPDATE purch SET \"purchaseby\" = ($1), \"purchasedate\" = ($2),\"supplier\" = ($3),\"supplierid\" = ($4),\"manufacture\" = ($5),\"model\" = ($6),\"serialnro\" = ($7),\"location\" = ($8)  WHERE equipid = ($9)",
        purchaseby,
        purchasedate,
        supplier,
        supplierid,
        manufacture,
        model,
        serialnro,
        location,
        eid
    );

    const res = await client.queryArray(
        "SELECT calduedate FROM \"calib\" ORDER BY calduedate DESC LIMIT 1"
    );

    var c = ""
    var earlierCalDue = ""
    res.rows.forEach((c) => {
        console.log("c: ", c)
        earlierCalDue = modifyDateFormat(c);
        console.log("calduedate value before update = ", earlierCalDue + "\nNew calduedate = ", calduedate);
    })


    if (earlierCalDue != calduedate) {
        console.log("Calibration Due Date to be updated")
        const uResp3 = await client.queryArray(
            "UPDATE calib SET \"calduedate\" = ($1), \"lastcaldate\" = ($2), \"calintervalyears\" = ($3),\"calibrationcert\" = ($4),\"applied\" = ($5) WHERE equipid = ($6)",
            calduedate,
            lastcaldate,
            calintervalyears,
            calibrationcert,
            calapplied,
            eid
        );

        //Update alert table diff value
        const diff = checkCalDueDiff(calduedate).toFixed()

        const uResp31 = await client.queryArray(
            "UPDATE alert SET \"diff\" = ($1) WHERE equipid = ($2)",
            diff,
            eid
        );
    }

    const uResp4 = await client.queryArray(
        "UPDATE maint SET \"maintneed\" = ($1), \"maintinstruction\" = ($2) WHERE equipid = ($3)",
        maintenanceneed,
        maintenanceinstruction,
        eid
    );

    const uResp5 = await client.queryArray(
        "UPDATE valid SET \"validationneed\" = ($1), \"lastvalidationdate\" = ($2), \"validationreport\" = ($3) WHERE equipid = ($4)",
        validationneed,
        validationdate,
        validationreport,
        eid
    );

    const uResp6 = await client.queryArray(
        "UPDATE prod SET \"product\" = ($1) WHERE equipid = ($2)",
        product,
        eid
    );
    await client.end();

    if (uResp === 0 || uResp2 === 0 || uResp4 === 0 || uResp5 === 0 || uResp6 === 0) {
        console.log("Recordin päivitys epäonnistui, tarkasta lauseke")
    }
    else {
        console.log('Recordit päivitetty, paluuarvo: ', uResp + "\n" + uResp2 + "\n" + uResp4 + "\n" + uResp5 + "\n" + uResp6 + "\n");
    }
} //end of update




const searchData = async (lookFor) => {
    console.log('Services, datan haku keywordin perusteella');
    await client.connect();
    const res = await client.queryArray(
        'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".status, \"equip\".usedby, \"prod\".product,\"purch\".purchaseby,\"purch\".purchasedate,\"purch\".supplier, \"maint\".maintneed,\"valid\".validationneed, "valid".lastvalidationdate,\"calib\".calduedate,\"calib\".lastcaldate, \"calib\".applied, \"calib\".calintervalyears, \"alert\".target, \"alert\".diff FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid  JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"valid\".equipid JOIN \"alert\" ON \"equip\".eid = \"alert\".equipid WHERE (equipmentid LIKE ($1) OR equipmentdesc LIKE ($1) OR product LIKE ($1) OR purchaseby LIKE ($1) OR usedby LIKE ($1) OR status LIKE ($1)) ORDER BY \"equip\".eid DESC', lookFor + '%'
    );
    await client.end();
    console.log('data -> ' + res.rows);
    res.rows.forEach((e) => {
        let i = 0;
        e[7] = modifyDateFormat(e[7]);
        e[12] = modifyDateFormat(e[12]);
        console.log("Purchase day", e[7]);
        console.log(i, e);
    });

    console.log("service, getSearch -> ", res.rows);
    return res.rows;
};

const getAllData = async (sortbase) => {
    let res = "";
    let sortby = "";
    var calcDueDiffDays = 0;

    for (var key in sortbase) {
        console.log("key:", key);
        console.log("value: ", sortbase[key]);
        sortby = sortbase[key];
    }

    await client.connect();
    //Sorting based on product
    if (sortby === "product") {
        console.log('product sorting')
        res = await client.queryArray(
            'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".status, \"equip\".usedby,\"prod\".product,\"purch\".purchaseby,\"purch\".purchasedate,\"purch\".supplier,\"maint\".maintneed,\"valid\".validationneed, "valid".lastvalidationdate,\"calib\".calduedate,\"calib\".lastcaldate, \"calib\".applied, \"calib\".calintervalyears, \"alert\".target, \"alert\".diff FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"valid\".equipid JOIN \"alert\" ON \"equip\".eid = \"alert\".equipid ORDER BY \"prod\".product DESC'
        );
    } else if (sortby === 'status') {
        console.log('status sorting')
        res = await client.queryArray(
            'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".status, \"equip\".usedby,\"prod\".product,\"purch\".purchaseby,\"purch\".purchasedate,\"purch\".supplier,\"maint\".maintneed,\"valid\".validationneed, "valid".lastvalidationdate,\"calib\".calduedate,\"calib\".lastcaldate, \"calib\".applied, \"calib\".calintervalyears, \"alert\".target, \"alert\".diff FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"valid\".equipid JOIN \"alert\" ON \"equip\".eid = \"alert\".equipid ORDER BY \"equip\".status ASC'
        );

    } else if (sortby === 'ostaja') {
        res = await client.queryArray(
            'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".status, \"equip\".usedby,\"prod\".product,\"purch\".purchaseby,\"purch\".purchasedate,\"purch\".supplier,\"maint\".maintneed,\"valid\".validationneed, "valid".lastvalidationdate,\"calib\".calduedate,\"calib\".lastcaldate, \"calib\".applied, \"calib\".calintervalyears, \"alert\".target, \"alert\".diff FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"valid\".equipid JOIN \"alert\" ON \"equip\".eid = \"alert\".equipid ORDER BY \"purch\".purchaseby ASC'
        );

    } else if (sortby === 'ostopvm') {
        res = await client.queryArray(
            'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".status, \"equip\".usedby,\"prod\".product,\"purch\".purchaseby,\"purch\".purchasedate,\"purch\".supplier,\"maint\".maintneed,\"valid\".validationneed, "valid".lastvalidationdate,\"calib\".calduedate,\"calib\".lastcaldate, \"calib\".applied, \"calib\".calintervalyears, \"alert\".target, \"alert\".diff FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"valid\".equipid JOIN \"alert\" ON \"equip\".eid = \"alert\".equipid ORDER BY \"purch\".purchasedate DESC'
        );

    } else if (sortby === 'toimittaja') {
        res = await client.queryArray(
            'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".status, \"equip\".usedby,\"prod\".product,\"purch\".purchaseby,\"purch\".purchasedate,\"purch\".supplier,\"maint\".maintneed,\"valid\".validationneed, "valid".lastvalidationdate,\"calib\".calduedate,\"calib\".lastcaldate, \"calib\".applied, \"calib\".calintervalyears, \"alert\".target, \"alert\".diff FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"valid\".equipid JOIN \"alert\" ON \"equip\".eid = \"alert\".equipid ORDER BY \"purch\".manufacture ASC'
        );
    } else if (sortby === 'osasto') {
        res = await client.queryArray(
            'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".status, \"equip\".usedby,\"prod\".product,\"purch\".purchaseby,\"purch\".purchasedate,\"purch\".supplier,\"maint\".maintneed,\"valid\".validationneed, "valid".lastvalidationdate,\"calib\".calduedate,\"calib\".lastcaldate, \"calib\".applied, \"calib\".calintervalyears, \"alert\".target, \"alert\".diff FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"valid\".equipid JOIN \"alert\" ON \"equip\".eid = \"alert\".equipid ORDER BY \"equip\".usedby ASC'
        );
        }    
    else {
        res = await client.queryArray(
            'SELECT DISTINCT \"equip\".eid, \"equip\".equipmentid, \"equip\".equipmentdesc, \"equip\".status, \"equip\".usedby,\"prod\".product,\"purch\".purchaseby,\"purch\".purchasedate,\"purch\".supplier,\"maint\".maintneed,\"valid\".validationneed, "valid".lastvalidationdate,\"calib\".calduedate,\"calib\".lastcaldate, \"calib\".applied, \"calib\".calintervalyears, \"alert\".target, \"alert\".diff FROM \"equip\" JOIN \"prod\" ON \"equip\".eid = \"prod\".equipid JOIN \"calib\" ON \"equip\".eid = \"calib\".equipid JOIN \"purch\" ON \"equip\".eid = \"purch\".equipid JOIN \"maint\" ON \"equip\".eid = \"maint\".equipid JOIN \"valid\" ON \"equip\".eid = \"valid\".equipid JOIN \"alert\" ON \"equip\".eid = \"alert\".equipid ORDER BY \"equip\".eid DESC'
        );
    }
    await client.end();
    //console.log('data -> ' + res.rows);

    console.log("getAllData values:\n")
    var i = 0;

    res.rows.forEach((e) => {
        e.forEach((r) => {
            //console.log(i, r)
            i++
        });

        e[7] = modifyDateFormat(e[7])
        e[11] = modifyDateFormat(e[11])
        e[12] = modifyDateFormat(e[12])
        e[13] = modifyDateFormat(e[13])
        console.log("Services, getAllData returns:\n")
        console.log("purchdate (7): " + e[7] + ", lastvalidationdate (11): " + e[11] + ", calduedate (12): " + e[12] + ", lastcaldate (13): " + e[13])
        console.log('\n')
        calcDueDiffDays = checkCalDueDiff(e[12]);
        console.log("Today - calibration diff " + calcDueDiffDays.toFixed() + " days");
        res.rows.forEach((p) => {
            p[16] = calcDueDiffDays.toFixed();
        })
    });


    //console.log("service, getAllData -> ", res.rows);
    return res.rows;
};

const checkCalDueDiff = (diffDate) => {
    //Alarm
    var today = new Date()
    var modToday = modifyDateFormat(new Date())
    console.log("today: ", modToday)
    //Diff between today and calduedate
    var cDate = new Date(diffDate)
    console.log("calduedate:", diffDate)

    var difference_In_Time = today.getTime() - cDate.getTime();

    // To calculate the no. of days between two dates
    let diffDays = difference_In_Time / (1000 * 3600 * 24);

    return diffDays;
}

const deleteRecord = async (eid) => {
    console.log('Laitteen poisto');
    await client.connect();
    const res = await client.queryArray(
        "DELETE FROM \"equip\" WHERE \"eid\" = ($1)",
        eid
    );
    await client.end();
    console.log('services, poistettu');
    return res.rows;
};

//Equipment end
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
    getAllData,
    getProductData,
    getCalibrationData,
    getSelRecord,
    getRecord,
    update,
    deleteRecord,
    searchData,
    modifyDateFormat,
    checkCalDueDiff,
    checkDuplicate,
};
