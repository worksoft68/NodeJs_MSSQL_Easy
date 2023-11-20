var express = require('express');
var router = express.Router();
//const systemConfig = require(__path_configs + 'system');
// const folderView = __path_views_backend + 'profile/';
// const linkIndex = '/' + systemConfig.prefixLink + '/dashboards/';
// const publicFunction = require(__path_helpers + 'publicFunction');
const MainControllers = require(__path_controllers + "sys_User");
var asyncHandler = require(__path_middleware + 'async');
/* GET home page. */

router.get('(/)?', asyncHandler(MainControllers.profile));
router.post('/updateProfile', asyncHandler(MainControllers.updateProfile));
router.get('/updateProfile', asyncHandler(MainControllers.profile));
// router.get('/', function (req, res, next) { 
//   res.render(`${folderView}index`, {
//     pageTitle: 'My Profile',
//     userLogin:req.user
//   });
// });

module.exports = router;