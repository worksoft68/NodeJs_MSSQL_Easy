//**************************************************************************************************************************
//     Creation time: Thursday, 01 December 2022 10:32 AM
//     Creator: 
//**************************************************************************************************************************
const util          = require('util');
const collection 	= "exchange_Log_Subject";
const publicFunction = require(__path_helpers + 'publicFunction');

const options = {
	Name: { min: 3, max: 40 },
	Description: { min: 0, max: 50 },
}
module.exports = {
	validator: async (req) => {
		let language 	= await publicFunction.getLanguageJson(collection+".ini");

		//Name
		req.checkBody('Name', util.format(language["Message_Invalid_Name"], options.Name.min, options.Name.max))
			.isLength({ min: options.Name.min, max: options.Name.max });

		//Description
		req.checkBody('Description', util.format(language["Message_Invalid_Description"], options.Description.min, options.Description.max))
			.isLength({ min: options.Description.min, max: options.Description.max });

		let errors  = req.validationErrors() !== false ? req.validationErrors() : [];
		let message = {};
		errors.map((val,ind) => {
			let text = language[val.param];
			message[text] = val.msg;
		})
		return message;
	}
}
