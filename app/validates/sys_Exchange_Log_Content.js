//**************************************************************************************************************************
//     Creation time: Saturday, 27 May 2023 9:13 AM
//     Creator: 
//**************************************************************************************************************************
const util = require('util');

const options = {
	LogSubjectId: { min: -2147483648, max: 4294967295 },
	Title: { min: 5, max: 150 },
	Content_Exchange: { min: 10, max: 1000 },
}

let validateSave = (obj, language) => {	
	let message = {};
	//if (typeof obj.LogSubjectId !== 'number'){
		//message['LogSubjectId'] = util.format(language['Message_Invalid_LogSubjectId'], options.LogSubjectId.min, options.LogSubjectId.max);
	//}
	if((obj.LogSubjectId < options.LogSubjectId.min) || (obj.LogSubjectId > options.LogSubjectId.max)){
		message['LogSubjectId'] = util.format(language['Message_Invalid_LogSubjectId']);
	}
	if((obj.Title.length < options.Title.min) || (obj.Title.length > options.Title.max)){
		message['Title'] = util.format(language['Message_Invalid_Title'], options.Title.min, options.Title.max);
	}
	if((obj.Content_Exchange.length < options.Content_Exchange.min) || (obj.Content_Exchange.length > options.Content_Exchange.max)){
		message['Content_Exchange'] = util.format(language['Message_Invalid_Content_Exchange'], options.Content_Exchange.min, options.Content_Exchange.max);
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
