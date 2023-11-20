var express = require('express');
var router = express.Router();
const collection = "sys_Permission";
const MainControllers = require(__path_controllers + collection);
var asyncHandler = require(__path_middleware + 'async');
const {validate}        = require(__path_validates + collection);
var {protect, authorize}  = require(__path_middleware + 'auth');

router.get('(/)?', protect, authorize(collection,"getData"), asyncHandler(MainControllers.index));

router.get('(/searchGet)?', protect, authorize(collection,"getData"), asyncHandler(MainControllers.searchGet));

router.post('/save', validate.validateSave(), protect, authorize(collection,"save"), asyncHandler(MainControllers.save));
router.post('/rightsLikeUser', validate.validateSave(), protect, authorize(collection,"save"), asyncHandler(MainControllers.rightsLikeUser));

router.put('/update', validate.validateSave(), protect, authorize(collection,"save"), asyncHandler(MainControllers.update));

router.get('/getById/:id', protect, authorize(collection,"getData"), asyncHandler(MainControllers.getById));

router.post('/search', protect, authorize(collection,"getData"), asyncHandler(MainControllers.search));

router.delete('/deleteById', protect, authorize(collection,"delete"), asyncHandler(MainControllers.deleteById));

router.delete('/deleteList', protect, authorize(collection,"delete"), asyncHandler(MainControllers.deleteList));

router.post('/exportData', protect, authorize(collection,"getData"), asyncHandler(MainControllers.exportData));

module.exports = router;
