//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 2:19 PM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mssql');
const MainSchemas	 = require(__path_schemas + 'sys_Company');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'Sys_Company';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin){ 
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if((permissionAccess.FullAuthority  != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		CompanyName: item.CompanyName,
		Address: item.Address,
		Email1: item.Email1,
		PhoneNumber1: item.PhoneNumber1,
		Notes: item.Notes,
		RepresentativeName: item.RepresentativeName,
		LinkFaceBook: item.LinkFaceBook,
		BankAccountNumber1: item.BankAccountNumber1,
		BankName1: item.BankName1,
		Status: item.Status,
	}
	if(item.CompanyId == ''){
		data["User_Id_Created"]		= userLogin.UsersId; 
		data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
		data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["CompanyId"] = item.id;
			status	= 201;
			success	= true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.CompanyId, data, userLogin);
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
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.CompanyId);
		if(item_Old){
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.CompanyId);
			let status = 200;
			let success = true;
			if(result != true){
				status = 406;
				success = false;
			}
			data["CompanyId"] = item.CompanyId;
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.CompanyId, data, userLogin);
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
		CompanyName: item.CompanyName,
		Address: item.Address,
		Email1: item.Email1,
		PhoneNumber1: item.PhoneNumber1,
		Notes: item.Notes,
		RepresentativeName: item.RepresentativeName,
		LinkFaceBook: item.LinkFaceBook,
		BankAccountNumber1: item.BankAccountNumber1,
		BankName1: item.BankName1,
		Status: item.Status,
	}
	data["User_Id_Created"]		= userLogin.UsersId; 
	data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
	data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	if(item.CompanyId == ''){
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["CompanyId"] = item.id;
			status	= 201;
			success	= true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.CompanyId, data, userLogin);
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
		CompanyName: item.CompanyName,
		Address: item.Address,
		Email1: item.Email1,
		PhoneNumber1: item.PhoneNumber1,
		Notes: item.Notes,
		RepresentativeName: item.RepresentativeName,
		LinkFaceBook: item.LinkFaceBook,
		BankAccountNumber1: item.BankAccountNumber1,
		BankName1: item.BankName1,
		Status: item.Status,
	}
	data["User_Id_Modified"]		= userLogin.UsersId; 
	data["User_Name_Modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
	data["DateTime_Modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.CompanyId);
	if(item_Old){
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.CompanyId);
		let status = 200;
		let success = true;
		if(result != true){
			status = 406;
			success = false;
		}
		data["CompanyId"] = item.CompanyId;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.CompanyId, data, userLogin);
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

async function deleteById(CompanyId, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, CompanyId);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.CompanyId, item_Old, userLogin);
	let arrParams = [
		{ "name": "CompanyId", "value": CompanyId, "type": "Int64" }
	];
	let sql = ` delete from Sys_Company 
		where (CompanyId like @CompanyId) `;
	return  await dbConnection.deleteObject(sql, arrParams);
//	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,CompanyId);
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
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.CompanyId, item_Old, userLogin);
					let arrParams = [
						{ "name": "CompanyId", "value": listId[i], "type": "Int64" }
					];
					let sql = ` delete from Sys_Company 
						where (CompanyId like @CompanyId) `;
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
	let sort = " A.CompanyId DESC ";
	if(options != null) {
		if((options.CompanyName != "") && (options.CompanyName != undefined)){
			dataParams.CompanyName = "%" + options.CompanyName + "%";
			where += " and (A.CompanyName like @CompanyName) ";
		}
		if((options.Address != "") && (options.Address != undefined)){
			dataParams.Address = "%" + options.Address + "%";
			where += " and (A.Address like @Address) ";
		}
		if((options.Email1 != "") && (options.Email1 != undefined)){
			dataParams.Email1 = "%" + options.Email1 + "%";
			where += " and (A.Email1 like @Email1) ";
		}
		if((options.PhoneNumber1 != "") && (options.PhoneNumber1 != undefined)){
			dataParams.PhoneNumber1 = "%" + options.PhoneNumber1 + "%";
			where += " and (A.PhoneNumber1 like @PhoneNumber1) ";
		}
		if((options.Notes != "") && (options.Notes != undefined)){
			dataParams.Notes = "%" + options.Notes + "%";
			where += " and (A.Notes like @Notes) ";
		}
		if((options.RepresentativeName != "") && (options.RepresentativeName != undefined)){
			dataParams.RepresentativeName = "%" + options.RepresentativeName + "%";
			where += " and (A.RepresentativeName like @RepresentativeName) ";
		}
		if((options.LinkFaceBook != "") && (options.LinkFaceBook != undefined)){
			dataParams.LinkFaceBook = "%" + options.LinkFaceBook + "%";
			where += " and (A.LinkFaceBook like @LinkFaceBook) ";
		}
		if((options.BankAccountNumber1 != "") && (options.BankAccountNumber1 != undefined)){
			dataParams.BankAccountNumber1 = "%" + options.BankAccountNumber1 + "%";
			where += " and (A.BankAccountNumber1 like @BankAccountNumber1) ";
		}
		if((options.BankName1 != "") && (options.BankName1 != undefined)){
			dataParams.BankName1 = "%" + options.BankName1 + "%";
			where += " and (A.BankName1 like @BankName1) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.CompanyId, A.CompanyName, A.Address, A.Provincial, A.District, A.Email1, A.Email2, A.PhoneNumber1, A.PhoneNumber2, A.NumberWorkers, A.Notes, A.RenewalDate, A.ExpirationDate, A.RepresentativeName, A.LinkFaceBook, A.UpdatePerson, A.UpdateDay, A.RegistrationAmount, A.RegisteredStorage, A.RegisteredSMS, A.RegistrationAmountSMS, A.BankAccountNumber1, A.BankName1, A.BankAccountNumber2, A.Status, A.BankName2, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_Company A    ${where}
			ORDER BY ${sort}
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

async function getById( CompanyId, userLogin = null){
	let dataParams = {
		CompanyId : CompanyId,
	};
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, CompanyId);
	let sql = ` SELECT A.CompanyId, A.CompanyName, A.Address, A.Provincial, A.District, 
		A.Email1, A.Email2, A.PhoneNumber1, A.PhoneNumber2, A.NumberWorkers, A.Notes, 
		A.RenewalDate, A.ExpirationDate, A.RepresentativeName, A.LinkFaceBook, A.UpdatePerson, A.UpdateDay, 
		A.RegistrationAmount, A.RegisteredStorage, A.RegisteredSMS, A.RegistrationAmountSMS, A.BankAccountNumber1, A.BankName1, 
		A.BankAccountNumber2, A.Status, A.BankName2, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, 
		A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
		FROM Sys_Company as A
		where (A.CompanyId = @CompanyId) `; 
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);
}


