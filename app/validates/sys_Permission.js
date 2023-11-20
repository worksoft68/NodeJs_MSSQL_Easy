//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 10:03 AM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	PermissionId: { min: -9223372036854775808, max: 18446744073709551615 },
	UserId: { min: -2147483648, max: 4294967295 },
	Functions: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('UserId', 'Message_Invalid_UserId').isInt({min: options.UserId.min, max: options.UserId.max}),
		check('Functions', 'Message_Invalid_Functions').isLength({ min: options.Functions.min, max: options.Functions.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
