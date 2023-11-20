//**************************************************************************************************************************
//     Creation time: Saturday, 27 May 2023 2:02 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');
const util = require('util');

const options = {
	EmployeeCode: { min: 1, max: 15 },
	CompanyId: { min: 0, max: 18446744073709551615 },
	DepartmentId: { min: 0, max: 18446744073709551615 },
	PositionId: { min: 0, max: 18446744073709551615 },
	LastName: { min: 1, max: 30 },
	FirstName: { min: 1, max: 30 },
	UserName: { min: 1, max: 20 },
	Password: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('EmployeeCode', 'Message_Invalid_EmployeeCode').isLength({ min: options.EmployeeCode.min, max: options.EmployeeCode.max }),
		check('DepartmentId', 'Message_Invalid_DepartmentId').isInt({min: options.DepartmentId.min, max: options.DepartmentId.max}),
		check('LastName', 'Message_Invalid_LastName').isLength({ min: options.LastName.min, max: options.LastName.max }),
		check('FirstName', 'Message_Invalid_FirstName').isLength({ min: options.FirstName.min, max: options.FirstName.max }),
		check('UserName', 'Message_Invalid_UserName').isLength({ min: options.UserName.min, max: options.UserName.max }),
		check('Password', 'Message_Invalid_Password').isLength({ min: options.Password.min, max: options.Password.max }),
	];
}

let updateProfile = (obj, language) => {	
	let message = {};
	if((obj.EmployeeCode < options.EmployeeCode.min) || (obj.EmployeeCode > options.EmployeeCode.max)){
		message['EmployeeCode'] = util.format(language['Message_Invalid_EmployeeCode'], options.EmployeeCode.min, options.EmployeeCode.max);
	}
	if((obj.DepartmentId < options.DepartmentId.min) || (obj.DepartmentId > options.DepartmentId.max)){
		message['DepartmentId'] = util.format(language['Message_Invalid_DepartmentId'], options.DepartmentId.min, options.DepartmentId.max);
	}
	if((obj.LastName.length < options.LastName.min) || (obj.LastName.length > options.LastName.max)){
		message['LastName'] = util.format(language['Message_Invalid_LastName'], options.LastName.min, options.LastName.max);
	}
	if((obj.FirstName.length < options.FirstName.min) || (obj.FirstName.length > options.FirstName.max)){
		message['FirstName'] = util.format(language['Message_Invalid_FirstName'], options.FirstName.min, options.FirstName.max);
	}
	
	if(Object.keys(message).length==0)
		return false;
	return message;	
}

let validate = {
	validateSave,
	updateProfile,
	options,
};
module.exports = {validate};
