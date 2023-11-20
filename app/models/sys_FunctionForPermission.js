//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 10:45 AM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mssql');
const MainSchemas	 = require(__path_schemas + 'sys_FunctionForPermission');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'Sys_FunctionForPermission';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin){ 
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if((permissionAccess.FullAuthority  != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		Description: item.Description,
		Note: item.Note,
		ModuleSystem: item.ModuleSystem,
		Status: item.Status,
	}
	if(item.FunctionName == ''){
		data["User_Id_Created"]		= userLogin.UsersId; 
		data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
		data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	data["FunctionName"] = item.FunctionName;
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);
	let status	= 201;
	if(result != true) status = 406;
	await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.FunctionName, data, userLogin);
	return {
		success	: result,
		status	: status,
		action	: 'insert',
		data	: data,
		message	: result
	};
	}
	else{
		data["User_Id_Modified"]		= userLogin.UsersId; 
		data["User_Name_Modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
		data["DateTime_Modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.FunctionName);
		if(item_Old){
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.FunctionName);
			let status = 200;
			let success = true;
			if(result != true){
				status = 406;
				success = false;
			}
			data["FunctionName"] = item.FunctionName;
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.FunctionName, data, userLogin);
			return {
				success	: success,
				status	: status,
				action	: 'update',
				data	: data,
				message	: result
			};
		}
		else{
			return {
				success	: false,
				status	: 410,
				action	: 'update',
				data	: data,
				message	: 'Not found data'
			};
		}
	}
}


async function saveInsert(item, userLogin){ 
	let data = {
		Description: item.Description,
		Note: item.Note,
		ModuleSystem: item.ModuleSystem,
		Status: item.Status,
	}
	data["User_Id_Created"]		= userLogin.UsersId; 
	data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
	data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	data["FunctionName"] = item.FunctionName;
	let result = await dbConnection.addAnything(MainSchemas.schemas, data);
	let status	= 201;
	if(result != true) status = 406;
	await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.FunctionName, data, userLogin);
	return {
		success	: result,
		status	: status,
		action	: 'insert',
		data	: data,
		message	: result
	};
}


async function saveUpdate(item, userLogin){ 
	let data = {
		Description: item.Description,
		Note: item.Note,
		ModuleSystem: item.ModuleSystem,
		Status: item.Status,
	}
	data["User_Id_Modified"]		= userLogin.UsersId; 
	data["User_Name_Modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
	data["DateTime_Modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.FunctionName);
	if(item_Old){
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.FunctionName);
		let status = 200;
		let success = true;
		if(result != true){
			status = 406;
			success = false;
		}
		data["FunctionName"] = item.FunctionName;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.FunctionName, data, userLogin);
		return {
			success	: success,
			status	: status,
			action	: 'update',
			data	: data,
			message	: result
		};
	}
	else{
		return {
			success	: false,
			status	: 410,
			action	: 'update',
			data	: data,
			message	: 'Not found data'
		};
	}
}

async function deleteById(FunctionName, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, FunctionName);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.FunctionName, item_Old, userLogin);
	let arrParams = [
		{ "name": "FunctionName", "value": FunctionName, "type": "string" }
	];
	let sql = ` delete from Sys_FunctionForPermission 
		where (FunctionName like @FunctionName) `;
	return  await dbConnection.deleteObject(sql, arrParams);
//	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,FunctionName);
}

async function deleteList(arrayId, userLogin = null){
	try{
		let listId 			= arrayId["arrayId[]"];
		let isArray 		= Array.isArray(listId);
		if(isArray == false)
			listId = listId.split(",");
		let lengthListId 	= listId.length;
		let deleteSuccess 	= [];
		let deleteError 	= [];
		for(let i=0; i < lengthListId; i++){
			let resultOne = 'fales';
			try {
				let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, listId[i]);
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.FunctionName, item_Old, userLogin);
					let arrParams = [
						{ "name": "FunctionName", "value": listId[i], "type": "string" }
					];
					let sql = ` delete from Sys_FunctionForPermission 
						where (FunctionName like @FunctionName) `;
					resultOne =  await dbConnection.deleteObject(sql, arrParams);
//					resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
			}
			catch(error){}
			if(resultOne == true){
				deleteSuccess.push(listId[i]);
			}
			else {
				deleteError.push(listId[i]);
			}
		}
		return {
			success	: true,
			deleteSuccess,
			deleteError,
			message	: 'true'
		};
	}
	catch(error){}
	return {
		success	: false,
		message	: 'Error! Delete fail'
	};
}

async function listItems(params, userLogin, options = null){
	let dataParams = { };
	let skip = (params.pagination.currentPage-1) * params.pagination.totalItemsPerPage;
	let where  = " WHERE (1 = 1) ";
	let sort = " A.FunctionName DESC ";
	if(options != null) {
		if((options.Description != "") && (options.Description != undefined)){
			dataParams.Description = "%" + options.Description + "%";
			where += " and (A.Description like @Description) ";
		}
		if((options.Note != "") && (options.Note != undefined)){
			dataParams.Note = "%" + options.Note + "%";
			where += " and (A.Note like @Note) ";
		}
		if((options.ModuleSystem != "") && (options.ModuleSystem != undefined)){
			dataParams.ModuleSystem = "%" + options.ModuleSystem + "%";
			where += " and (A.ModuleSystem like @ModuleSystem) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.FunctionName, A.Description, A.Note, A.ModuleSystem, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_FunctionForPermission A    ${where}
			ORDER BY ${sort}
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

async function getById( FunctionName, userLogin = null){
	let dataParams = {
		FunctionName : FunctionName,
	};
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, FunctionName);
	let sql = ` SELECT A.FunctionName, A.Description, A.Note, A.ModuleSystem, A.Status, 
		A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
		FROM Sys_FunctionForPermission as A
		where (A.FunctionName = @FunctionName) `; 
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);
}


async function listItemForDropdown(){
	 let sql = ` SELECT FunctionName, Description, Note, ModuleSystem, Status
			FROM Sys_FunctionForPermission  `;
	return  await dbConnection.selectQueryRecordset(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where  = "";
		if((options.Description != "") && (options.Description != undefined)){
			dataParams.Description = "%" + options.Description + "%";
			where += " and (A.Description like @Description) ";
		}
		if((options.Note != "") && (options.Note != undefined)){
			dataParams.Note = "%" + options.Note + "%";
			where += " and (A.Note like @Note) ";
		}
		if((options.ModuleSystem != "") && (options.ModuleSystem != undefined)){
			dataParams.ModuleSystem = "%" + options.ModuleSystem + "%";
			where += " and (A.ModuleSystem like @ModuleSystem) ";
		}
	let sql = ` SELECT A.FunctionName, A.Description, A.Note, A.ModuleSystem, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			 FROM Sys_FunctionForPermission A  where (1 = 1)`; 
		sql += where; 
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

module.exports = {
	saveItem_,
	saveInsert,
	saveUpdate,
	deleteById,
	deleteList,
	listItems,
	listItems,
	getById,
	listItemForDropdown,
	exportData,
};
