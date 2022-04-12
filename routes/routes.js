import { Router } from '../deps.js';
import * as item from './controllers/itemController.js';

const router = new Router();

//adding equipment
router.post('/register', item.register);

router.get('/startremoval/:eid', item.removeRec);

router.get('/', item.showMain);
router.get('/getData', item.getData);
router.get('/getData/:sorterby', item.getData);

router.post('/getSelected', item.getSelected);
router.get('/createEq', item.createEq);
router.get('/editEq/:eid', item.editEq);
router.get('/guide', item.showGuide);
router.post('/update', item.updaterec);
router.post('/register', item.register);

router.get('/populate', item.populate);

export default router.routes();
