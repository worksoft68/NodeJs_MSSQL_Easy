//**************************************************************************************************************************
//     Creation time: Saturday, 27 May 2023 7:27 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	Name: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('Name', 'Message_Invalid_Name').isLength({ min: options.Name.min, max: options.Name.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
