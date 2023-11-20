var moment = require('moment');
const dbConnection = require(__path_helpers + 'utils-mssql');
const MainSchemas = require(__path_schemas + 'sys_Permission');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog');
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'Sys_Permission';//use this parameter to check permissions: save, select, delete.... 
const folderView = __path_views_backend + 'login/';
const layoutBlog = __path_views_blog + 'frontend';


async function saveItem_(item, userLogin) {
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		UserId: item.UserId,
		Functions: item.Functions,
		FullAuthority: item.FullAuthority,
		Addnew: item.Addnew,
		Updates: item.Updates,
		ReadOnly: item.ReadOnly,
		FullOfYourself: item.FullOfYourself,
		Permission1: item.Permission1,
		Permission2: item.Permission2,
		Permission3: item.Permission3,
		Permission4: item.Permission4,
		Permission5: item.Permission5,
		Permission6: item.Permission6,
		Permission7: item.Permission7,
		Permission8: item.Permission8,
		Permission9: item.Permission9,
		Permission10: item.Permission10,
	}
	if (item.PermissionId == '') {
		data["User_Id_Created"] = userLogin.UsersId;
		data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if (result) {
			let recordset = result.recordset;
			let item = recordset[0];
			data["PermissionId"] = item.id;
			status = 201;
			success = true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.PermissionId, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'insert',
			data: data,
			message: result
		};
	}
	else {
		data["User_Id_Modified"] = userLogin.UsersId;
		data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.PermissionId);
		if (item_Old) {
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.PermissionId);
			let status = 200;
			let success = true;
			if (result != true) {
				status = 406;
				success = false;
			}
			data["PermissionId"] = item.PermissionId;
			LogModel.saveLog("Update", MainSchemas.schemas.table, data.PermissionId, data, userLogin);
			return {
				success: success,
				status: status,
				action: 'update',
				data: data,
				message: result
			};
		}
		else {
			return {
				success: false,
				status: 410,
				action: 'update',
				data: data,
				message: 'Not found data'
			};
		}
	}
}


async function saveInsert(item, userLogin) {
	let data = {
		UserId: item.UserId,
		Functions: item.Functions,
		FullAuthority: item.FullAuthority,
		Addnew: item.Addnew,
		Updates: item.Updates,
		ReadOnly: item.ReadOnly,
		FullOfYourself: item.FullOfYourself,
		Permission1: item.Permission1,
		Permission2: item.Permission2,
		Permission3: item.Permission3,
		Permission4: item.Permission4,
		Permission5: item.Permission5,
		Permission6: item.Permission6,
		Permission7: item.Permission7,
		Permission8: item.Permission8,
		Permission9: item.Permission9,
		Permission10: item.Permission10,
	}

	data["User_Id_Created"] = userLogin.UsersId;
	data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	if (item.PermissionId == '') {
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if (result) {
			let recordset = result.recordset;
			let item = recordset[0];
			data["PermissionId"] = item.id;
			status = 201;
			success = true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.PermissionId, data, userLogin);

		return {
			success: success,
			status: status,
			action: 'insert',
			data: data,
			message: result
		};
	}
}

//grant access to this account the same as other accounts
async function rightsLikeUser(item, userLogin) {
	try {
		let list = await getByUserId(item.UserIdLike);
		let n = list.length;
		let addSuccess = [];
		let addError = [];
		for (let i = 0; i < n; i++) {
			let itemAdd = list[i];
			let OldId = itemAdd.PermissionId;
			itemAdd.UserId = item.UserId;
			let sql = ` SELECT PermissionId FROM Sys_Permission
						where (Functions = N'${itemAdd.Functions}') and (UserId = ${itemAdd.UserId})  `;
			let results = await dbConnection.selectQueryRecordset(sql);
			if (results.length > 0) {
				let result = results[0];
				itemAdd.PermissionId = result.PermissionId;
				let resultOne = await saveUpdate(itemAdd, userLogin)
				if (resultOne.success == true) {
					addSuccess.push(OldId);
				}
				else {
					addError.push(OldId);
				}
			} else {
				itemAdd.PermissionId = '';
				let resultOne = await saveInsert(itemAdd, userLogin)
				if (resultOne.success == true) {
					addSuccess.push(OldId);
				}
				else {
					addError.push(OldId);
				}
			}
		}
		return {
			success: true,
			addSuccess,
			addError,
			message: 'true'
		};
	}
	catch (err) { }
	return {
		success: false,
		message: 'Error! Rights like user fail'
	};
}

