//**************************************************************************************************************************
//     Creation time: Saturday, 27 May 2023 7:38 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	RoleId: { min: -2147483648, max: 4294967295 },
	Functions: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('RoleId', 'Message_Invalid_RoleId').isInt({min: options.RoleId.min, max: options.RoleId.max}),
		check('Functions', 'Message_Invalid_Functions').isLength({ min: options.Functions.min, max: options.Functions.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
