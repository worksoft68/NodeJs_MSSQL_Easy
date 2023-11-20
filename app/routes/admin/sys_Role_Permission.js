var express             = require('express');
var router              = express.Router();
const collection        = "sys_Role_Permission";
const collectionUser    = "sys_User";
const MainControllers   = require(__path_controllers + collection);
var asyncHandler        = require(__path_middleware + 'async');
const {validate}        = require(__path_validates + collection);
var {protect, authorize}  = require(__path_middleware + 'auth');
router.get('(/)?', protect, authorize(collectionUser,"getData"), asyncHandler(MainControllers.index));

router.get('(/searchGet)?', protect, authorize(collectionUser,"getData"), asyncHandler(MainControllers.searchGet));

router.post('/save', validate.validateSave(), protect, authorize(collectionUser,"save"), asyncHandler(MainControllers.save));

router.put('/update', validate.validateSave(), protect, authorize(collectionUser,"save"), asyncHandler(MainControllers.update));

router.get('/getById/:id', protect, authorize(collectionUser,"getData"), asyncHandler(MainControllers.getById));

router.post('/search', protect, authorize(collectionUser,"getData"), asyncHandler(MainControllers.search));

router.delete('/deleteById', protect, protect, authorize(collectionUser,"delete"), asyncHandler(MainControllers.deleteById));

router.delete('/deleteList', protect, protect, authorize(collectionUser,"delete"), asyncHandler(MainControllers.deleteList));

router.post('/exportData', protect, authorize(collectionUser,"getData"), asyncHandler(MainControllers.exportData));

module.exports = router;
