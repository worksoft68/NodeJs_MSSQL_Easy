var express = require('express');
var router = express.Router();
const collection = "categories";
const MainControllers = require(__path_controllers + collection);
var asyncHandler = require(__path_middleware + 'async');
var {protect, authorize}  = require(__path_middleware + 'auth');


router.get('(/)?', asyncHandler(MainControllers.indexString));

router.post('/getAll', asyncHandler(MainControllers.getAll));

router.get('(/searchGet)?', asyncHandler(MainControllers.searchGet));

router.post('/save',  protect, authorize(collection,"save"), asyncHandler(MainControllers.save));

router.put('/update',  protect, authorize(collection,"save"), asyncHandler(MainControllers.update));

// router.post('/save', validate.validateSave(), asyncHandler(MainControllers.save));

// router.put('/update', validate.validateSave(), asyncHandler(MainControllers.update));

router.get('/getById/:id', asyncHandler(MainControllers.getById));

router.post('/search', asyncHandler(MainControllers.search));

router.delete('/deleteById', asyncHandler(MainControllers.deleteById));

router.delete('/deleteList', asyncHandler(MainControllers.deleteList));

router.post('/exportData', asyncHandler(MainControllers.exportData));

module.exports = router;
