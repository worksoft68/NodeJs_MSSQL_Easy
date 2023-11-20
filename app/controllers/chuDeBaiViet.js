const clean = require('xss-clean/lib/xss').clean;
const collection = "chuDeBaiViet";//use this parameter to check permissions: save, select, delete.... 
const MainModel = require(__path_models + collection);
const MainValidate  = require(__path_validates + collection);
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');
const systemConfig = require(__path_configs + 'system');
const linkIndex = systemConfig.prefixAdmin + '/' + collection + '/';
const NotifyHelpers = require(__path_helpers + 'notify');
const FileHelpers = require(__path_helpers + 'file');
const uploadFile = FileHelpers.upload('Image', collection);// Image: control file name in HTML. chuDeBaiViet is folder in folder public 
const uploadFolder = 'public/uploads/' + collection + '/';
const pageTitleIndex = 'ChuDeBaiViet Management';
const folderView = __path_views_backend + collection + '/';

module.exports = {
	//indexString function is similar to the indexJson above, but the return data is string, not json
	indexString: async function(req, res, next) {
		let params 			= await ParamsHelpers.createParam(req);
		let languageString 	= await publicFunction.getLanguage(collection+".ini");
		MainModel.listItems(params, req.user).then(async(items) => {
			if((!items) || (items.length < 1) || (items.status == 'error'))
				params.pagination.totalItems = 0;
			else params.pagination.totalItems = items[0].TotalRecord;
			let itemString = JSON.stringify(items);
			let paramsString = JSON.stringify(params);
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				itemString,
				item:{},
				params : paramsString,
				language: languageString,
			});
		});
	},

// end indexString =================================================================================================
	//indexJson function is similar to the indexString above, but the return data is json, not string
	indexJson: async function(req, res, next) {
		let params 		= await ParamsHelpers.createParam(req);
		let language 	= await publicFunction.getLanguageJson(collection+".ini");
		MainModel.listItems(params, req.user).then(async(data) => {
			if((!data) || (data.length < 1)){
				params.pagination.totalItems = 0;
				return res.status(200).json({
					success : true,
					pageTitle: pageTitleIndex,
					data: "Empty data",
					params,
					language,
				});
			}
			else{
				params.pagination["totalItems"] = data[0].TotalRecord;
				return res.status(200).json({
					success : true,
					pageTitle: pageTitleIndex,
					data,
					params,
					language,
				});
			}
		});
	},

// end indexJson =================================================================================================
// Post params get data, This function is similar to the Search function
	getAll: async function(req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let params = await ParamsHelpers.createPagination(item);
		await MainModel.listItems(params, req.user, item).then(async(data) => {
			if((!data) || (data.length < 1)) {
				params.pagination["totalItems"] = 0;
				return res.status(200).json({
					success : true,
					data: "Empty data",
					params,
				});
			}
			else {
				params.pagination["totalItems"] = data[0].TotalRecord;
				return res.status(200).json({
					success : true,
					data,
					params,
				});
			}
		});
	},
// // end getAll ================================================================================================= =================================================================================================

	searchGet: async function(req, res, next){
		let params 			= await ParamsHelpers.createParam(req);
		let languageString 	= await publicFunction.getLanguage(collection+".ini");
		let item = {
			Name : await ParamsHelpers.getParam(req.query, 'Name', ''),
			Image : await ParamsHelpers.getParam(req.query, 'Image', ''),
			Slug : await ParamsHelpers.getParam(req.query, 'Slug', ''),
			Description : await ParamsHelpers.getParam(req.query, 'Description', ''),
		};
		item = clean(item);
		MainModel.listItems(params, req.user, item).then(async(items) => {
			if(items.length>0){
				params.pagination.totalItems = items[0].TotalRecord;
			}
			else params.pagination.totalItems = 0;
			let itemString = JSON.stringify(items);
			let paramsString = JSON.stringify(params);
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				itemString,
				item,
				params : paramsString,
				language: languageString,
			});
		});
	},

// end searchGet =================================================================================================

	searchGetJson: async function(req, res, next){
		let params 		= await ParamsHelpers.createParam(req);
		let language 	= await publicFunction.getLanguageJson(collection+".ini");
		let item = {
			Name : await ParamsHelpers.getParam(req.query, 'Name', ''),
			Image : await ParamsHelpers.getParam(req.query, 'Image', ''),
			Slug : await ParamsHelpers.getParam(req.query, 'Slug', ''),
			Description : await ParamsHelpers.getParam(req.query, 'Description', ''),
		};
		item = clean(item);
		MainModel.listItems(params, req.user, item).then(async(items) => {
			if((!items) || (items.length < 1)){
				params.pagination.totalItems = 0;
				items = "Empty data";
			}
			else {
				params.pagination.totalItems = items[0].TotalRecord;
			}
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				items,
				params,
				language,
			});
		});
	},

