//**************************************************************************************************************************
//     Creation time: Saturday, 27 May 2023 5:16 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	IdRole: { min: -2147483648, max: 4294967295 },
	UsersId: { min: -2147483648, max: 4294967295 },
}

let validateSave = () => {	
	return [
		check('IdRole', 'Message_Invalid_IdRole').isInt({min: options.IdRole.min, max: options.IdRole.max}),
		check('UsersId', 'Message_Invalid_UsersId').isInt({min: options.UsersId.min, max: options.UsersId.max}),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
