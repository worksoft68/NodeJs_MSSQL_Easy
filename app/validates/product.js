//**************************************************************************************************************************
//     Creation time: Friday, 05 May 2023 2:56 PM
//     Creator: 
//**************************************************************************************************************************
const util          = require('util');
const collection 	= "product";
const publicFunction = require(__path_helpers + 'publicFunction');

const options = {
	IdProduct_Groups: { min: -2147483648, max: 4294967295 },
	Name: { min: 1, max: 100 },
}
module.exports = {
	validator: async (req) => {
		let language 	= await publicFunction.getLanguageJson(collection+".ini");

		//IdProduct_Groups
		req.checkBody('IdProduct_Groups', util.format(language["Message_Invalid_IdProduct_Groups"], options.IdProduct_Groups.min, options.IdProduct_Groups.max))
			.isInt({min: options.IdProduct_Groups.min, max: options.IdProduct_Groups.max});

		//Name
		req.checkBody('Name', util.format(language["Message_Invalid_Name"], options.Name.min, options.Name.max))
			.isLength({ min: options.Name.min, max: options.Name.max });

		let errors  = req.validationErrors() !== false ? req.validationErrors() : [];
		let message = {};
		errors.map((val,ind) => {
			let text = language[val.param];
			message[text] = val.msg;
		})
		return message;
	}
}
