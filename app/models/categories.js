var moment = require('moment');
const dbConnection = require(__path_helpers + 'utils-mssql');
const MainSchemas = require(__path_schemas + 'categories');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog');
const systemConfig = require(__path_configs + 'system');
const FileHelpers = require(__path_helpers + 'file');
const functionBranch = 'Categories';//use this parameter to check permissions: save, select, delete.... 
const uploadFolder = 'public/uploads/categories/';
async function saveItem_(item, userLogin) {
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		Name: item.Name,
		Slug: item.Slug,
		Thumbnail: item.Thumbnail,
		ViewType: item.ViewType,
		Link: item.Link,
		ShowHomePage: item.ShowHomePage,
		Ordering: item.Ordering,
		Description: item.Description,
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
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.Id, data, userLogin);
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
			await LogModel.saveLog("Update", MainSchemas.schemas.table, data.Id, data, userLogin);
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
		Company_Id: userLogin.CompanyId,
		Name: item.Name,
		Slug: item.Slug,
		Thumbnail: item.Thumbnail,
		ViewType: item.ViewType,
		Link: item.Link,
		Zone: item.Zone,
		ShowHomePage: item.ShowHomePage,
		Ordering: item.Ordering,
		Description: item.Description,
		Status: item.Status,
	}
	if((item.Parent_Id != '-') && (item.Parent_Id == ''))
		data["Parent_Id"] = item.Parent_Id;
	else data["Parent_Id"] = 0;
	data["User_Id_Created"] = userLogin.UsersId;
	data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
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
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.Id, data, userLogin);
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
		Name: item.Name,
		Slug: item.Slug,
		Thumbnail: item.Thumbnail,
		ViewType: item.ViewType,
		Link: item.Link,
		Zone: item.Zone,
		ShowHomePage: item.ShowHomePage,
		Ordering: item.Ordering,
		Description: item.Description,
		Status: item.Status,
	}		
	if((item.Parent_Id != '-') && (item.Parent_Id != ''))
		data["Parent_Id"] = item.Parent_Id;
	else data["Parent_Id"] = 0;
	data["User_Id_Modified"] = userLogin.UsersId;
	data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
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
		await LogModel.saveLog("Update", MainSchemas.schemas.table, data.Id, data, userLogin);
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
	let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.Thumbnail);
	if (rerultDeleteFile) {
		await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
		let arrParams = [
				{ "name": "Id", "value": Id, "type": "number" },
				{ "name": "Company_Id", "value": userLogin.CompanyId, "type": "number" }			
			];		
		let sql = ` delete from ${MainSchemas.schemas.table} 
			where (Id like @Id) and (Company_Id like @Company_Id) `;	
		return await dbConnection.deleteObject(sql, arrParams);	
	}
	else {
		return false;
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

				let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.Thumbnail);
				if (rerultDeleteFile) {
					await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
					
					let arrParams = [
						{ "name": "Id", "value": listId[i], "type": "number" },
						{ "name": "Company_Id", "value": userLogin.CompanyId, "type": "number" }			
					];		
					let sql = ` delete from ${MainSchemas.schemas.table} 
						where (Id like @Id) and (Company_Id like @Company_Id) `;
						
					resultOne = await dbConnection.deleteObject(sql, arrParams);					
						//resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
				}
			}
			catch (error) { }
			if (resultOne == true) {
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
	let dataParams = {
		Company_Id : userLogin.CompanyId
	};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (A.Company_Id like @Company_Id) ";
	if (options != null) {
		
		if ((options.Name != "") && (options.Name != undefined)) {
			dataParams.Name = "%" + options.Name + "%";
			where += " and (A.Name like @Name) ";
		}
		if ((options.Slug != "") && (options.Slug != undefined)) {
			dataParams.Slug = "%" + options.Slug + "%";
			where += " and (A.Slug like @Slug) ";
		}
		if ((options.ViewType != "") && (options.ViewType != "novalue")  && (options.ViewType != undefined)) {
			dataParams.ViewType = "%" + options.ViewType + "%";
			where += " and (A.ViewType like @ViewType) ";
		}
		if ((options.Description != "") && (options.Description != undefined)) {
			dataParams.Description = "%" + options.Description + "%";
			where += " and (A.Description like @Description) ";
		}
	}
	let sql = ` SELECT A.Id, A.Name, CParent.Name as NameParent, A.Slug, A.Thumbnail, A.ViewType , A.Zone , A.ShowHomePage, A.Ordering, A.Description, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Categories A  left join Categories CParent  on A.Parent_Id = CParent.Id  ${where}
			ORDER BY Id DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
			await console.log(sql);
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function search(params, userLogin, options = null) {
	let dataParams = {
		Company_Id : userLogin.CompanyId
	};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (A.Company_Id like @Company_Id) ";
	if (options != null) {
		
		if ((options.Name != "") && (options.Name != undefined)) {
			dataParams.Name = "%" + options.Name + "%";
			where += " and (A.Name like @Name) ";
		}
		if ((options.Slug != "") && (options.Slug != undefined)) {
			dataParams.Slug = "%" + options.Slug + "%";
			where += " and (A.Slug like @Slug) ";
		}
		if ((options.ViewType != "") && (options.ViewType != "novalue")  && (options.ViewType != undefined)) {
			dataParams.ViewType = "%" + options.ViewType + "%";
			where += " and (A.ViewType like @ViewType) ";
		}
		if ((options.Description != "") && (options.Description != undefined)) {
			dataParams.Description = "%" + options.Description + "%";
			where += " and (A.Description like @Description) ";
		}
	}
	let sql = `  SELECT A.Id, A.Name, CParent.Name as NameParent, A.Slug, A.Thumbnail, A.ViewType , A.Zone , A.ShowHomePage, A.Ordering, A.Description, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Categories A  left join Categories CParent  on A.Parent_Id = CParent.Id  ${where}
			ORDER BY Id DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
			await console.log(sql);
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function getById(Id, userLogin = null) {
	let dataParams = {
		Id : Id,
		Company_Id : userLogin.CompanyId
	};
	
	let sql = `  SELECT A.Id, A.Parent_Id, A.Name, CParent.Name as NameParent , A.Slug, A.Thumbnail
		, A.ViewType, A.Link, A.Zone, A.ShowHomePage, A.Ordering, A.Description, A.Status
		, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
			FROM Categories A  left join Categories CParent 
			on A.Parent_Id = CParent.Id where (A.Id like @Id) and (A.Company_Id like @Company_Id) `;
		
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);

	let recordset =  result.recordset;	
	if(recordset.length>0){
		return recordset[0];
	} 
	else
		return result;
	
}


