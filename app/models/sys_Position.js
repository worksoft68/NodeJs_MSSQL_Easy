//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 2:17 PM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mssql');
const MainSchemas	 = require(__path_schemas + 'sys_Position');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'Sys_Position';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin){ 
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if((permissionAccess.FullAuthority  != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		PositionName: item.PositionName,
		NumericalOrder: item.NumericalOrder,
		IsManager: item.IsManager,
		Status: item.Status,
	}
	if(item.PositionId == ''){
		data["User_Id_Created"]		= userLogin.UsersId; 
		data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
		data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["PositionId"] = item.id;
			status	= 201;
			success	= true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.PositionId, data, userLogin);
		return {
			success	: success,
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
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.PositionId);
		if(item_Old){
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.PositionId);
			let status = 200;
			let success = true;
			if(result != true){
				status = 406;
				success = false;
			}
			data["PositionId"] = item.PositionId;
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.PositionId, data, userLogin);
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
		PositionName: item.PositionName,
		NumericalOrder: item.NumericalOrder,
		IsManager: item.IsManager,
		Status: item.Status,
	}
	data["User_Id_Created"]		= userLogin.UsersId; 
	data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
	data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	if(item.PositionId == ''){
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["PositionId"] = item.id;
			status	= 201;
			success	= true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.PositionId, data, userLogin);
		return {
			success	: success,
			status	: status,
			action	: 'insert',
			data	: data,
			message	: result
		};
	}
}


async function saveUpdate(item, userLogin){ 
	let data = {
		PositionName: item.PositionName,
		NumericalOrder: item.NumericalOrder,
		IsManager: item.IsManager,
		Status: item.Status,
	}
	data["User_Id_Modified"]		= userLogin.UsersId; 
	data["User_Name_Modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
	data["DateTime_Modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.PositionId);
	if(item_Old){
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.PositionId);
		let status = 200;
		let success = true;
		if(result != true){
			status = 406;
			success = false;
		}
		data["PositionId"] = item.PositionId;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.PositionId, data, userLogin);
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

async function deleteById(PositionId, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, PositionId);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.PositionId, item_Old, userLogin);
	let arrParams = [
		{ "name": "PositionId", "value": PositionId, "type": "Int64" }
	];
	let sql = ` delete from Sys_Position 
		where (PositionId like @PositionId) `;
	return  await dbConnection.deleteObject(sql, arrParams);
//	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,PositionId);
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
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.PositionId, item_Old, userLogin);
					let arrParams = [
						{ "name": "PositionId", "value": listId[i], "type": "Int64" }
					];
					let sql = ` delete from Sys_Position 
						where (PositionId like @PositionId) `;
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
	let sort = " A.PositionId DESC ";
	if(options != null) {
		if((options.PositionName != "") && (options.PositionName != undefined)){
			dataParams.PositionName = "%" + options.PositionName + "%";
			where += " and (A.PositionName like @PositionName) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.PositionId, A.PositionName, A.NumericalOrder, A.IsManager, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_Position A    ${where}
			ORDER BY ${sort}
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

async function getById( PositionId, userLogin = null){
	let dataParams = {
		PositionId : PositionId,
	};
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, PositionId);
	let sql = ` SELECT A.PositionId, A.PositionName, A.NumericalOrder, A.IsManager, A.Status, 
		A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
		FROM Sys_Position as A
		where (A.PositionId = @PositionId) `; 
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);
}


async function listItemForDropdown(){
	 let sql = ` SELECT PositionId, PositionName, NumericalOrder, IsManager, Status
			FROM Sys_Position  `;
	return  await dbConnection.selectQueryRecordset(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where  = "";
		if((options.PositionName != "") && (options.PositionName != undefined)){
			dataParams.PositionName = "%" + options.PositionName + "%";
			where += " and (A.PositionName like @PositionName) ";
		}
	let sql = ` SELECT A.PositionId, A.PositionName, A.NumericalOrder, A.IsManager, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			 FROM Sys_Position A  where (1 = 1)`; 
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
