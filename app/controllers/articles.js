const clean = require('xss-clean/lib/xss').clean;
const collection = "articles";//use this parameter to check permissions: save, select, delete.... 
const systemConfig = require(__path_configs + 'system');
const name_Cookie_Language = 'language_' + collection.toLowerCase();
const MainModel = require(__path_models + collection);
const CategoriesModel = require(__path_models + 'categories');
const {validate}  	= require(__path_validates + collection);
const {validateRequest}  	= require(__path_validates + 'validates');

const SysPermissionModel = require(__path_models + 'sys_Permission');
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');

const NotifyHelpers = require(__path_helpers + 'notify');
const FileHelpers = require(__path_helpers + 'file');
const uploadFile = FileHelpers.upload('Thumb', collection);// Thumb: control file name in HTML. articles is folder in folder public 
const uploadFolder = 'public/uploads/' + collection + '/';

const linkIndex = systemConfig.prefixAdmin + '/' + collection + '/';
const pageTitleIndex = 'Articles List Management';
const folderView = __path_views_backend + collection + '/';
const pageTitleAdd = pageTitleIndex + ' - Add';
const pageTitleEdit = pageTitleIndex + ' - Edit';

module.exports = {
	index: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		//await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		const catalogue = [];
		categories = await CategoriesModel.listItemForDropdown(userLogin);
		catalogue.push(categories);
		let catalogueString = JSON.stringify(catalogue);
		MainModel.listItems(params, userLogin).then((items) => {
			if (items.length > 0)
				params.pagination.totalItems = items[0].TotalRecord;
			else params.pagination.totalItems = 0;
			let itemString = JSON.stringify(items);
			let paramsString = JSON.stringify(params);
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				itemString,
				item: {},
				params: paramsString,
				language: languageString,
				catalogue: catalogueString,
			});
		});
	},

	// end index =================================================================================================

	searchGet: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		//SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let languageString = await publicFunction.getLanguage(collection + ".ini");
		const catalogue = [];
		categories = await CategoriesModel.listItemForDropdown(userLogin);
		catalogue.push(categories);
		let catalogueString = JSON.stringify(catalogue);
		let item = {
			Title: await ParamsHelpers.getParam(req.query, 'Title', ''),
			Slug: await ParamsHelpers.getParam(req.query, 'Slug', ''),
			Thumb: await ParamsHelpers.getParam(req.query, 'Thumb', ''),
			Summary: await ParamsHelpers.getParam(req.query, 'Summary', ''),
			ContentArticles: await ParamsHelpers.getParam(req.query, 'ContentArticles', ''),
		};
		item = clean(item);
		MainModel.search(params, userLogin, item).then((items) => {
			if (items.length > 0)
				params.pagination.totalItems = items[0].TotalRecord;
			else params.pagination.totalItems = 0;
			let itemString = JSON.stringify(items);
			let paramsString = JSON.stringify(params);
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				itemString,
				item,
				params: paramsString,
				language: languageString,
				catalogue: catalogueString,
			});
		});
	},

	// end searchGet =================================================================================================
	save: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let language = await publicFunction.getLanguageJson(collection + ".ini");
		//let result = await SysPermissionModel.save(userLogin, collection);
		let notify = {classnotify:'success'};
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }


		uploadFile(req, res, async (errUpload) => {
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			//item = clean(item);
			if ((item.Special == 'on') || (item.Special == 'yes') || (item.Special == 'true') || (item.Special == '1'))
				item.Special = true;
			else item.Special = false;

			if ((item.Status == 'on') || (item.Status == 'yes') || (item.Status == 'true') || (item.Status == '1'))
				item.Status = true;
			else item.Status = false;

			let taskCurrent = (typeof item !== "undefined" && item.Id != "") ? "edit" : "add";

			let errors = await validate.validateSave(item, language);
			if (errors != false) {
				if (req.file != undefined)
					FileHelpers.remove(uploadFolder, req.file.filename); // delete the picture when the form is not valid

				let params = await ParamsHelpers.createParam(req);
				//let languageString = await publicFunction.getLanguage(collection + ".ini");
				await MainModel.listItems(params, userLogin).then(async (items) => {
					if (items.length > 0)
						params.pagination.totalItems = items[0].TotalRecord;
					else params.pagination.totalItems = 0;
					let itemString = JSON.stringify(items);
					let paramsString = JSON.stringify(params);
					let languageString = JSON.stringify(language);
					const catalogue = [];
					categories = await CategoriesModel.listItemForDropdown(userLogin);
					catalogue.push(categories);
					let catalogueString = JSON.stringify(catalogue);
					res.render(`${folderView}list`, {
						pageTitle: pageTitleIndex,
						itemString,
						item: {},
						params: paramsString,
						language: languageString,
						catalogue: catalogueString,					
						errors,
					});
				});
			}
			else {
				if (req.file == undefined) { // do not post files
					item.Thumb = item.Thumb_old;
				} else {
					item.Thumb = req.file.filename;
					if (taskCurrent == "edit")
						FileHelpers.remove(uploadFolder, item.Thumb_old);
				}
				if (item.Id == "") {
					await MainModel.saveInsert(item, userLogin).then((result) => {
						//console.log(result);
						if (result === 'false') {						
							notify["notifyContent"] = language.Message_AddNewError;
							notify["classnotify"] = 'danger';
						}							
						else{
							notify["notifyContent"] = language.Message_AddNewSuccess;
						}
						//if (result === 'false') task = taskCurrent + '-' + result;
						// NotifyHelpers.show(req, res, linkIndex, { task: taskCurrent });
						// NotifyHelpers.show(req, res, 'back', { task: taskCurrent });
					});
				}
				else {
					await MainModel.saveUpdate(item, userLogin).then((result) => {
						console.log(result);
						if (result === 'false') {						
							notify["notifyContent"] = language.Message_UpdateError;
							notify["classnotify"] = 'danger';
						}							
						else{
							notify["notifyContent"] = language.Message_UpdateSuccess;
						}
						// if (result === 'false') task = taskCurrent + '-' + result;
						// NotifyHelpers.show(req, res, 'back', { task: taskCurrent });
						//NotifyHelpers.show(req, res, linkIndex, { task: taskCurrent });
					});
				}
				NotifyHelpers.showMessage(req, res, 'back', notify);
			}
		});
	},

	// save: async function(req, res, next) {
	// 	let userLogin	= publicFunction.getUserLogin(req, res);	
	// 	let result 		= await SysPermissionModel.save(userLogin, collection);
	// 	if(result.success == false){
	// 		return res.status(result.status).send({status:result.status, success : result.success, data : result});	
	// 	}
	// 	let err = await validateReq(req,res, next);
	// 	if(!err){
	// 		req.body = JSON.parse(JSON.stringify(req.body));
	// 		let item = Object.assign(req.body);
	// 		item = clean(item);
	// 		await MainModel.saveInsert(item, userLogin).then((result) => {
	// 			res.status(result.status).send({status:result.status, success : result.success, data : result})	
	// 		});
	// 	}
	// },
	// end save =================================================================================================

	update: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let result = await SysPermissionModel.save(userLogin, collection);
		if (result.success == false) {
			return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		}
		let error = await validate.validateSave(item, language);
		if (error == false) {
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			await MainModel.saveUpdate(item, userLogin).then((result) => {
				return res.status(result.status).json({ status: result.status, success: result.success, data: result })
			});
		}
		else{
			return res.status(400).json({status:400, success : true, error : error});
		}
	},
	// end update =================================================================================================

	getById: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let result = await SysPermissionModel.getData(userLogin, collection);
		if (result.success == false) {
			return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		}
		let id = ParamsHelpers.getParam(req.params, 'id', '');
		await MainModel.getById(id, userLogin).then((result) => {
			res.status(200).json({
				'success': true,
				'data': result
			});
		});
	},
	// end getById =================================================================================================
	search: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let result = await SysPermissionModel.getData(userLogin, collection);
		if (result.success == false) {
			return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		}
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let params = await ParamsHelpers.createPagination(item);
		await MainModel.listItems(params, userLogin, item).then((result) => {
			if (result.length > 0) params.pagination["totalItems"] = result[0].TotalRecord;
			else params.pagination["totalItems"] = 0;
			res.status(200).json({
				result,
				params,
				item
			});
		});
	},
	// end search =================================================================================================

	deleteById: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let result = await SysPermissionModel.deleteItem(userLogin, collection);
		if (result.success == false) {
			return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		}
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.deleteById(item.Id, userLogin).then((result) => {
			res.status(200).json({
				'success': result
			});
		});
	},
	// end deleteById =================================================================================================

	deleteList: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let result = await SysPermissionModel.deleteItem(userLogin, collection);
		if (result.success == false) {
			return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		}
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.deleteList(item, userLogin).then((result) => {
			res.status(200).json({
				result
			});
		});
	},
	// end deleteList =================================================================================================

	exportData: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let result = await SysPermissionModel.getData(userLogin, collection);
		if (result.success == false) {
			return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		}
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.exportData(item, userLogin).then((result) => {
			res.status(200).json({
				result
			});
		});
	},
	// end exportData =================================================================================================
};