// end searchGet =================================================================================================

	save: async function(req, res, next) {
		let userLogin	= publicFunction.getUserLogin(req, res);
		let language = await publicFunction.getLanguageJson(collection + '.ini');
		let notify = {classnotify:'success'};
		uploadFile(req, res, async (errUpload) => {
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			if ((item.ShowHomePage == 'on') || (item.ShowHomePage == 'yes') || (item.ShowHomePage == 'true') || (item.ShowHomePage == '1'))
				item.ShowHomePage = true;
			else item.ShowHomePage = false;
			if ((item.Status == 'on') || (item.Status == 'yes') || (item.Status == 'true') || (item.Status == '1'))
				item.Status = true;
			else item.Status = false;
			let taskCurrent = (typeof item !== "undefined" && item.Id != "") ? "edit" : "add";
			let errors = await validateReq(req, res, next);
			if (errors) {
				if (req.file != undefined)
					FileHelpers.remove(uploadFolder, req.file.filename); // delete the picture when the form is not valid
				let params = await ParamsHelpers.createParam(req);
				let languageString = JSON.stringify(language);
				await MainModel.listItems(params, req.user).then(async (items) => {
					if (items.length > 0){
						params.pagination.totalItems = items[0].TotalRecord;
		
					}
					else params.pagination.totalItems = 0;
					let itemString = JSON.stringify(items);
					let paramsString = JSON.stringify(params);
					res.render(`${folderView}list`, {
						pageTitle: pageTitleIndex,
						itemString,
						item: {},
						params: paramsString,
						language: languageString,
						errors,
					});
				});
			}
			else {
				if (req.file == undefined) { // do not post files
					item.Image = item.Image_old;
				} else {
					item.Image = req.file.filename;
					if (taskCurrent == "edit")
						FileHelpers.remove(uploadFolder, item.Image_old);
				}
				if(item.Id == "") {
					await MainModel.saveInsert(item, req.user).then((data) => {
						if (data === 'false') {
							notify["notifyContent"] = language.Message_AddNewError;
							notify["classnotify"] = 'danger';
						}
						else {
							notify["notifyContent"] = language.Message_AddNewSuccess;
						}
					});
				}
				else {
					await MainModel.saveUpdate(item, req.user).then((data) => {
						if (data === 'false') {
							notify["notifyContent"] = language.Message_UpdateError;
							notify["classnotify"] = 'danger';
						}
						else {
							notify["notifyContent"] = language.Message_UpdateSuccess;
						}
					});
				}
				NotifyHelpers.showMessage(req, res, 'back', notify);
			}
		});
	},


	update: async function(req, res, next){
		let err = await validateReq(req,res, next);
		if(!err){
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			await MainModel.saveUpdate(item, req.user).then((data) => {
				return res.status(data.status).json({status: data.status, success : data.success, data})
			});
		}
	},
// end update =================================================================================================

	getById: async function(req, res, next){
		let id = ParamsHelpers.getParam(req.params, 'id', ''); 
		await MainModel.getById(id, req.user ).then((data) => {
			if(data){
				res.status(200).json({
					"success" : true,
					data
				});
			}
			else{
				res.status(200).json({
					"success"	: true,
					data: "Empty data"
				});
			}
		});
	},
// end getById =================================================================================================
	search: async function(req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let params = await ParamsHelpers.createPagination(item);
		await MainModel.listItems(params, req.user, item).then(async(data) => {
			if((!data) || (data.length < 1)) {
				params.pagination["totalItems"] = 0;
				res.status(200).json({
					success : true,	
					data: "Empty data",
					params,
				});
			}
			else {
				params.pagination["totalItems"] = data[0].TotalRecord;
				res.status(200).json({
					success : true,	
					data,
					params,
				});
			}
		});
	},
// end search =================================================================================================

deleteById: async function(req, res, next) {
	try{
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.deleteById(item.Id, req.user).then((result) => {
			res.status(200).json({
				'success': result
			});
		});
	}
	catch(err){
		console.log(err);
		res.status(200).json({
			'success': false
		});
	}
	},
// end deleteById =================================================================================================

	deleteList: async function(req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let listId = item["arrayId[]"];
		let isArray =  Array.isArray(listId);
		if(isArray == false){
			let listIdNew = [listId];
			item["arrayId[]"] = listIdNew;
		}
		await MainModel.deleteList(item, req.user).then((data) => {
			res.status(200).json({
				data
			});
		});
	},
// end deleteList =================================================================================================

	exportData: async function(req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.exportData(item, req.user).then((data) => {
			return res.status(200).json({
				success : true,
				data
			});
		});
	},
// end exportData =================================================================================================
};

const validateReq = async (req,res,next) => {
		let err = await MainValidate.validator(req);
		if(Object.keys(err).length > 0){
			return err;
		}
		return false;
}