async function listItemForDropdown(userLogin) {
	let dataParams = {
		Status: 1,
		Company_Id: userLogin.CompanyId,
	};
	
	let sql = ` SELECT Id, Name,  Status 
			FROM Categories  where (Status = @Status) and (Company_Id like @Company_Id) `;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function exportData(item, userLogin) {
	let dataParams = {
		Company_Id:userLogin.CompanyId
	};		
	let where = " WHERE (A.Company_Id like @Company_Id) ";
	if (item.Name != "") {
		dataParams.Name = "%" + item.Name + "%";
		where += " and (A.Name like @Name) ";
	}
	if (item.Slug != "") {
		dataParams.Slug = "%" + item.Slug + "%";
		where += " and (A.Slug like @Slug) ";
	}
	// if (item.Thumbnail != "") {
	// 	dataParams.Thumbnail = "%" + item.Thumbnail + "%";
	// 	where += " and (Thumbnail like @Thumbnail) ";
	// }
	// if (item.ViewType != "") {
	// 	dataParams.ViewType = "%" + item.ViewType + "%";
	// 	where += " and (ViewType like @ViewType) ";
	// }
	if (item.Description != "") {
		dataParams.Description = "%" + item.Description + "%";
		where += " and (A.Description like @Description) ";
	}
	let sql = ` SELECT A.Id, A.Name, CParent.Name as NameParent , A.Slug, A.Thumbnail
				, A.ViewType , A.Zone , A.ShowHomePage, A.Ordering, A.Description, A.Status
				, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
				FROM Categories A  left join Categories CParent 
				on A.Parent_Id = CParent.Id   ${where}
				ORDER BY Id DESC `;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);


	return result.recordset;
}

//=== Frontend ==============================================================
async function getByIdFrontend(Id){
	try{
	let dataParams = { 
		Id,
		Status: 1		
	};	
	let sql = ` SELECT A.Id as id, A.Parent_Id as parent_id, A.Name as name, CParent.Name as nameParent , A.Slug as slug, A.Thumbnail as thumbnail
				, A.ViewType as viewtype, A.Zone as zone, A.ShowHomePage as showHomePage, A.Ordering as ordering, A.Status  
				FROM Categories A  left join Categories CParent
				on A.Parent_Id = CParent.Id  where (A.Status = @Status) and (A.Id = @Id) 
				ORDER BY A.Ordering `;
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);	
	
	}
	catch(err){
		return false;
	}
	
	//return  await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id);
}

async function listItemsFrontend () {
	try{
		let dataParams = { 			
			Status: 1		
		};	
		let sql = ` SELECT A.Id as id, A.Parent_Id as parent_id, A.Name as name, CParent.Name as nameParent , A.Slug as slug, A.Thumbnail as thumbnail
				, A.ViewType as viewtype, A.Link as link , A.Zone as zone, A.ShowHomePage as showHomePage, A.Ordering as ordering
								
				FROM Categories A  left join Categories CParent
				on A.Parent_Id = CParent.Id  where (A.Status = @Status) 
				ORDER BY A.Ordering `;

		let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
		return result.recordset;
	}
		catch(err){
			console.log(err);
			return false;
		}
		
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
	getByIdFrontend,
	listItemsFrontend
};
