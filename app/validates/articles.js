//**************************************************************************************************************************
//     Creation time: Thursday, 25 May 2023 3:39 PM
//     Creator: 
//**************************************************************************************************************************
const util = require('util');

const options = {
	CategorieId: { min: 1, max: 4294967295 },
	Title: { min: 3, max: 150 },
	Slug: { min: 3, max: 150 },
	Summary: { min: 0, max: 1000 },
	ContentArticles: { min: 0, max: 99999999 },
}

let validateSave = (obj, language) => {	
	let message = {};
	// if (typeof obj.CategorieId !== 'number'){
	// 	message['CategorieId'] = util.format(language['Message_Invalid_CategorieId'], options.CategorieId.min, options.CategorieId.max);
	// }
	if((obj.CategorieId < options.CategorieId.min) || (obj.CategorieId > options.CategorieId.max)){
		message['CategorieId'] = util.format(language['Message_Invalid_CategorieId'], options.CategorieId.min, options.CategorieId.max);
	}
	if((obj.Title.length < options.Title.min) || (obj.Title.length > options.Title.max)){
		message['Title'] = util.format(language['Message_Invalid_Title'], options.Title.min, options.Title.max);
	}
	if((obj.Slug.length < options.Slug.min) || (obj.Slug.length > options.Slug.max)){
		message['Slug'] = util.format(language['Message_Invalid_Slug'], options.Slug.min, options.Slug.max);
	}
	if((obj.Summary.length < options.Summary.min) || (obj.Summary.length > options.Summary.max)){
		message['Summary'] = util.format(language['Message_Invalid_Summary'], options.Summary.min, options.Summary.max);
	}
	if((obj.ContentArticles.length < options.ContentArticles.min) || (obj.ContentArticles.length > options.ContentArticles.max)){
		message['ContentArticles'] = util.format(language['Message_Invalid_ContentArticles'], options.ContentArticles.min, options.ContentArticles.max);
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