async function getByUserId(userId) {
	let dataParams = {};
	let sql = "select  * from Sys_Permission  where (UserId like @UserId ) ";
	dataParams.UserId = userId;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}


async function saveUpdate(item, userLogin) {
	let data = {
		UserId: item.UserId,
		Functions: item.Functions,
		FullAuthority: item.FullAuthority,
		Addnew: item.Addnew,
		Updates: item.Updates,
		ReadOnly: item.ReadOnly,
		FullOfYourself: item.FullOfYourself,
		Permission1: item.Permission1,
		Permission2: item.Permission2,
		Permission3: item.Permission3,
		Permission4: item.Permission4,
		Permission5: item.Permission5,
		Permission6: item.Permission6,
		Permission7: item.Permission7,
		Permission8: item.Permission8,
		Permission9: item.Permission9,
		Permission10: item.Permission10,
	}
	data["User_Id_Modified"] = userLogin.UsersId;
	data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.PermissionId);
	if (item_Old) {
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.PermissionId);
		let status = 200;
		let success = true;
		if (result != true) {
			status = 406;
			success = false;
		}
		data["PermissionId"] = item.PermissionId;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.PermissionId, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'update',
			data: data,
			message: result
		};
	}
	else {
		return {
			success: false,
			status: 410,
			action: 'update',
			data: data,
			message: 'Not found data'
		};
	}
}

async function deleteById(PermissionId, userLogin = null) {
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, PermissionId);
	LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.PermissionId, item_Old, userLogin);
	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, PermissionId);
}

async function deleteList(arrayId, userLogin = null) {
	try {
		let listId = arrayId["arrayId[]"];
		let lengthListId = listId.length;
		let deleteSuccess = [];
		let deleteError = [];
		for (let i = 0; i < lengthListId; i++) {
			let resultOne = 'fales';
			try {
				let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, listId[i]);
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.PermissionId, item_Old, userLogin);
				resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
			}
			catch (error) { }
			if (resultOne == 'true') {
				deleteSuccess.push(listId[i]);
			}
			else {
				deleteError.push(listId[i]);
			}
		}
		return {
			success: true,
			deleteSuccess,
			deleteError,
			message: 'true'
		};
	}
	catch (error) { }
	return {
		success: false,
		message: 'Error! Delete fail'
	};
}

