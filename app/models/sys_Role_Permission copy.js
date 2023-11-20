const dbConnection = require(__path_helpers + 'utils-mssql');
const MainSchemas = require(__path_schemas + 'sys_Role_Permission');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog');
const systemConfig = require(__path_configs + 'system');
var moment = require('moment');
const functionBranch = 'sys_Role';

async function saveItem_(item, userLogin) {
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.id, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
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
		Permission10: item.Permission10,
	}
	if (item.RolePermissionId == '') {
		data["User_Id_Created"] = userLogin.id;
		data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if (result) {
			let recordset = result.recordset;
			let item = recordset[0];
			data["RolePermissionId"] = item.id;
			status = 201;
			success = true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.RolePermissionId, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'insert',
			data: data,
			message: result
		};
	}
	else {
		data["User_Id_Modified"] = userLogin.id;
		data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.RolePermissionId);
		if (item_Old) {
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.RolePermissionId);
			let status = 200;
			let success = true;
			if (result != true) {
				status = 406;
				success = false;
			}
			data["RolePermissionId"] = item.RolePermissionId;
			LogModel.saveLog("Update", MainSchemas.schemas.table, data.RolePermissionId, data, userLogin);
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
		RoleId: item.RoleId,
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
		Permission10: item.Permission10,
	}
	data["User_Id_Created"] = userLogin.id;
	data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	if (item.RolePermissionId == '') {
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if (result) {
			let recordset = result.recordset;
			let item = recordset[0];
			data["RolePermissionId"] = item.id;
			status = 201;
			success = true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.RolePermissionId, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'insert',
			data: data,
			message: result
		};
	}
}


async function saveUpdate(item, userLogin) {
	let data = {
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
		Permission10: item.Permission10,
	}
	data["User_Id_Modified"] = userLogin.id;
	data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.RolePermissionId);
	if (item_Old) {
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.RolePermissionId);
		let status = 200;
		let success = true;
		if (result != true) {
			status = 406;
			success = false;
		}
		data["RolePermissionId"] = item.RolePermissionId;
		LogModel.saveLog("Update", MainSchemas.schemas.table, data.RolePermissionId, data, userLogin);
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

async function deleteById(RolePermissionId, userLogin = null) {
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, RolePermissionId);
	LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.RolePermissionId, item_Old, userLogin);
	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, RolePermissionId);
}

async function deleteList(arrayId, userLogin = null) {
	try {
		// let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.id, functionBranch);
		// if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		// 	return {
		// 		success: false,
		// 		message: 'You have no permission delete'
		// 	};
		// }
		let listId = arrayId["arrayId[]"];
		let lengthListId = listId.length;
		let deleteSuccess = [];
		let deleteError = [];
		for (let i = 0; i < lengthListId; i++) {
			let resultOne = 'fales';
			try {
				let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, listId[i]);
				LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.RolePermissionId, item_Old, userLogin);
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
	let where = " WHERE (RolePermissionId != 0) ";
	if (options != null) {
		if (options.Functions != "") {
			dataParams.Functions = "%" + options.Functions + "%";
			where += " and (Functions like @Functions) ";
		}
	}
	let sql = `  SELECT A.RolePermissionId, A.RoleId, A.Functions, A.FullAuthority, A.Addnew, A.Updates, A.ReadOnly, A.FullOfYourself, A.Permission1, A.Permission2, A.Permission3, A.Permission4, A.Permission5, A.Permission6, A.Permission7, A.Permission8, A.Permission9, A.Permission10, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_Role_Permission A    ${where}
			ORDER BY RolePermissionId DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function search(params, userLogin, options = null) {
	let dataParams = {};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let sql = "select top " + params.pagination.totalItemsPerPage + " * from(" +
		" SELECT A.RolePermissionId, A.RoleId, A.Functions, A.FullAuthority, A.Addnew, A.Updates, A.ReadOnly, A.FullOfYourself, A.Permission1, A.Permission2, A.Permission3, A.Permission4, A.Permission5, A.Permission6, A.Permission7, A.Permission8, A.Permission9, A.Permission10, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified " +
		", ROW_NUMBER() over(order by RolePermissionId desc) as RowNumber, COUNT(*) OVER() as TotalRecord " +
		" FROM Sys_Role_Permission A  where (RolePermissionId > 0 )";
	if (options.Functions != "") {
		dataParams.Functions = "%" + options.Functions + "%";
		sql += " and (Functions like @Functions) ";
	}
	sql += ") mainTable where RowNumber > " + skip + " ";
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function getById(RolePermissionId, userLogin = null) {
	let sql = ` SELECT A.RolePermissionId, A.RoleId, A.Functions, A.FullAuthority, A.Addnew, A.Updates, A.ReadOnly, A.FullOfYourself, A.Permission1, A.Permission2, A.Permission3, A.Permission4, A.Permission5, A.Permission6, A.Permission7, A.Permission8, A.Permission9, A.Permission10, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified
				FROM Sys_Role_Permission A
				
				where A.RolePermissionId = ${RolePermissionId} `;
	let results = await dbConnection.selectQueryRecordset(sql);
	let result = results[0];
	return result;
}

async function listItemsByRole(RoleId) {
	let sql = ` SELECT rp.RolePermissionId, rp.RoleId, rp.Functions, f.Description, rp.FullAuthority
	, rp.Addnew, rp.Updates, rp.ReadOnly, rp.FullOfYourself
	,Permission1, Permission2, Permission3, Permission4, Permission5
	, Permission6, Permission7, Permission8 ,Permission9, Permission10
	,rp.User_Name_Created, rp.DateTime_Created, rp.User_Name_Modified, rp.DateTime_Modified
	FROM Sys_Role_Permission rp left join Sys_FunctionForPermission f on rp.Functions = f.FunctionName 
	where rp.RoleId = @RoleId order by  rp.Functions asc
	`;
	let dataParams = {};
	dataParams.RoleId = RoleId;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function listItemForDropdown() {
	let sql = ` SELECT RolePermissionId, Functions, FullAuthority, Addnew, Updates, ReadOnly, FullOfYourself, Permission1, Permission2, Permission3, Permission4, Permission5, Permission6, Permission7, Permission8, Permission10
			FROM Sys_Role_Permission  `;
	return await dbConnection.selectQueryRecordset(sql);
}

async function exportData(item, userLogin) {
	let dataParams = {};
	let where = "";
	where = " WHERE (RolePermissionId != 0) ";
	if (item.Functions != "") {
		dataParams.Functions = "%" + item.Functions + "%";
		where += " and (Functions like @Functions) ";
	}
	let sql = ` SELECT RolePermissionId, RoleId, Functions, FullAuthority, Addnew, Updates, ReadOnly, FullOfYourself, Permission1, Permission2, Permission3, Permission4, Permission5, Permission6, Permission7, Permission8, Permission9, Permission10, User_Id_Created, User_Name_Created, DateTime_Created, User_Id_Modified, User_Name_Modified, DateTime_Modified 
			FROM Sys_Role_Permission   ${where}
			ORDER BY RolePermissionId DESC`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

module.exports = {
	saveItem_,
	saveInsert,
	saveUpdate,
	deleteById,
	deleteList,
	listItems,
	search,
	getById,
	listItemsByRole,
	listItemForDropdown,
	exportData
};
