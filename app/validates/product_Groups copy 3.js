//**************************************************************************************************************************
//     Creation time: Thursday, 04 May 2023 4:08 PM
//     Creator: 
//**************************************************************************************************************************

const util = require('util');
const {check} = require('express-validator');
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

let validate = {
	validateSave,
	options,
};

module.exports = {validate};




