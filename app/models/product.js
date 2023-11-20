//**************************************************************************************************************************
//     Creation time: Friday, 05 May 2023 2:56 PM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mssql');
const MainSchemas	 = require(__path_schemas + 'product');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog'); 
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'Product';//use this parameter to check permissions: save, select, delete.... 

async function saveItem_(item, userLogin){ 
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if((permissionAccess.FullAuthority  != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		IdProduct_Groups: item.IdProduct_Groups,
		Name: item.Name,
		Description: item.Description,
		Ordering: item.Ordering,
		Is_Using: item.Is_Using,
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
		IdProduct_Groups: item.IdProduct_Groups,
		Name: item.Name,
		Description: item.Description,
		Ordering: item.Ordering,
		Is_Using: item.Is_Using,
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
		IdProduct_Groups: item.IdProduct_Groups,
		Name: item.Name,
		Description: item.Description,
		Ordering: item.Ordering,
		Is_Using: item.Is_Using,
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
	let arrParams = [
		{ "name": "Id", "value": Id, "type": "int" }
	];
	let sql = ` delete from Product 
		where (Id like @Id) `;
	return  await dbConnection.deleteObject(sql, arrParams);
//	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas,Id);
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
					let arrParams = [
						{ "name": "Id", "value": listId[i], "type": "int" }
					];
					let sql = ` delete from Product 
						where (Id like @Id) `;
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
	let where  = " WHERE (A.Id != 0) ";
	let sort = " A.Id DESC ";
	if(options != null) {
		if((options.Name != "") && (options.Name != undefined)){
			dataParams.Name = "%" + options.Name + "%";
			where += " and (A.Name like @Name) ";
		}
		if((options.Description != "") && (options.Description != undefined)){
			dataParams.Description = "%" + options.Description + "%";
			where += " and (A.Description like @Description) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.Id, A.IdProduct_Groups, B.Name as Name_Product_Groups, A.Name, A.Description, A.Ordering, A.Is_Using, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Product A inner join Product_Groups B on A.IdProduct_Groups = B.Id    ${where}
			ORDER BY ${sort}
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

	//********************************************************************
	// get Product by IdProduct_Groups. if you don't use this method, please delete it
	//********************************************************************
async function listByIdProduct_Groups (IdProduct_Groups){
	let dataParams = {
		IdProduct_Groups
	};
	let sql = ` SELECT * from Product where IdProduct_Groups = @IdProduct_Groups `;
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

async function getById( Id, userLogin = null){
	let dataParams = {
		Id : Id,
	};
	let sql = ` SELECT A.Id, A.IdProduct_Groups, B.Name as Name_Product_Groups, A.Name, A.Description, A.Ordering, A.Is_Using, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified
				FROM Product A
				inner join Product_Groups B on A.IdProduct_Groups = B.Id 
				where (A.Id = @Id) 
				`; 
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);
}


async function listItemForDropdown(){
	 let sql = ` SELECT Id, IdProduct_Groups, Name, Description, Ordering, Is_Using
			FROM Product  `;
	return  await dbConnection.selectQueryRecordset(sql); 
}

async function exportData(item, userLogin){
	let dataParams = { };
	let where  = "";
	if((item.Name != "") && (item.Name != undefined)){
		dataParams.Name = "%" + item.Name + "%";
		where += " and (A.Name like @Name) ";
	}
	if((item.Description != "") && (item.Description != undefined)){
		dataParams.Description = "%" + item.Description + "%";
		where += " and (A.Description like @Description) ";
	}
	let sql = ` SELECT A.Id, A.IdProduct_Groups, B.Name as Name_Product_Groups, A.Name, A.Description, A.Ordering, A.Is_Using, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			 FROM Product A inner join Product_Groups B on A.IdProduct_Groups = B.Id  where (A.Id > 0 )`; 
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
	listByIdProduct_Groups,
};
