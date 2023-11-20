//**************************************************************************************************************************
//   This file cannot be used directly. You copy and paste this source to where you need it if needed 
//**************************************************************************************************************************

var express             = require('express');
var router              = express.Router();
var asyncHandler        = require(__path_middleware + 'async');

//**************************************************************************************************************************

const Sys_Role_PermissionControllers = require(__path_controllers + 'sys_Role_Permission');

router.post('/saveSys_Role_Permission', asyncHandler(Sys_Role_PermissionControllers.save));

router.put('/updateSys_Role_Permission', asyncHandler(Sys_Role_PermissionControllers.update));

router.get('/getByIdSys_Role_Permission/:id', asyncHandler(Sys_Role_PermissionControllers.getById));

router.delete('/deleteByIdSys_Role_Permission', asyncHandler(Sys_Role_PermissionControllers.deleteById));

module.exports = router;
