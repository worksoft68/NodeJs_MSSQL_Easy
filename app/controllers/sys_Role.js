const clean = require('xss-clean/lib/xss').clean;
const collection = "sys_Role";
const name_Cookie_Language = 'language_' + collection.toLowerCase();
const systemConfig = require(__path_configs + 'system');
const MainModel = require(__path_models + collection);
const {validate}  	= require(__path_validates + collection);
const {validateRequest}  	= require(__path_validates + 'validates');
const MainValidate = require(__path_validates + collection);
const Sys_Role_PermissionModel = require(__path_models + 'sys_Role_Permission');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');
const linkIndex = systemConfig.prefixAdmin + '/' + collection + '/';
const pageTitleIndex = 'Role List Management';
const folderView = __path_views_backend + collection + '/';

module.exports = {
	index: async function (req, res, next) {
		// let userLogin = publicFunction.getUserLogin(req, res);
		// await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		const catalogue = [];
		let functionList = await MainModel.listItemFunction();
		catalogue.push(functionList);
		let catalogueString = JSON.stringify(catalogue);
		MainModel.listItems(params).then((items) => {
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
		// let userLogin = publicFunction.getUserLogin(req, res);
		// await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
		let params = await ParamsHelpers.createParam(req);
		let languageString 	= JSON.stringify(await publicFunction.getLanguageRequest(req, name_Cookie_Language));
		let item = {
			Name: await ParamsHelpers.getParam(req.query, 'Name', ''),
		};
		item = clean(item);
		MainModel.search(params, item).then((items) => {
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

	save: async function (req, res, next) {
		// let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.save(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		let error = await validateRequest.validateReq(req,res, name_Cookie_Language,validate.options);
		if(error){
			return res.status(400).json({status:400, success : true, error : error});
		}
		else {
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			await MainModel.saveInsert(item, req.user).then((result) => {
				res.status(result.status).send({ status: result.status, success: result.success, data: result })
			});
		}
	},
	// end save =================================================================================================

	update: async function (req, res, next) {
		// let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.save(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		let error = await validateRequest.validateReq(req,res, name_Cookie_Language,validate.options);
		if(error){
			return res.status(400).json({status:400, success : true, error : error});
		}
		else {
			req.body = JSON.parse(JSON.stringify(req.body));
			let item = Object.assign(req.body);
			item = clean(item);
			await MainModel.saveUpdate(item, req.user).then((result) => {
				return res.status(result.status).json({ status: result.status, success: result.success, data: result })
			});
		}
	},
	// end update =================================================================================================

	getById: async function (req, res, next) {
		// let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.getData(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		let id = ParamsHelpers.getParam(req.params, 'id', '');
		await MainModel.getById(id, req.user).then(async (result) => {
			let rolePermission = await Sys_Role_PermissionModel.listItemsByRole(id);

			res.status(200).json({
				'success': true,
				'data': result,
				rolePermission
			});
		});
	},
	// end getById =================================================================================================
	search: async function (req, res, next) {
		// let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.getData(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		let params = await ParamsHelpers.createPagination(item);
		await MainModel.search(params,  item).then((result) => {
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
		// let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.deleteItem(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.deleteById(item.Id, req.user).then((result) => {
			res.status(200).json({
				'success': result
			});
		});
	},
	// end deleteById =================================================================================================

	deleteList: async function (req, res, next) {
		// let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.deleteItem(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.deleteList(item, req.user).then((result) => {
			res.status(200).json({
				result
			});
		});
	},
	// end deleteList =================================================================================================

	exportData: async function (req, res, next) {
		// let userLogin = publicFunction.getUserLogin(req, res);
		// let result = await SysPermissionModel.getData(userLogin, collection);
		// if (result.success == false) {
		// 	return res.status(result.status).send({ status: result.status, success: result.success, data: result });
		// }
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		item = clean(item);
		await MainModel.exportData(item, req.user).then((result) => {
			res.status(200).json({
				result
			});
		});
	},
	// end exportData =================================================================================================
};

const validateReq = async (req, res, next) => {
	let err = await MainValidate.validator(req);
	if (Object.keys(err).length > 0) {
		return res.status(400).json({ status: 400, success: true, error: err })
	}
	return false;
}
