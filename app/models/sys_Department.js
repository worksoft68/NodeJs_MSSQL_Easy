//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 2:20 PM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mssql');
const MainSchemas	 = require(__path_schemas + 'sys_Department');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'Sys_Department';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin){ 
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if((permissionAccess.FullAuthority  != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		CompanyId: item.CompanyId,
		DepartmentName: item.DepartmentName,
		Abbreviation: item.Abbreviation,
		NumericalOrder: item.NumericalOrder,
		Status: item.Status,
	}
	if(item.DepartmentId == ''){
		data["User_Id_Created"]		= userLogin.UsersId; 
		data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
		data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["DepartmentId"] = item.id;
			status	= 201;
			success	= true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.DepartmentId, data, userLogin);
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
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.DepartmentId);
		if(item_Old){
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.DepartmentId);
			let status = 200;
			let success = true;
			if(result != true){
				status = 406;
				success = false;
			}
			data["DepartmentId"] = item.DepartmentId;
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.DepartmentId, data, userLogin);
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
		CompanyId: item.CompanyId,
		DepartmentName: item.DepartmentName,
		Abbreviation: item.Abbreviation,
		NumericalOrder: item.NumericalOrder,
		Status: item.Status,
	}
	data["User_Id_Created"]		= userLogin.UsersId; 
	data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
	data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	if(item.DepartmentId == ''){
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["DepartmentId"] = item.id;
			status	= 201;
			success	= true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.DepartmentId, data, userLogin);
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
		CompanyId: item.CompanyId,
		DepartmentName: item.DepartmentName,
		Abbreviation: item.Abbreviation,
		NumericalOrder: item.NumericalOrder,
		Status: item.Status,
	}
	data["User_Id_Modified"]		= userLogin.UsersId; 
	data["User_Name_Modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
	data["DateTime_Modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.DepartmentId);
	if(item_Old){
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.DepartmentId);
		let status = 200;
		let success = true;
		if(result != true){
			status = 406;
			success = false;
		}
		data["DepartmentId"] = item.DepartmentId;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.DepartmentId, data, userLogin);
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

async function deleteById(DepartmentId, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, DepartmentId);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.DepartmentId, item_Old, userLogin);
	let arrParams = [
		{ "name": "DepartmentId", "value": DepartmentId, "type": "Int64" }
	];
	let sql = ` delete from Sys_Department 
		where (DepartmentId like @DepartmentId) `;
	return  await dbConnection.deleteObject(sql, arrParams);
//	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,DepartmentId);
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
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.DepartmentId, item_Old, userLogin);
					let arrParams = [
						{ "name": "DepartmentId", "value": listId[i], "type": "Int64" }
					];
					let sql = ` delete from Sys_Department 
						where (DepartmentId like @DepartmentId) `;
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
	let sort = " A.DepartmentId DESC ";
	if(options != null) {
		if((options.DepartmentName != "") && (options.DepartmentName != undefined)){
			dataParams.DepartmentName = "%" + options.DepartmentName + "%";
			where += " and (A.DepartmentName like @DepartmentName) ";
		}
		if((options.Abbreviation != "") && (options.Abbreviation != undefined)){
			dataParams.Abbreviation = "%" + options.Abbreviation + "%";
			where += " and (A.Abbreviation like @Abbreviation) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.DepartmentId, A.CompanyId, B.CompanyName, A.DepartmentName, A.Abbreviation, A.NumericalOrder, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_Department A inner join Sys_Company B on A.CompanyId = B.CompanyId    ${where}
			ORDER BY ${sort}
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

	//********************************************************************
	// get Sys_Department by CompanyId. if you don't use this method, please delete it
	//********************************************************************
async function listByCompanyId (CompanyId){
	let dataParams = {
		CompanyId
	};
	let sql = ` SELECT * from Sys_Department where CompanyId = @CompanyId `;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

async function getById( DepartmentId, userLogin = null){
	let dataParams = {
		DepartmentId : DepartmentId,
	};
	let sql = ` SELECT A.DepartmentId, A.CompanyId, B.CompanyName, A.DepartmentName, A.Abbreviation, A.NumericalOrder, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified
				FROM Sys_Department A
				inner join Sys_Company B on A.CompanyId = B.CompanyId 
				where (A.DepartmentId = @DepartmentId) 
				`; 
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);
}


async function listItemForDropdown(){
	 let sql = ` SELECT DepartmentId, CompanyId, DepartmentName, Abbreviation, NumericalOrder, Status
			FROM Sys_Department  `;
	return  await dbConnection.selectQueryRecordset(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where  = "";
		if((options.DepartmentName != "") && (options.DepartmentName != undefined)){
			dataParams.DepartmentName = "%" + options.DepartmentName + "%";
			where += " and (A.DepartmentName like @DepartmentName) ";
		}
		if((options.Abbreviation != "") && (options.Abbreviation != undefined)){
			dataParams.Abbreviation = "%" + options.Abbreviation + "%";
			where += " and (A.Abbreviation like @Abbreviation) ";
		}
	let sql = ` SELECT A.DepartmentId, A.CompanyId, B.CompanyName, A.DepartmentName, A.Abbreviation, A.NumericalOrder, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			 FROM Sys_Department A inner join Sys_Company B on A.CompanyId = B.CompanyId  where (1 = 1)`; 
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
	listByCompanyId,
};
