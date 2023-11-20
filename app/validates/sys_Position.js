//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 2:17 PM
//     Creator: 
//**************************************************************************************************************************
const {check} = require('express-validator');

const options = {
	PositionName: { min: 1, max: 50 },
}

let validateSave = () => {	
	return [
		check('PositionName', 'Message_Invalid_PositionName').isLength({ min: options.PositionName.min, max: options.PositionName.max }),
	];
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
