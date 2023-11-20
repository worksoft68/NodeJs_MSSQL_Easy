//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 2:20 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	CompanyId: { min: -9223372036854775808, max: 18446744073709551615 },
	DepartmentName: { min: 0, max: 50 },
	Abbreviation: { min: 0, max: 15 },
}

let validateSave = () => {	
	return [
		check('DepartmentName', 'Message_Invalid_DepartmentName').isLength({ min: options.DepartmentName.min, max: options.DepartmentName.max }),
		check('Abbreviation', 'Message_Invalid_Abbreviation').isLength({ min: options.Abbreviation.min, max: options.Abbreviation.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
