//**************************************************************************************************************************
//     Creation time: Tuesday, 23 May 2023 4:14 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	Name: { min: 3, max: 50 },
	Description: { min: 3, max: 50 },
}

let validateSave = () => {	
	return [
		check('Name', 'Message_Invalid_Name').isLength({ min: options.Name.min, max: options.Name.max }),
		check('Description', 'Message_Invalid_Description').isLength({ min: options.Description.min, max: options.Description.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
