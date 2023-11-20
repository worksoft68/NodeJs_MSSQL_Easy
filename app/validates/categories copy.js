//**************************************************************************************************************************
//     Creation time: Wednesday, 24 May 2023 8:07 PM
//     Creator: 
//**************************************************************************************************************************
const util          = require('util');
const options = {
	Name: { min: 3, max: 40 },
	Slug: { min: 3, max: 40 },	
	ViewType: { min: 0, max: 20 },
	Zone: { min: 0, max: 10 },
	Description: { min: 0, max: 50 },
}

let validateSave = (obj, language) => {
	let message = {};
	//let result=fales;

	if((obj.Name.length < options.Name.min) || (obj.Name.length > options.Name.max)){
		message['Name'] = util.format(language["Message_Invalid_Name"], options.Name.min, options.Name.max);
	}
	if((obj.Slug.length < options.Slug.min) || (obj.Slug.length > options.Slug.max)){
		message['Slug'] = util.format(language["Message_Invalid_Slug"], options.Slug.min, options.Slug.max);
	}

	
	if((obj.ViewType.length < options.ViewType.min) || (obj.ViewType.length > options.ViewType.max)){
		message['ViewType'] = util.format(language["Message_Invalid_ViewType"], options.ViewType.min, options.ViewType.max);
	}
	if((obj.Zone.length < options.Zone.min) || (obj.Zone.length > options.Zone.max)){
		message['Zone'] = util.format(language["Message_Invalid_Zone"], options.Zone.min, options.Zone.max);
	}
	if((obj.Description.length < options.Description.min) || (obj.Description.length > options.Description.max)){
		message['Description'] = util.format(language["Message_Invalid_Description"], options.Description.min, options.Description.max);
	}
	if(Object.keys(message).length==0)	
		return false;
	return message;	
}

let validate = {
	validateSave,
	options,
};
module.exports = {validate};
