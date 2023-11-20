const clean = require('xss-clean/lib/xss').clean;
const collection = "categories";//use this parameter to check permissions: save, select, delete.... 
const systemConfig = require(__path_configs + 'system');
const name_Cookie_Language = 'language_' + collection.toLowerCase();
const MainModel = require(__path_models + collection);
const {validate}  	= require(__path_validates + collection);
const {validateRequest}  	= require(__path_validates + 'validates');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');
const NotifyHelpers = require(__path_helpers + 'notify');
const linkIndex = systemConfig.prefixAdmin + '/' + collection + '/';
const pageTitleIndex = 'Categories List Management';
const folderView = __path_views_backend + collection + '/';
const FileHelpers = require(__path_helpers + 'file');
const uploadFile = FileHelpers.upload('Thumbnail', collection);// Thumbnail: control file name in HTML. categories is folder in folder public 
const uploadFolder = 'public/uploads/' + collection + '/';
const pageTitleAdd = pageTitleIndex + ' - Add';
const pageTitleEdit = pageTitleIndex + ' - Edit';
module.exports = {
	indexString: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		//await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		const catalogue = [];
		let categorieList = await MainModel.listItemForDropdown(userLogin);
		catalogue.push(categorieList);
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

	index: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		//await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let language 	= await publicFunction.getLanguageRequest(req, name_Cookie_Language);
		const catalogue = [];
		let categorieList = await MainModel.listItemForDropdown();
		catalogue.push(categorieList);		
		MainModel.listItems(params, userLogin).then((items) => {
			if((!items) || (items.length < 1)){
				params.pagination.totalItems = 0;	
				res.render(`${folderView}list`, {
					pageTitle: pageTitleIndex,
					items,				
					params,
					language,
					catalogue: categorieList,					
				});
			}
			else{				
				params.pagination.totalItems = items[0].TotalRecord;
				res.render(`${folderView}list`, {
					pageTitle: pageTitleIndex,					
					items,
					params,
					language,
					catalogue: categorieList,
				});
			}
			
		});
	},

	// end index =================================================================================================
	getAll: async function (req, res, next) {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let params = await ParamsHelpers.createPagination(item);
		await MainModel.listItems(params, {}, item).then((data) => {
			if((!data) || (data.length < 1))return res.status(200).json({success : true, data : "Empty data"})
			else{
				params.pagination["totalItems"] = data[0].TotalRecord;							
				res.status(200).json({
					success : true,
					data,
					params,
					item
				});
			}
		});		
	},

	// end index =================================================================================================

	searchGet: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		//await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		let item = {
			Name: await ParamsHelpers.getParam(req.query, 'Name', ''),
			Slug: await ParamsHelpers.getParam(req.query, 'Slug', ''),
			Thumbnail: await ParamsHelpers.getParam(req.query, 'Thumbnail', ''),
			ViewType: await ParamsHelpers.getParam(req.query, 'ViewType', ''),
			Description: await ParamsHelpers.getParam(req.query, 'Description', ''),
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
			});
		});
	},

	// end searchGet =================================================================================================

	// save: async function (req, res, next) {
	// 	// let userLogin = publicFunction.getUserLogin(req, res);
	// 	// let result = await SysPermissionModel.save(userLogin, collection);
	// 	// if (result.success == false) {
	// 	// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
	// 	// }
	// 	let err = await validateReq(req, res, next);
	// 	if (!err) {
	// 		req.body = JSON.parse(JSON.stringify(req.body));
	// 		let item = Object.assign(req.body);
	// 		item = clean(item);
	// 		await MainModel.saveInsert(item, req.user).then((result) => {
	// 			res.status(result.status).send({ status: result.status, success: result.success, data: result })
	// 		});
	// 	}
	// },
	
	save: async function(req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let language 	= await publicFunction.getLanguageRequest(req, name_Cookie_Language);
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
			let errors = await validate.validateSave(item, language);
			if (errors != false) {
				if (req.file != undefined)
					FileHelpers.remove(uploadFolder, req.file.filename); // delete the picture when the form is not valid
				let params = await ParamsHelpers.createParam(req);
				//let languageString = await publicFunction.getLanguage(collection + ".ini");
				let languageString = JSON.stringify(language);
				await MainModel.listItems(params, req.user).then(async (items) => {
					if (items.length > 0)
						params.pagination.totalItems = items[0].TotalRecord;
					else params.pagination.totalItems = 0;
					let itemString = JSON.stringify(items);
					let paramsString = JSON.stringify(params);

					const catalogue = [];
					let categorieList = await MainModel.listItemForDropdown(userLogin);
					catalogue.push(categorieList);
					let catalogueString = JSON.stringify(catalogue);

					res.render(`${folderView}list`, {
						pageTitle: pageTitleIndex,
						itemString,
						item: {},
						params: paramsString,
						language: languageString,
						catalogue: catalogueString,					
						errors: errors,
					});
				});
			}
			else {
				if (req.file == undefined) { // do not post files
					item.Thumbnail = item.Thumbnail_old;
				} else {
					item.Thumbnail = req.file.filename;
					if (taskCurrent == "edit")
						FileHelpers.remove(uploadFolder, item.Thumbnail_old);
				}
				if(item.Id == "") {
					await MainModel.saveInsert(item, req.user).then((data) => {
						if (data === 'false') {						
							notify["notifyContent"] = language.Message_AddNewError;
							notify["classnotify"] = 'danger';
						}							
						else{
							notify["notifyContent"] = language.Message_AddNewSuccess;
						}					
						//NotifyHelpers.showMessage(req, res, 'back', notify);
						// if (data === 'false') task = taskCurrent + '-' + data;
						// NotifyHelpers.show(req, res, 'back', { task: taskCurrent });
					});
				}
				else {
					await MainModel.saveUpdate(item, req.user).then((data) => {
						if (data.success == false) {						
							notify["notifyContent"] = language.Message_UpdateError;
							notify["classnotify"] = 'danger';
						}							
						else{
							notify["notifyContent"] = language.Message_UpdateSuccess;
						}					
						//NotifyHelpers.showMessage(req, res, 'back', notify);
						// if (data === 'false') task = taskCurrent + '-' + data;
						// NotifyHelpers.show(req, res, 'back', { task: taskCurrent });
					});
				}
				NotifyHelpers.showMessage(req, res, 'back', notify);
			}
		});
	},

	saveA: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		let result = await SysPermissionModel.save(userLogin, collection);
		if (result.success == false) {
			return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		}


		uploadThumb(req, res, async (errUpload) => {
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

			let errors = await validate.validateSave(item, language);
			if (errors != false) {
				if (req.file != undefined)
					FileHelpers.remove(uploadFolder, req.file.filename); // delete the picture when the form is not valid

				let params = await ParamsHelpers.createParam(req);
				let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
				await MainModel.listItems(params, userLogin).then(async (items) => {
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
					});
				});
			}
			else {
				if (req.file == undefined) { // do not repost files
					item.Thumbnail = item.Thumbnail_old;
				} else {
					item.Thumbnail = req.file.filename;
					if (taskCurrent == "edit")
						FileHelpers.remove(uploadFolder, item.Thumbnail_old);
				}
				if (item.Id == "") {
					await MainModel.saveInsert(item, userLogin).then((result) => {
						if (result === 'false') task = taskCurrent + '-' + result;
						NotifyHelpers.show(req, res, linkIndex, { task: taskCurrent });
					});
				}
				else {
					await MainModel.saveUpdate(item, userLogin).then((result) => {
						if (result === 'false') task = taskCurrent + '-' + result;
						NotifyHelpers.show(req, res, linkIndex, { task: taskCurrent });
					});
				}
			}
		});
	},
	//end save =================================================================================================

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
