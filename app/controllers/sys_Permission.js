const clean = require('xss-clean/lib/xss').clean;
const collection = "sys_Permission";//use this parameter to check permissions: save, select, delete.... 
const name_Cookie_Language = 'language_' + collection.toLowerCase();
const systemConfig = require(__path_configs + 'system');
const MainModel = require(__path_models + collection);
const {validate}  	= require(__path_validates + collection);
const {validateRequest}  	= require(__path_validates + 'validates');
const Sys_RoleModel = require(__path_models + 'sys_Role');

const Sys_UserModel = require(__path_models + 'sys_User');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');
const linkIndex = systemConfig.prefixAdmin + '/' + collection + '/';
const pageTitleIndex = 'Permission List Management';
const folderView = __path_views_backend + collection + '/';

module.exports = {
	index: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		//await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		const catalogue = [];
		let functionList = await Sys_RoleModel.listItemFunction();
		catalogue.push(functionList);
		sys_user = await Sys_UserModel.listItemForDropdown();
		catalogue.push(sys_user);
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
		//await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		const catalogue = [];

		let functionList = await Sys_RoleModel.listItemFunction();
		catalogue.push(functionList);
		sys_user = await Sys_UserModel.listItemForDropdown();
		catalogue.push(sys_user);

		let catalogueString = JSON.stringify(catalogue);
		let item = {
			Functions: await ParamsHelpers.getParam(req.query, 'Functions', ''),
			UserId: await ParamsHelpers.getParam(req.query, 'UserId', ''),
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
		// let result = await SysPermissionModel.save(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		let error = await validateRequest.validateReq(req,res, name_Cookie_Language,validate.options);
		if(error){
			return res.status(400).json({status:400, success : true, error : error});
		}
		else{
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			await MainModel.saveInsert(item, userLogin).then((result) => {
				res.status(result.status).send({ status: result.status, success: result.success, data: result })
			});
		}
	},
	// end save =================================================================================================

	//grant access to this account the same as other accounts
	rightsLikeUser: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.save(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.rightsLikeUser(item, userLogin).then((result) => {
			res.status(200).json({
				result
			});
			//res.status(result.status).send({ status: result.status, success: result.success, data: result })
		});
	},
	// end rightsLikeUser =================================================================================================

	update: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.save(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		let error = await validateRequest.validateReq(req,res, name_Cookie_Language,validate.options);
		if(error){
			return res.status(400).json({status:400, success : true, error : error});
		}
		else{
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			await MainModel.saveUpdate(item, userLogin).then((result) => {
				return res.status(result.status).json({ status: result.status, success: result.success, data: result })
			});
		}
	},
	// end update =================================================================================================

	getById: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.getData(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
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
		// let result = await SysPermissionModel.getData(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let params = await ParamsHelpers.createPagination(item);
		await MainModel.search(params, userLogin, item).then((result) => {
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
		// let result = await SysPermissionModel.deleteItem(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.deleteById(item.PermissionId, userLogin).then((result) => {
			res.status(200).json({
				'success': result
			});
		});
	},
	// end deleteById =================================================================================================

	deleteList: async function (req, res, next) {
		let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.deleteItem(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
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
		// let result = await SysPermissionModel.getData(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
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