async function listItemForDropdown(){
	 let sql = ` SELECT CompanyId, CompanyName, Address, Email1, PhoneNumber1, Notes, RepresentativeName, LinkFaceBook, BankAccountNumber1, BankName1, Status
			FROM Sys_Company  `;
	return  await dbConnection.selectQueryRecordset(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where  = "";
		if((options.CompanyName != "") && (options.CompanyName != undefined)){
			dataParams.CompanyName = "%" + options.CompanyName + "%";
			where += " and (A.CompanyName like @CompanyName) ";
		}
		if((options.Address != "") && (options.Address != undefined)){
			dataParams.Address = "%" + options.Address + "%";
			where += " and (A.Address like @Address) ";
		}
		if((options.Email1 != "") && (options.Email1 != undefined)){
			dataParams.Email1 = "%" + options.Email1 + "%";
			where += " and (A.Email1 like @Email1) ";
		}
		if((options.PhoneNumber1 != "") && (options.PhoneNumber1 != undefined)){
			dataParams.PhoneNumber1 = "%" + options.PhoneNumber1 + "%";
			where += " and (A.PhoneNumber1 like @PhoneNumber1) ";
		}
		if((options.Notes != "") && (options.Notes != undefined)){
			dataParams.Notes = "%" + options.Notes + "%";
			where += " and (A.Notes like @Notes) ";
		}
		if((options.RepresentativeName != "") && (options.RepresentativeName != undefined)){
			dataParams.RepresentativeName = "%" + options.RepresentativeName + "%";
			where += " and (A.RepresentativeName like @RepresentativeName) ";
		}
		if((options.LinkFaceBook != "") && (options.LinkFaceBook != undefined)){
			dataParams.LinkFaceBook = "%" + options.LinkFaceBook + "%";
			where += " and (A.LinkFaceBook like @LinkFaceBook) ";
		}
		if((options.BankAccountNumber1 != "") && (options.BankAccountNumber1 != undefined)){
			dataParams.BankAccountNumber1 = "%" + options.BankAccountNumber1 + "%";
			where += " and (A.BankAccountNumber1 like @BankAccountNumber1) ";
		}
		if((options.BankName1 != "") && (options.BankName1 != undefined)){
			dataParams.BankName1 = "%" + options.BankName1 + "%";
			where += " and (A.BankName1 like @BankName1) ";
		}
	let sql = ` SELECT A.CompanyId, A.CompanyName, A.Address, A.Provincial, A.District, A.Email1, A.Email2, A.PhoneNumber1, A.PhoneNumber2, A.NumberWorkers, A.Notes, A.RenewalDate, A.ExpirationDate, A.RepresentativeName, A.LinkFaceBook, A.UpdatePerson, A.UpdateDay, A.RegistrationAmount, A.RegisteredStorage, A.RegisteredSMS, A.RegistrationAmountSMS, A.BankAccountNumber1, A.BankName1, A.BankAccountNumber2, A.Status, A.BankName2, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			 FROM Sys_Company A  where (1 = 1)`; 
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
