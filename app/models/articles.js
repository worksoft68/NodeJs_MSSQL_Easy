var moment = require('moment');
const dbConnection = require(__path_helpers + 'utils-mssql');
const FileHelpers = require(__path_helpers + 'file');

const MainSchemas = require(__path_schemas + 'articles');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog');
const systemConfig = require(__path_configs + 'system');

const functionBranch = 'Articles';//use this parameter to check permissions: save, select, delete.... 
const uploadFolder = 'public/uploads/' + functionBranch + '/';

async function saveItem_(item, userLogin) {
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	let data = {
		CategorieId: item.CategorieId,
		Title: item.Title,
		Slug: item.Slug,
		Thumb: item.Thumb,
		Summary: item.Summary,
		ContentArticles: item.ContentArticles,
		Ordering: item.Ordering,
		Special: item.Special,
		Status: item.Status,
	}
	if (item.Id == '') {
		data["User_Id_Created"] = userLogin.UsersId;
		data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		data["Id"] = item.Id;
		let result = await dbConnection.addAnything(MainSchemas.schemas, data);
		let status = 201;
		if (result != true) status = 406;
		await LogModel.saveLog("Insert", MainSchemas.schemas.table, data.Id, data, userLogin);
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
		CompanyId: userLogin.CompanyId,
		CategorieId: item.CategorieId,
		Title: item.Title,
		Slug: item.Slug,
		Thumb: item.Thumb,
		Summary: item.Summary,
		ContentArticles: item.ContentArticles,
		Ordering: item.Ordering,
		Special: item.Special,
		Status: item.Status,
	}
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


async function saveUpdate(item, userLogin) {
	let data = {
		CategorieId: item.CategorieId,
		Title: item.Title,
		Slug: item.Slug,
		Thumb: item.Thumb,
		Summary: item.Summary,
		ContentArticles: item.ContentArticles,
		Ordering: item.Ordering,
		Special: item.Special,
		Status: item.Status,
	}
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

	await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
	let rerultDeleteFile = await FileHelpers.remove(uploadFolder, item_Old.Thumb);
	if (rerultDeleteFile) {
		await LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
		let arrParams = [
				{ "name": "Id", "value": Id, "type": "number" },
				{ "name": "CompanyId", "value": userLogin.CompanyId, "type": "number" }			
			];		
		let sql = ` delete from ${MainSchemas.schemas.table} 
			where (Id like @Id) and (CompanyId like @CompanyId) `;	
		
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
					//resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
					let arrParams = [
						{ "name": "Id", "value": listId[i], "type": "number" },
						{ "name": "CompanyId", "value": userLogin.CompanyId, "type": "number" }			
					];		
					let sql = ` delete from ${MainSchemas.schemas.table} 
						where (Id like @Id) and (CompanyId like @CompanyId) `;					
					resultOne = await dbConnection.deleteObject(sql, arrParams);	
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
	let dataParams = {
		CompanyId : userLogin.CompanyId
	};
	let skip = (params.pagination.currentPage-1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (A.CompanyId = @CompanyId) ";
	if (options != null) {
		if ((options.Title != "")  && (options.Title != undefined)) {
			dataParams.Title = "%" + options.Title + "%";
			where += " and (A.Title like @Title) ";
		}
		if ((options.Slug != "")  && (options.Slug != undefined)) {
			dataParams.Slug = "%" + options.Slug + "%";
			where += " and (A.Slug like @Slug) ";
		}
		if ((options.CategorieId != "")  && (options.CategorieId != undefined)&& (options.CategorieId != "") && (options.CategorieId != "0")){
			dataParams.CategorieId = options.CategorieId;
			sql += " and (A.CategorieId like @CategorieId) ";
		}
		if ((options.Summary != "")  && (options.Summary != undefined)) {
			dataParams.Summary = "%" + options.Summary + "%";
			where += " and (A.Summary like @Summary) ";
		}
		
	}
	let sql = `  SELECT A.Id, A.CategorieId, B.Name, A.Title, A.Slug, A.Thumb, A.Summary, A.ContentArticles, A.Ordering, A.Special, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Articles A inner join Categories B on A.CategorieId = B.Id    ${where}
			ORDER BY A.Id DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
			
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	if(result.status == 'error')
		return {};
	return result.recordset;
}

async function search(params, userLogin, options = null) {
	let dataParams = {
		CompanyId : userLogin.CompanyId
	};
	let skip = (params.pagination.currentPage-1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (A.CompanyId = @CompanyId) ";
	if (options != null) {
		if ((options.Title != "")  && (options.Title != undefined)) {
			dataParams.Title = "%" + options.Title + "%";
			where += " and (A.Title like @Title) ";
		}
		if ((options.Slug != "")  && (options.Slug != undefined)) {
			dataParams.Slug = "%" + options.Slug + "%";
			where += " and (A.Slug like @Slug) ";
		}
		if ((options.CategorieId != "")  && (options.CategorieId != undefined)&& (options.CategorieId != "") && (options.CategorieId != "0")){
			dataParams.CategorieId = options.CategorieId;
			sql += " and (A.CategorieId like @CategorieId) ";
		}
		if ((options.Summary != "")  && (options.Summary != undefined)) {
			dataParams.Summary = "%" + options.Summary + "%";
			where += " and (A.Summary like @Summary) ";
		}
		
	}
	let sql = `  SELECT A.Id, A.CategorieId, B.Name, A.Title, A.Slug, A.Thumb, A.Summary, A.ContentArticles, A.Ordering, A.Special, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Articles A inner join Categories B on A.CategorieId = B.Id    ${where}
			ORDER BY A.Id DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
			console.log(sql);
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	if(result.status == 'error')
		return {};
	return result.recordset;
}

async function getById(Id, userLogin = null) {
	let dataParams = {
		Id : Id,
		CompanyId : userLogin.CompanyId
	};
	let sql = ` SELECT A.Id, A.CategorieId, B.Name, A.Title, A.Slug, A.Thumb, A.Summary, A.ContentArticles, A.Ordering, A.Special, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified
				FROM Articles A
				inner join Categories B on A.CategorieId = B.Id 
				where (A.Id like @Id) and (A.CompanyId like @CompanyId)  `;
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);		
}




async function exportData(item, userLogin) {
	let dataParams = {
		CompanyId:userLogin.CompanyId
	};
	let where = " WHERE (A.CompanyId like @CompanyId) ";
	if (item.Title != "") {
		dataParams.Title = "%" + item.Title + "%";
		where += " and (A.Title like @Title) ";
	}
	if (item.Slug != "") {
		dataParams.Slug = "%" + item.Slug + "%";
		where += " and (A.Slug like @Slug) ";
	}

	if (item.Summary != "") {
		dataParams.Summary = "%" + item.Summary + "%";
		where += " and (A.Summary like @Summary) ";
	}
	// if(item.ContentArticles != ""){
	// 	dataParams.ContentArticles = "%" + item.ContentArticles + "%";
	// 	where += " and (A.ContentArticles like @ContentArticles) ";
	// }
	let sql = ` SELECT A.Id, A.CategorieId, B.Name as CategorieName, A.Title, A.Slug, A.Thumb, A.Summary, A.Ordering, A.Special, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified 
			 FROM Articles A inner join Categories B on A.CategorieId = B.Id `;
	sql += where;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}
//====== Fontend==========================================================
async function listItemsFrontendSpecial() {
	let sql = ` SELECT top 3 A.Id as id, A.CategorieId as categorie_id, B.Name as categoryName, A.Title as title, A.Slug as slug, A.Thumb as thumb, A.Summary as summary, A.Special as is_special, A.Status as status, A.User_Id_Created as user_id_created, A.User_Name_Created as user_name_created, A.DateTime_Created as datetime_created, A.User_Id_Modified as user_id_modified, A.User_Name_Modified as user_name_modified, A.DateTime_Modified as datetime_modified 
	FROM Articles A inner join Categories B on A.CategorieId = B.Id 
	where A.Status = 1			
	ORDER BY A.Ordering `;
	let dataParams = { };	
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function getItemsByIdFrontend(Id){
	let dataParams = { 
		Id: Id,
		Status: 1		
	};	
	let sql = ` SELECT A.Id as id, A.CategorieId as categorie_id, B.Name as categoryName, A.Title as title, A.Slug as slug, A.Thumb as thumb, A.Summary as summary, A.ContentArticles as content_articles, A.Special as is_special, A.Status as status, A.User_Id_Created as user_id_created, A.User_Name_Created as user_name_created, A.DateTime_Created as datetime_created, A.User_Id_Modified as user_id_modified, A.User_Name_Modified as user_name_modified, A.DateTime_Modified as datetime_modified 
				FROM Articles A inner join Categories B on A.CategorieId = B.Id 
				where (A.Status = @Status) and ( A.Id = @Id )
			`;	
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);		
}
async function listItemsFrontendItemsNews() {

	let sql = ` SELECT top 3 A.Id as id, A.CategorieId as categorie_id, B.Name as categoryName, A.Title as title, A.Slug as slug, A.Thumb as thumb, A.Summary as summary, A.Special as is_special, A.Status as status, A.User_Id_Created as user_id_created, A.User_Name_Created as user_name_created, A.DateTime_Created as datetime_created, A.User_Id_Modified as user_id_modified, A.User_Name_Modified as user_name_modified, A.DateTime_Modified as datetime_modified 
	FROM Articles A inner join Categories B on A.CategorieId = B.Id 
	where A.Status = 1			
	ORDER BY A.DateTime_Created desc `;
	
	let dataParams = { };
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function listItemsFrontendItemsInCategory(CategorieId) {
	let dataParams = { 
		CategorieId
	};
	let sql = ` SELECT top 10 A.Id as id, A.CategorieId as categorie_id, B.Name as categoryName, A.Title as title, A.Slug as slug, A.Thumb as thumb, A.Summary as summary, A.Special as is_special, A.Status as status, A.User_Id_Created as user_id_created, A.User_Name_Created as user_name_created, A.DateTime_Created as datetime_created, A.User_Id_Modified as user_id_modified, A.User_Name_Modified as user_name_modified, A.DateTime_Modified as datetime_modified 
	FROM Articles A inner join Categories B on A.CategorieId = B.Id 
	where (A.Status = 1) and (A.CategorieId like @CategorieId)			
	ORDER BY A. Ordering desc, A.DateTime_Created desc `;	
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function listItemsFrontendItemsOthers(Id, CategorieId) {

	let sql = ` SELECT top 3 A.Id as id, A.CategorieId as categorie_id, A.Title as title, A.Slug as slug, A.Thumb as thumb, A.Summary as summary, A.Special as is_special, A.Status as status, A.User_Id_Created as user_id_created, A.User_Name_Created as user_name_created, A.DateTime_Created as datetime_created, A.User_Id_Modified as user_id_modified, A.User_Name_Modified as user_name_modified, A.DateTime_Modified as datetime_modified 
	FROM Articles A 
	where (A.Status = 1) and (A.Id != @Id) and (A.CategorieId like @CategorieId)	
	ORDER BY A.DateTime_Created desc `;
	let dataParams = { 
		Id,
		CategorieId
	};

	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}
async function listItemsFrontendItemRandom() {
	let sql = ` SELECT top 3 A.Id as id, A.CategorieId as categorie_id, A.Title as title, A.Slug as slug, A.Thumb as thumb, A.Summary as summary, A.Special as is_special, A.Status as status, A.User_Id_Created as user_id_created, A.User_Name_Created as user_name_created, A.DateTime_Created as datetime_created, A.User_Id_Modified as user_id_modified, A.User_Name_Modified as user_name_modified, A.DateTime_Modified as datetime_modified 
	FROM Articles A 
	where (A.Status = 1) 	
	ORDER BY A.DateTime_Created desc `;
	let dataParams = { };	
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}
async function searchItemsFrontend(keyword) {
	let arrKeyword = keyword.split('-');
	let andQueryTitle = '';
	let andQuerySummary = '';
	let andQueryContent = '';
	for(let index=0; index < arrKeyword.length; index++)
	{
		if(arrKeyword[index] != "")
		{
			if(index == 0){
				andQueryTitle += ` (A.Title like N'%${arrKeyword[index]}%')`;
				andQuerySummary += ` (A.Summary like N'%${arrKeyword[index]}%')`;
				andQueryContent += ` (A.ContentArticles like N'%${arrKeyword[index]}%')`;
			}
			else{
				andQueryTitle += ` and (A.Title like N'%${arrKeyword[index]}%')`;
				andQuerySummary += ` and (A.Summary like N'%${arrKeyword[index]}%')`;
				andQueryContent += ` and (A.ContentArticles like N'%${arrKeyword[index]}%')`;
			}			
		}
	}

	let sql = ` SELECT top 20 A.Id as id, A.CategorieId as categorie_id, A.Title as title, A.Slug as slug, A.Thumb as thumb, A.Summary as summary, A.Special as is_special, A.Status as status, A.User_Id_Created as user_id_created, A.User_Name_Created as user_name_created, A.DateTime_Created as datetime_created, A.User_Id_Modified as user_id_modified, A.User_Name_Modified as user_name_modified, A.DateTime_Modified as datetime_modified  
			FROM articles A 
			where (A.Status = 1)	and ((${andQueryTitle})or(${andQuerySummary})or(${andQueryContent}))
			ORDER BY A.DateTime_Created desc
		`;	
	let result =  await dbConnection.selectQuery(sql);
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
	exportData,
	listItemsFrontendSpecial,
	listItemsFrontendItemsNews,
	listItemsFrontendItemsInCategory,
	listItemsFrontendItemsOthers,
	listItemsFrontendItemRandom,
	getItemsByIdFrontend,
	searchItemsFrontend
};
