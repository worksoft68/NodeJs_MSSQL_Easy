//**************************************************************************************************************************
//     Creation time: Wednesday, 30 November 2022 7:02 PM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mssql');
const FileHelpers	= require(__path_helpers + 'file');
const MainSchemas	 = require(__path_schemas + 'chuDeBaiViet');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'ChuDeBaiViet';//use this parameter to check permissions: save, select, delete.... 
const uploadFolder = 'public/uploads/'+functionBranch+'/';

async function saveItem_(item, userLogin){ 
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if((permissionAccess.FullAuthority  != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		Name: item.Name,
		Image: item.Image,
		Slug: item.Slug,
		ShowHomePage: item.ShowHomePage,
		Ordering: item.Ordering,
		Description: item.Description,
		Status: item.Status,
	}
	if(item.Id == ''){
		data["User_Id_Created"]		= userLogin.UsersId; 
		data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
		data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["Id"] = item.id;
			status	= 201;
			success	= true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.Id, data, userLogin);
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
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.Id);
		if(item_Old){
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.Id);
			let status = 200;
			let success = true;
			if(result != true){
				status = 406;
				success = false;
			}
			data["Id"] = item.Id;
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.Id, data, userLogin);
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
		Name: item.Name,
		Image: item.Image,
		Slug: item.Slug,
		ShowHomePage: item.ShowHomePage,
		Ordering: item.Ordering,
		Description: item.Description,
		Status: item.Status,
	}
	data["User_Id_Created"]		= userLogin.UsersId; 
	data["User_Name_Created"]	= userLogin.FirstName + ' '+ userLogin.LastName; 
	data["DateTime_Created"]	= moment(Date.now()).format(systemConfig.format_time_sql_system); 
	if(item.Id == ''){
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if(result){
			let recordset = result.recordset;
			let item = recordset[0];
			data["Id"] = item.id;
			status	= 201;
			success	= true;
		}
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.Id, data, userLogin);
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
		Name: item.Name,
		Image: item.Image,
		Slug: item.Slug,
		ShowHomePage: item.ShowHomePage,
		Ordering: item.Ordering,
		Description: item.Description,
		Status: item.Status,
	}
	data["User_Id_Modified"]		= userLogin.UsersId; 
	data["User_Name_Modified"]		=  userLogin.FirstName + ' '+ userLogin.LastName;
	data["DateTime_Modified"]		= moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.Id);
	if(item_Old){
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.Id);
		let status = 200;
		let success = true;
		if(result != true){
			status = 406;
			success = false;
		}
		data["Id"] = item.Id;
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.Id, data, userLogin);
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

async function deleteById(Id, userLogin = null){
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, Id);
	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
	let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.Image);
	if (rerultDeleteFile) {
		let arrParams = [
			{ "name": "Id", "value": Id, "type": "int" }
		];
		let sql = ` delete from ChuDeBaiViet 
			where (Id like @Id) `;
		return  await dbConnection.deleteObject(sql, arrParams);
//		return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,Id);
	}
	else {
		return false;
	}
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
				await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
				let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.Image);
				if (rerultDeleteFile) {
						let arrParams = [
							{ "name": "Id", "value": listId[i], "type": "int" }
						];
						let sql = ` delete from ChuDeBaiViet 
							where (Id like @Id) `;
						resultOne =  await dbConnection.deleteObject(sql, arrParams);
//						resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
				}
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
	let where  = " WHERE (A.Id != 0) ";
	let sort = " A.Id DESC ";
	if(options != null) {
		if((options.Name != "") && (options.Name != undefined)){
			dataParams.Name = "%" + options.Name + "%";
			where += " and (A.Name like @Name) ";
		}
		if((options.Image != "") && (options.Image != undefined)){
			dataParams.Image = "%" + options.Image + "%";
			where += " and (A.Image like @Image) ";
		}
		if((options.Slug != "") && (options.Slug != undefined)){
			dataParams.Slug = "%" + options.Slug + "%";
			where += " and (A.Slug like @Slug) ";
		}
		if((options.Description != "") && (options.Description != undefined)){
			dataParams.Description = "%" + options.Description + "%";
			where += " and (A.Description like @Description) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.Id, A.Name, A.Image, A.Slug, A.ShowHomePage, A.Ordering, A.Description, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM ChuDeBaiViet A    ${where}
			ORDER BY ${sort}
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

async function getById( Id, userLogin = null){
	let dataParams = {
		Id : Id,
	};
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, Id);
	let sql = ` SELECT A.Id, A.Name, A.Image, A.Slug, A.ShowHomePage, 
		A.Ordering, A.Description, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, 
		A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
		FROM ChuDeBaiViet as A
		where (A.Id = @Id) `; 
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);
}


async function listItemForDropdown(){
	 let sql = ` SELECT Id, Name, Image, Slug, ShowHomePage, Ordering, Description, Status
			FROM ChuDeBaiViet  `;
	return  await dbConnection.selectQueryRecordset(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where  = "";
	if((item.Name != "") && (item.Name != undefined)){
		dataParams.Name = "%" + item.Name + "%";
		where += " and (A.Name like @Name) ";
	}
	if((item.Image != "") && (item.Image != undefined)){
		dataParams.Image = "%" + item.Image + "%";
		where += " and (A.Image like @Image) ";
	}
	if((item.Slug != "") && (item.Slug != undefined)){
		dataParams.Slug = "%" + item.Slug + "%";
		where += " and (A.Slug like @Slug) ";
	}
	if((item.Description != "") && (item.Description != undefined)){
		dataParams.Description = "%" + item.Description + "%";
		where += " and (A.Description like @Description) ";
	}
	let sql = ` SELECT A.Id, A.Name, A.Image, A.Slug, A.ShowHomePage, A.Ordering, A.Description, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			 FROM ChuDeBaiViet A  where (A.Id > 0 )`; 
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
