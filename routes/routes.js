import { Router } from '../deps.js';
import * as item from './controllers/itemController.js';

const router = new Router();

//adding equipment
router.post('/register', item.register);

router.get('/startremoval/:equipmentid', item.removeRec);
//router.post('/delete/:equipmentid', item.deleteRec);

router.get('/', item.showMain);

router.get('/newRecord', item.gotoNewRecord);
router.get('/equipments', item.getEquipments);
router.get('/other', item.getOther);
router.get('/products', item.getProducts);
router.get('/createEq', item.createEq);
router.get('/editEq/:equipmentid', item.editEq);
//router.post('/update/:equipmentid/:equipmentDesc/:category/:categoryDesc/:number/:oldDesc/:status/:manufacture/:model/:serialnro/:location/:useby', item.updaterec);
router.post('/update/:equipmentid/:equipmentDesc/:category/:categoryDesc/:number/:oldid/:status/:manufacture/:model/:serialnro/:location/:useby', item.updaterec);
/*
router.get('/calibrations', item.getCalibrations);
*/
/*
router.post('/other', item.register);
router.post('/product', item.getDevices);
router.post('/calibration', item.register);
*/

export default router.routes();
