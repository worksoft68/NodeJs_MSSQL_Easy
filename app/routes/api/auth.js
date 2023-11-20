var express 		= require('express');
var router 			= express.Router();
var passport 		= require('passport');
const StringHelpers = require(__path_helpers + 'string');
const systemConfig  = require(__path_configs + 'system');
const UsersModel 	= require(__path_models + 'sys_User');
var   asyncHandler      = require(__path_middleware + 'async');
const notify        = require(__path_configs + 'notify');
var md5 = require('md5');
//https://viblo.asia/p/xac-thuc-rest-api-cua-node-express-mongoose-va-passportjs-YWOZrxnY5Q0
//https://viblo.asia/p/xac-thuc-rest-api-cua-node-express-mongoose-va-passportjs-YWOZrxnY5Q0


router.post('/login',asyncHandler(async (req,res, next) => {
 	req.body 		= JSON.parse(JSON.stringify(req.body)); //take the whole form that has been submitted
	let item 		= Object.assign(req.body); // convert form to item
	item.username 	= md5(item.username);
	item.password 	= md5(item.password);
	UsersModel.getUserByUserNameEncrypted (item.username).then(async ( user) => {               
		if (user === undefined || user.length == 0) {
			res.status(400).send({status:401, success : false, data : notify.ERROR_LOGIN});	
		}else {                  
			if(item.password !== user.Password) { // check password
				res.status(400).send({status:401, success : false, data : notify.ERROR_LOGIN})	
			}else {				
				user.Password = '';	// delete password before saving cookies
				// create token login success
				await UsersModel.getSignedJwtToken(user).then((token) => {	
					user['tokenLogin'] = token;                       
				});	
				saveCookieResponse(res,200,user); // save cookie  user
			}
		}
	});
	
}));

router.get('/logout',asyncHandler(async (req,res, next) => {
	try{
		const options = {
			expirers : new Date (
				Date.now() + 10 * 1000
			),
			httpOnly : true,
			signed: true
		}
		return res.status(200)
		.cookie('info',{},options)
		.send({
			success : true
		});
	}
	catch(err){
		// console.error(err.message)
	}



    // res.status(200)
    // .cookie('info','none',{
    //     expirers : new Date (
    //         Date.now() + 10 * 1000
    //     ),
    //     httpOnly : true
    // })
    // .json({
    //     success : true,
    // })
}));

module.exports = router;

const saveCookieResponse = (res, statusCode, user) => {
	try{
		const options = {
			expirers : new Date (
				Date.now() + systemConfig.COOKIE_EXP * 24 * 60 * 60 * 1000
			),
			httpOnly : true,
			signed: true
		}
		return res.status(statusCode)
		.cookie('info',user,options)
		.send({
			success : true,
			user
		});
	}
	catch(err){
		// console.error(err.message)
	}	
}
