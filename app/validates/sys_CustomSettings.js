//**************************************************************************************************************************
//     Creation time: Saturday, 27 May 2023 1:37 PM
//     Creator: 
//**************************************************************************************************************************
const util = require('util');

const options = {
	KeySettings: { min: 1, max: 50 },
	UseCKEditor: { min: 1, max: 255 },
	Value: { min: 1, max: 1000 },
	DefaultValue: { min: 1, max: 1000 },
	Location: { min: 1, max: 50 },
	StartTime: { min: 1, max: 255 },
	EndTime: { min: 1, max: 255 },
	Status: { min: 1, max: 255 },
	IsSystem: { min: 1, max: 255 },
}

let validateSave = (obj, language) => {	
	let message = {};
	if((obj.KeySettings.length < options.KeySettings.min) || (obj.KeySettings.length > options.KeySettings.max)){
		message['KeySettings'] = util.format(language['Message_Invalid_KeySettings'], options.KeySettings.min, options.KeySettings.max);
	}
	if((obj.Value.length < options.Value.min) || (obj.Value.length > options.Value.max)){
		message['Value'] = util.format(language['Message_Invalid_Value'], options.Value.min, options.Value.max);
	}
	if((obj.DefaultValue.length < options.DefaultValue.min) || (obj.DefaultValue.length > options.DefaultValue.max)){
		message['DefaultValue'] = util.format(language['Message_Invalid_DefaultValue'], options.DefaultValue.min, options.DefaultValue.max);
	}
	if((obj.Location.length < options.Location.min) || (obj.Location.length > options.Location.max)){
		message['Location'] = util.format(language['Message_Invalid_Location'], options.Location.min, options.Location.max);
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
