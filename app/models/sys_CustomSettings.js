var moment = require('moment');
const dbConnection = require(__path_helpers + 'utils-mssql');
const FileHelpers = require(__path_helpers + 'file');
const publicFunction	= require(__path_helpers + 'publicFunction');
const MainSchemas = require(__path_schemas + 'sys_CustomSettings');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog');
const systemConfig = require(__path_configs + 'system');
const uploadFolder = 'public/uploads/Sys_CustomSettings/';
const functionBranch = 'Sys_CustomSettings';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin) {
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		Image: item.Image,
		UseCKEditor: item.UseCKEditor,
		Value: item.Value,
		DefaultValue: item.DefaultValue,
		Location: item.Location,
		StartTime: item.StartTime,
		EndTime: item.EndTime,
		Description: item.Description,
		Status: item.Status,
		Ordering: item.Ordering,
		IsSystem: item.IsSystem,
	}
	if (item.KeySettings == '') {
		data["User_Id_Created"] = userLogin.UsersId;
		data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		data["KeySettings"] = item.KeySettings;
		let result = await dbConnection.addAnything(MainSchemas.schemas, data);
		let status = 201;
		if (result != true) status = 406;
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.KeySettings, data, userLogin);
		return {
			success: result,
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
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.KeySettings);
		if (item_Old) {
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.KeySettings);
			let status = 200;
			let success = true;
			if (result != true) {
				status = 406;
				success = false;
			}
			data["KeySettings"] = item.KeySettings;
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.KeySettings, data, userLogin);
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
		Image: item.Image,
		UseCKEditor: item.UseCKEditor,
		Value: publicFunction.decodeSpecialCharacters(item.Value),
		DefaultValue: publicFunction.decodeSpecialCharacters(item.DefaultValue),		
		Location: item.Location,
		StartTime: item.StartTime,
		EndTime: item.EndTime,
		Description: item.Description,
		Status: item.Status,
		Ordering: item.Ordering,
		IsSystem: item.IsSystem,
	}
	data["User_Id_Created"] = userLogin.UsersId;
	data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	data["KeySettings"] = item.KeySettings;
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);
	let status = 201;
	if (result != true) status = 406;
	await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.KeySettings, data, userLogin);
	return {
		success: result,
		status: status,
		action: 'insert',
		data: data,
		message: result
	};
}


async function saveUpdate(item, userLogin) {
	let data = {
		Image: item.Image,
		UseCKEditor: item.UseCKEditor,
		Value: publicFunction.decodeSpecialCharacters(item.Value),
		DefaultValue: publicFunction.decodeSpecialCharacters(item.DefaultValue),
		Location: item.Location,
		StartTime: item.StartTime,
		EndTime: item.EndTime,
		Description: item.Description,
		Status: item.Status,
		Ordering: item.Ordering,
		IsSystem: item.IsSystem,
	}
	data["User_Id_Modified"] = userLogin.UsersId;
	data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.KeySettings);
	if (item_Old) {
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.KeySettings);
		let status = 200;
		let success = true;
		if (result != true) {
			status = 406;
			success = false;
		}
		data["KeySettings"] = item.KeySettings;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.KeySettings, data, userLogin);
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

async function deleteById(KeySettings, userLogin = null) {
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, KeySettings);
	let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.Image);
	if (rerultDeleteFile) {
		await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.KeySettings, item_Old, userLogin);
		return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, KeySettings);
	}
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
				let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.Image);
				if (rerultDeleteFile) {
					await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.KeySettings, item_Old, userLogin);
					resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
				}
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
	let where = " WHERE (A.KeySettings != '') ";
	if (options != null) {		
		if (options.Value != "") {
			dataParams.Value = "%" + options.Value + "%";
			where += " and (A.Value like @Value) ";
		}
		if (options.DefaultValue != "") {
			dataParams.DefaultValue = "%" + options.DefaultValue + "%";
			where += " and (A.DefaultValue like @DefaultValue) ";
		}
		if ((options.Location != "")&&(options.Location != "novalue")&&(options.Location != undefined)) {
			dataParams.Location = "%" + options.Location + "%";
			where += " and (A.Location like @Location) ";
		}
		if (options.Description != "") {
			dataParams.Description = "%" + options.Description + "%";
			where += " and (A.Description like @Description) ";
		}
	}
	let sql = `  SELECT A.KeySettings, A.Image, A.UseCKEditor, A.Value, A.DefaultValue, A.Location, A.StartTime, A.EndTime, A.Description, A.Status, A.Ordering, A.IsSystem, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_CustomSettings A    ${where}
			ORDER BY A.KeySettings DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function search(params, userLogin, options = null) {
	let dataParams = {};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (A.KeySettings != '') ";
	if (options != null) {		
		if (options.Value != "") {
			dataParams.Value = "%" + options.Value + "%";
			where += " and (A.Value like @Value) ";
		}
		if (options.DefaultValue != "") {
			dataParams.DefaultValue = "%" + options.DefaultValue + "%";
			where += " and (A.DefaultValue like @DefaultValue) ";
		}
		if ((options.Location != "")&&(options.Location != "novalue")&&(options.Location != undefined)) {
			dataParams.Location = "%" + options.Location + "%";
			where += " and (A.Location like @Location) ";
		}
		if (options.Description != "") {
			dataParams.Description = "%" + options.Description + "%";
			where += " and (A.Description like @Description) ";
		}
	}
	let sql = `  SELECT A.KeySettings, A.Image, A.UseCKEditor, A.Value, A.DefaultValue, A.Location, A.StartTime, A.EndTime, A.Description, A.Status, A.Ordering, A.IsSystem, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_CustomSettings A    ${where}
			ORDER BY A.KeySettings DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function getById(KeySettings, userLogin = null) {
	return await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, KeySettings);
}


async function listItemForDropdown() {
	let sql = ` SELECT KeySettings, Image, UseCKEditor, Value, DefaultValue, Location, StartTime, EndTime, Description, Status, Ordering, IsSystem
			FROM Sys_CustomSettings  `;
	return await dbConnection.selectQueryRecordset(sql);
}

async function exportData(item, userLogin) {
	let dataParams = {};
	let sql = ` SELECT * FROM Sys_CustomSettings `;
	let result = await dbConnection.selectQueryRecordset(sql);
	return result;

}
// === Frontend =================================

async function listItemsFrontend(){
	let sql = ` SELECT KeySettings as id, Image as image_setting, Value as value_setting, Location as location, Status as status, Ordering as ordering
			FROM Sys_CustomSettings where Status = 1 order by Ordering `;
	return  await dbConnection.selectQueryRecordset(sql);
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
	exportData,
	listItemsFrontend
};
