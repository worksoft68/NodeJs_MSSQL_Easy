var express = require('express');
var router = express.Router();

// add middleAuthentication vào giữa router để kiểm tra đăng nhập
const middleGetUserInfo = require(__path_middleware + 'get-user-info');
const {language}  = require(__path_middleware + 'get-language');

router.use('/auth', require('./auth'));
router.use('/', middleGetUserInfo, require('./home'));
// your router is here

router.use('/chuDeBaiViet', language('chuDeBaiViet'), require('./chuDeBaiViet'));
router.use('/sys_Company', language('sys_Company'), require('./sys_Company'));
router.use('/sys_Department', language('sys_Department'), require('./sys_Department'));
router.use('/sys_Position', language('sys_Position'), require('./sys_Position'));
router.use('/sys_Role', language('sys_Role'), require('./sys_Role'));
router.use('/sys_FunctionForPermission', language('sys_FunctionForPermission'), require('./sys_FunctionForPermission'));
router.use('/sys_Permission', language('sys_Permission'), require('./sys_Permission'));
router.use('/sys_User', language('sys_User'), require('./sys_User'));
router.use('/sys_CustomSettings', language('sys_CustomSettings'), require('./sys_CustomSettings'));
router.use('/categories', language('categories'), require('./categories'));
router.use('/articles', language('articles'), require('./articles'));
router.use('/sys_Role_Permission', language('sys_Role_Permission'), require('./sys_Role_Permission'));
router.use('/profile', language('sys_User'), require('./profile'));
router.use('/sys_Exchange_Log_Subject', language('sys_Exchange_Log_Subject'), require('./sys_Exchange_Log_Subject'));
router.use('/sys_Exchange_Log_Content', language('sys_Exchange_Log_Content'), require('./sys_Exchange_Log_Content'));
router.use('/product_groups', language('product_Groups'), require('./product_Groups'));
router.use('/product', language('product'), require('./product'));
router.use('/systemLog', language('systemLog'), require('./systemLog'));

module.exports = router;




