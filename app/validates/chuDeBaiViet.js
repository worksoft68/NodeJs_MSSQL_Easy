//**************************************************************************************************************************
//     Creation time: Wednesday, 30 November 2022 7:02 PM
//     Creator: 
//**************************************************************************************************************************
const util          = require('util');
const collection 	= "chuDeBaiViet";
const publicFunction = require(__path_helpers + 'publicFunction');

const options = {
	Name: { min: 1, max: 40 },
	Slug: { min: 1, max: 40 },
	ShowHomePage: { min: 1, max: 255 },
	Status: { min: 1, max: 255 },
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

		//ShowHomePage
		req.checkBody('ShowHomePage', util.format(language["Message_Invalid_ShowHomePage"], options.ShowHomePage.min, options.ShowHomePage.max))

		//Status
		req.checkBody('Status', util.format(language["Message_Invalid_Status"], options.Status.min, options.Status.max))

		let errors  = req.validationErrors() !== false ? req.validationErrors() : [];
		let message = {};
		errors.map((val,ind) => {
			let text = language[val.param];
			message[text] = val.msg;
		})
		return message;
	}
}