async function listItems(params, userLogin, options = null) {
	let dataParams = {};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (PermissionId != 0) ";
	if (options != null) {
		if (options.Functions != "") {
			dataParams.Functions = "%" + options.Functions + "%";
			where += " and (A.Functions like @Functions) ";
		}
		if (item.UserId != "0") {
			dataParams.UserId = item.UserId;
			where += " and (A.UserId like @UserId) ";
		}
	}
	let sql = `  SELECT A.PermissionId,  A.UserId, (C.LastName + ' '+ C.FirstName) as FullName, A.Functions, B.Description, A.FullAuthority, A.Addnew, A.Updates, A.ReadOnly, A.FullOfYourself, A.Permission1, A.Permission2, A.Permission3, A.Permission4, A.Permission5, A.Permission6, A.Permission7, A.Permission8, A.Permission9, A.Permission10, A.DateUpdate, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_Permission A inner join Sys_User C on A.UserId = C.UsersId inner join Sys_FunctionForPermission B on A.Functions = B.FunctionName    ${where}
			ORDER BY PermissionId DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;

	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function search(params, userLogin, options = null) {

	let dataParams = {};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;

	let sql = "select top " + params.pagination.totalItemsPerPage + " * from(" +
		" SELECT A.PermissionId,  A.UserId, (C.LastName + ' '+ C.FirstName) as FullName, A.Functions, B.Description, A.FullAuthority, A.Addnew, A.Updates, A.ReadOnly, A.FullOfYourself, A.Permission1, A.Permission2, A.Permission3, A.Permission4, A.Permission5, A.Permission6, A.Permission7, A.Permission8, A.Permission9, A.Permission10, A.DateUpdate, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified " +
		", ROW_NUMBER() over(order by PermissionId desc) as RowNumber, COUNT(*) OVER() as TotalRecord " +
		" FROM Sys_Permission A inner join Sys_User C on A.UserId = C.UsersId inner join Sys_FunctionForPermission B on A.Functions = B.FunctionName  where (PermissionId > 0 ) ";
	if (options.Functions != "") {
		dataParams.Functions = "%" + options.Functions + "%";
		sql += " and (Functions like @Functions) ";
	}
	if ((options.UserId != "0") && (options.UserId != "")) {
		dataParams.UserId = options.UserId;
		sql += " and (A.UserId like @UserId) ";
	}
	sql += ") mainTable where RowNumber > " + skip + " ";
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function getById(PermissionId, userLogin = null) {
	let sql = ` SELECT A.PermissionId,  A.UserId, (C.LastName + ' '+ C.FirstName) as FullName, A.Functions, B.Description, A.FullAuthority, A.Addnew, A.Updates, A.ReadOnly, A.FullOfYourself, A.Permission1, A.Permission2, A.Permission3, A.Permission4, A.Permission5, A.Permission6, A.Permission7, A.Permission8, A.Permission9, A.Permission10, A.DateUpdate, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified
				FROM Sys_Permission A
				inner join Sys_User C on A.UserId = C.UsersId inner join Sys_FunctionForPermission B on A.Functions = B.FunctionName 
				where A.PermissionId = ${PermissionId} `;
	let results = await dbConnection.selectQueryRecordset(sql);
	let result = results[0];
	return result;
}


async function listItemForDropdown() {
	let sql = ` SELECT PermissionId, UserId, Functions, FullAuthority, Addnew, Updates, ReadOnly, FullOfYourself, Permission1, Permission2, Permission3, Permission4, Permission5, Permission6, Permission7, Permission8, Permission9, Permission10
			FROM Sys_Permission  `;
	return await dbConnection.selectQueryRecordset(sql);
}

async function exportData(item, userLogin) {
	let dataParams = {};
	let where = "";
	where = " WHERE (PermissionId != 0) ";
	if (item.Functions != "") {
		dataParams.Functions = "%" + item.Functions + "%";
		where += " and (A.Functions like @Functions) ";
	}
	if ((item.UserId != "0") && (item.UserId != "")) {
		dataParams.UserId = item.UserId;
		where += " and (A.UserId like @UserId) ";
	}

	let sql = ` SELECT A.PermissionId,  A.UserId, (C.LastName + ' '+ C.FirstName) as FullName, A.Functions, B.Description, A.FullAuthority, A.Addnew, A.Updates, A.ReadOnly, A.FullOfYourself, A.Permission1, A.Permission2, A.Permission3, A.Permission4, A.Permission5, A.Permission6, A.Permission7, A.Permission8, A.Permission9, A.Permission10, A.DateUpdate, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
	
	FROM Sys_Permission A inner join Sys_User C on A.UserId = C.UsersId inner join Sys_FunctionForPermission B on A.Functions = B.FunctionName    ${where}
		
	ORDER BY A.PermissionId DESC
`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function getPermissionByFunction(idUser, functionName) {
	let sql = " select * from Sys_Permission where  (UserId = " + idUser + ") and (Functions like N'" + functionName + "') ";
	let recordsets = await dbConnection.selectQueryRecordset(sql);
	if (recordsets.length > 0) {
		return recordsets[0];
	}
	return { status: "false" };
}

async function getRolePermissionByFunction(idUser, functionName) {
	let sql = " select distinct ur.Id as IdUR , ur.UsersId, ur.IdRole, rp.* from Sys_User_Role ur inner join Sys_Role_Permission rp on ur.IdRole = rp.RoleId where (ur.UsersId like " + idUser + ") and (rp.Functions like '" + functionName + "') ";
	let recordsets = await dbConnection.selectQueryRecordset(sql);
	if (recordsets.length > 0) {
		return recordsets[0];
	}
	return { status: "false" };
}

async function checkPermissionAccess(idUser, functionName, res) {
	let permissionAccess = await checkPermissionAccessInPermission(idUser, functionName);
	let roleAccess = await checkRoleAccess(idUser, functionName);
	if ((permissionAccess != true) && (roleAccess != true)) {

		res.render(`${folderView}no-permission`, { pageTitle: 'No Permission ', top_post: false });
		// res.redirect('./');
		// res.render(`${folderView}no-permission`, { layout: false,  top_post: false});
	}
}

async function checkPermissionAccessInPermission(idUser, functionBranch) {
	let permissionAccess = await getPermissionByFunction(idUser, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true) && (permissionAccess.ReadOnly != true)) {
		return false;
	}
	return true;
}

async function checkRoleAccess(idUser, functionBranch) {
	let permissionAccess = await getRolePermissionByFunction(idUser, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true) && (permissionAccess.ReadOnly != true)) {
		return false;
	}
	return true;

}


//Check permission is allowed to save?
//There are 2 ways to assign permissions. In the Sys_Permission table and the Sys_Role_Permission table
async function save(userLogin, functionBranch) {
	let savePermission = await chekSavePermission(userLogin, functionBranch);
	let saveRole = await checkSaveRole(userLogin, functionBranch);

	if ((savePermission != true) && (saveRole != true)) {
		return {
			success: false,
			status: 405,
			action: 'save',
			data: '',
			message: 'You dont have permission to save'
		};
	}
	return true;
}

//Check permissions save in table Sys_Permission
async function chekSavePermission(userLogin, functionBranch) {
	let permissionAccess = await getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority == true) || (permissionAccess.Addnew == true) || (permissionAccess.FullOfYourself == true)) {
		return true;
	}
	return false;
}

//Check permissions save in role, tabe Sys_Role_Permission
async function checkSaveRole(userLogin, functionBranch) {
	let permissionAccess = await getRolePermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority == true) || (permissionAccess.Addnew == true) || (permissionAccess.FullOfYourself == true)) {
		return true;
	}
	return false;
}

//Check permission is allowed to get data?
//There are 2 ways to assign permissions. In the Sys_Permission table and the Sys_Role_Permission table
async function getData(userLogin, functionBranch) {
	let getDataPermission = await chekGetDataPermission(userLogin, functionBranch);
	let getDataRole = await chekGetDataRole(userLogin, functionBranch);
	if ((getDataPermission != true) && (getDataRole != true)) {
		return {
			success: false,
			status: 405,
			action: 'getDataById',
			data: '',
			message: 'You have no permission get data'
		};
	}
	return true;
}
//Check permissions get data  in table Sys_Permission
async function chekGetDataPermission(userLogin, functionBranch) {
	let permissionAccess = await getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority == true) || (permissionAccess.FullOfYourself == true) || (permissionAccess.ReadOnly == true)) {
		return true;
	}
	return false;
}
//Check permissions get data in role, tabe Sys_Role_Permission
async function chekGetDataRole(userLogin, functionBranch) {
	let permissionAccess = await getRolePermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority == true) || (permissionAccess.FullOfYourself == true) || (permissionAccess.ReadOnly == true)) {
		return true;
	}
	return false;
}

//Check permission is allowed to get delete?
//There are 2 ways to assign permissions. In the Sys_Permission table and the Sys_Role_Permission table
async function deleteItem(userLogin, functionBranch) {
	let deleteItemPermission = await checkDeleteItemPermission(userLogin, functionBranch);
	let deleteItemRole = await checkDeleteItemRole(userLogin, functionBranch);

	if ((deleteItemPermission != true) && (deleteItemRole != true)) {
		return {
			success: false,
			status: 405,
			action: 'delete',
			data: '',
			message: 'You have no permission delete'
		};
	}
	return true;
}
//Check permissions delete data in table Sys_Permission
async function checkDeleteItemPermission(userLogin, functionBranch) {
	let permissionAccess = await getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.ReadOnly == true))
		return false;// no Permission 
	if ((permissionAccess.FullAuthority == true) || (permissionAccess.FullOfYourself == true)) {
		return true;
	}
	return false;//// no Permission 
}
//Check permissions delete data in role, tabe Sys_Role_Permission
async function checkDeleteItemRole(userLogin, functionBranch) {
	let permissionAccess = await getRolePermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.ReadOnly == true))
		return false;// no Permission 
	if ((permissionAccess.FullAuthority == true) || (permissionAccess.FullOfYourself == true)) {
		return true;
	}
	return false;//// no Permission 
}


module.exports = {
	saveItem_,
	saveInsert,
	rightsLikeUser,
	saveUpdate,
	deleteById,
	deleteList,
	listItems,
	search,
	getById,
	getByUserId,
	listItemForDropdown,
	exportData,

	getPermissionByFunction,
	getRolePermissionByFunction,
	checkPermissionAccess,
	save,
	chekSavePermission,
	checkSaveRole,
	getData,
	chekGetDataPermission,
	chekGetDataRole,
	deleteItem,
	checkDeleteItemPermission,
	checkDeleteItemRole

};
