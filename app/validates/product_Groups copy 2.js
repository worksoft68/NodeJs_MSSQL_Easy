//**************************************************************************************************************************
//     Creation time: Thursday, 04 May 2023 4:08 PM
//     Creator: 
//**************************************************************************************************************************

const util = require('util');
const {check, validationResult} = require('express-validator');
const options = {	
	Name: { min: 2, max: 10 },
	Description: { min: 2, max: 100 },
}

let validateSave = () => {	
	return [
		check('Name', 'Message_Invalid_Name').isLength({ min: options.Name.min, max: options.Name.max }),
		check('Description', 'Message_Invalid_Description').isLength({ min: options.Description.min, max: options.Description.max }),	
	];
}

const validateReq = async (req, res, name_cookie_language) => {
	const checkValidate = validationResult(req);
	let errors = checkValidate.errors;	
	if (errors.length == 0) {
		return false;
	}
	else {
		let languageInterface = req.cookies[name_cookie_language];
		if((typeof languageInterface == 'undefined')) {
			languageInterface = req[name_cookie_language];
		} 
		language = languageInterface.text;
		let message = {};
		errors.map((val,ind) => {
			let text = language[val.msg];
			message[val.path] = util.format(text, options.Name.min, options.Name.max);
		})
		return res.status(400).json({status:400, success : true, error : message});
	}
}

let validate = {
	validateSave: validateSave,	
	validateReq: validateReq,	
};

module.exports = {validate};




