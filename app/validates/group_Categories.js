//**************************************************************************************************************************
//     Creation time: Thursday, 27 April 2023 2:52 PM
//     Creator: 
//**************************************************************************************************************************
const util          = require('util');
const collection 	= "group_Categories";
const publicFunction = require(__path_helpers + 'publicFunction');

const options = {
	Name: { min: 1, max: 50 },
	Slug: { min: 1, max: 50 },
}
module.exports = {
	validator: async (req) => {
		let language 	= await publicFunction.getLanguageJson(collection+".ini");

		//Name
		req.checkBody('Name', util.format(language["Message_Invalid_Name"], options.Name.min, options.Name.max))
			.isLength({ min: options.Name.min, max: options.Name.max });

		//Slug
		req.checkBody('Slug', util.format(language["Message_Invalid_Slug"], options.Slug.min, options.Slug.max))
			.isLength({ min: options.Slug.min, max: options.Slug.max });

		let errors  = req.validationErrors() !== false ? req.validationErrors() : [];
		let message = {};
		errors.map((val,ind) => {
			let text = language[val.param];
			message[text] = val.msg;
		})
		return message;
	}
}
