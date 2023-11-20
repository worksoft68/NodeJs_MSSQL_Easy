const dbConnection = require(__path_helpers + 'utils-mssql');
const MainSchemas = require(__path_schemas + 'sys_Role');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog');
const systemConfig = require(__path_configs + 'system');
var moment = require('moment');
const functionBranch = 'Sys_Role';

async function saveItem_(item, userLogin) {
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		Name: item.Name,
		NumericalOrder: item.NumericalOrder,
		Status: item.Status,
	}
	if (item.Id == '') {
		data["User_Id_Created"] = userLogin.UsersId;
		data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if (result) {
			let recordset = result.recordset;
			let item = recordset[0];
			data["Id"] = item.id;
			status = 201;
			success = true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.Id, data, userLogin);
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
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.Id);
		if (item_Old) {
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.Id);
			let status = 200;
			let success = true;
			if (result != true) {
				status = 406;
				success = false;
			}
			data["Id"] = item.Id;
			LogModel.saveLog("Update", MainSchemas.schemas.table, data.Id, data, userLogin);
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


async function saveInsert(item, userLogin = null) {
	let data = {
		Name: item.Name,
		NumericalOrder: item.NumericalOrder,
		Status: item.Status,
	}
	data["User_Id_Created"] = userLogin.UsersId;
	data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
	// data["DateTime_Created"] = 'NULL';
	data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	if (item.Id == '') {
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if (result) {
			let recordset = result.recordset;
			let item = recordset[0];
			data["Id"] = item.id;
			status = 201;
			success = true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.Id, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'insert',
			data: data,
			message: result
		};
	}
}


async function saveUpdate(item, userLogin = null) {
	let data = {
		Name: item.Name,
		NumericalOrder: item.NumericalOrder,
		Status: item.Status,
	}
	data["User_Id_Modified"] = userLogin.UsersId;
	data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
	//	data["DateTime_Modified"] = NULL;
	data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.Id);
	if (item_Old) {
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.Id);
		let status = 200;
		let success = true;
		if (result != true) {
			status = 406;
			success = false;
		}
		data["Id"] = item.Id;
		LogModel.saveLog("Update", MainSchemas.schemas.table, data.Id, data, userLogin);
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

async function deleteById(Id, userLogin = null) {
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, Id);
	LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, Id);
}

async function deleteList(arrayId, userLogin = null) {
	try {
		// let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
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
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
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

async function listItems(params, options = null) {
	let dataParams = {};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (Id != 0) ";
	if (options != null) {
		if (options.Name != "") {
			dataParams.Name = "%" + options.Name + "%";
			where += " and (Name like @Name) ";
		}
	}
	let sql = `  SELECT A.Id, A.Name, A.NumericalOrder, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_Role A    ${where}
			ORDER BY Id DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function search(params,  options = null) {
	let dataParams = {};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let sql = "select top " + params.pagination.totalItemsPerPage + " * from(" +
		" SELECT A.Id, A.Name, A.NumericalOrder, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified " +
		", ROW_NUMBER() over(order by Id desc) as RowNumber, COUNT(*) OVER() as TotalRecord " +
		" FROM Sys_Role A  where (Id > 0 )";
	if (options.Name != "") {
		dataParams.Name = "%" + options.Name + "%";
		sql += " and (Name like @Name) ";
	}
	sql += ") mainTable where RowNumber > " + skip + " ";
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function getById(Id, userLogin = null) {
	return await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, Id);
}


async function listItemForDropdown() {
	let sql = ` SELECT Id, Name
			FROM Sys_Role  where Status = 'true' order by Name asc`;
	return await dbConnection.selectQueryRecordset(sql);
}

async function listItemFunction() {
	// let sql = ` SELECT FunctionName as IdFunction , Description as FunctionName
	// 		FROM Sys_FunctionForPermission  where Status = 'true' order by FunctionName asc`;
	let sql = ` SELECT FunctionName, Description as Description
			FROM Sys_FunctionForPermission  where Status = 'true' order by FunctionName asc`;

	return await dbConnection.selectQueryRecordset(sql);
}


async function exportData(item, userLogin) {
	let dataParams = {};
	let where = "";
	where = " WHERE (Id != 0) ";
	if (item.Name != "") {
		dataParams.Name = "%" + item.Name + "%";
		where += " and (Name like @Name) ";
	}
	let sql = ` SELECT Id, Name, NumericalOrder, Status, User_Id_Created, User_Name_Created, DateTime_Created, User_Id_Modified, User_Name_Modified, DateTime_Modified 
			FROM Sys_Role   ${where}
			ORDER BY Id DESC`;
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
	listItemForDropdown,
	listItemFunction,
	exportData
};
