var express             = require('express');
var router              = express.Router();
const collection        = "sys_User_Role";
const MainControllers   = require(__path_controllers + collection);
var asyncHandler        = require(__path_middleware + 'async');

router.get('(/)?', asyncHandler(MainControllers.index));

router.get('(/searchGet)?', asyncHandler(MainControllers.searchGet));

router.post('/save', asyncHandler(MainControllers.save));

router.put('/update', asyncHandler(MainControllers.update));

router.get('/getById/:id', asyncHandler(MainControllers.getById));

router.post('/search', asyncHandler(MainControllers.search));

router.delete('/deleteById', asyncHandler(MainControllers.deleteById));

router.delete('/deleteList', asyncHandler(MainControllers.deleteList));

router.post('/exportData', asyncHandler(MainControllers.exportData));

module.exports = router;
