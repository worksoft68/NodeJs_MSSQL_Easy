//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 10:45 AM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	FunctionName: { min: 3, max: 50 },
}

let validateSave = () => {	
	return [
		check('FunctionName', 'Message_Invalid_FunctionName').isLength({ min: options.FunctionName.min, max: options.FunctionName.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
