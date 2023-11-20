//**************************************************************************************************************************
//     Creation time: Saturday, 27 May 2023 9:09 AM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	Name: { min: 3, max: 40 },
	Ordering: { min: -2147483648, max: 4294967295 },
	Description: { min: 0, max: 50 },
}

let validateSave = () => {	
	return [
		check('Name', 'Message_Invalid_Name').isLength({ min: options.Name.min, max: options.Name.max }),
		check('Ordering', 'Message_Invalid_Ordering').isInt({min: options.Ordering.min, max: options.Ordering.max}),
		check('Description', 'Message_Invalid_Description').isLength({ min: options.Description.min, max: options.Description.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
