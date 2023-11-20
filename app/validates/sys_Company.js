//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 2:19 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	CompanyName: { min: 1, max: 200 },
}

let validateSave = () => {	
	return [
		check('CompanyName', 'Message_Invalid_CompanyName').isLength({ min: options.CompanyName.min, max: options.CompanyName.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
