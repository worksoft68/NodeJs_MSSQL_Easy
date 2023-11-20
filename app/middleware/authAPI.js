//*************************************************************************************
// This middleware is used for API
//*************************************************************************************

const asyncHandler  = require("./async");
var jwt 			      = require('jsonwebtoken');
const systemConfig 	= require(__path_configs + 'system');
// var ErrorResponse   = require(__path_helpers + 'ErrorResponse');
 var UserModel       = require(__path_models + 'sys_User');
const SysPermissionModel = require(__path_models + 'sys_Permission');

exports.protect = asyncHandler (async (req,res,next) => { 
  try {
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
    }else if(req.signedCookies.info){
      req.session.cookie.maxAge = 1800000;
      let info  = req.signedCookies.info;
      token = info.tokenLogin;
    }
		//if ((req.user == undefined) && (!token)) {
    if ((req.user == undefined)&&(!token)) {
			res.status(403).send({ success: false, message: 'Please login your account' });
		}   

    try {
      // decode token      
      const decoded = jwt.verify(token,systemConfig.JWT_SECRET); 
      req.user = await UserModel.getByIdCheckLogin(decoded.id);         
      next();
    } catch (err) {  }
	}
	catch (Error) {
    res.status(403).send({ success: false, data: 'Please login your account' });
		//res.redirect(systemConfig.prefixAdmin + '/auth/login/');
	}
})// end exports.protect

exports.authorize = (...parameter) => { 
  return async (req,res,next) => {
    let acction = parameter[1];
    let functionBranch = parameter[0];
    if(acction == "getData") {      
      let success = await SysPermissionModel.getData(req.user, functionBranch);      
      if (success == true) { 
        next();       
      }
      else
      {  
        res.status(403).send({ success: false, message: 'You have not been granted access to this function' })        
        //return next(new ErrorResponse(403,'You have not been granted access to this function'));
      }
    }
    else if(acction == "save"){      
      let success = await SysPermissionModel.save(req.user, functionBranch);      
      if (success == true) { 
        next();       
      }
      else
      {  
       // console.log('You have not been granted access to this function');
        res.status(403).send({ success: false,message: success.message, data: 'You have not been granted access to this function' })        
        //return next(new ErrorResponse(403,'You have not been granted access to this function'));
      }
    }
    else if(acction == "delete"){      
      let success = await SysPermissionModel.deleteItem(req.user, functionBranch);      
      if (success == true) { 
        next();       
      }
      else
      {  
        res.status(403).send({ success: false,message: success.message, data: 'You have not been granted access to this function' })        
       
        //return next(new ErrorResponse(403,'You have not been granted access to this function'));
      }
    }
    else{      
     // console.log('action does not exist');
      res.status(403).send({ success: false, message: 'action does not exist' })  
     //return next(new ErrorResponse(403,'action does not exist'));
    }
  }
}

