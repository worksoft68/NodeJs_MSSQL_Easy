const dbConnection = require(__path_helpers + 'utils-mssql');
const MainSchemas = require(__path_schemas + 'sys_User_Role');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const LogModel = require(__path_models + 'systemLog');
const systemConfig = require(__path_configs + 'system');
var moment = require('moment');
const functionBranch = 'sys_User_Role';




async function saveInsert(item, userLogin) {
	let data = {
		IdRole: item.IdRole,
		UsersId: item.UsersId,
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
	LogModel.saveLog("Insert", MainSchemas.schemas.table, data.Id, data, userLogin);
	return {
		success: success,
		status: status,
		action: 'insert',
		data: data,
		message: result
	};

}

async function listItemsByUser(UsersId) {
	let dataParams = {};
	dataParams.UsersId = UsersId;
	let sql = ` select ur.Id, r.Name as RoleName, ur.User_Name_Created, ur.DateTime_Created
				from Sys_User_Role ur inner join Sys_Role r 
						on ur.IdRole = r.Id  WHERE (ur.UsersId = @UsersId)
					ORDER BY  r.Name  ASC `;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function deleteById(Id, userLogin = null) {
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, Id);
	LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, Id);
}

async function deleteList(arrayId, userLogin = null) {
	try {
		// let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, 'sys_User');
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
				LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.Id, item_Old, userLogin);
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

async function listItems(params, userLogin, options = null) {
	let dataParams = {};

	let skip = (params.pagination.currentPage - 1) * systemConfig.totalItemsPerPage;
	let where = " WHERE (Id != 0) ";
	if (options != null) {
		if (options.Name != "") {
			dataParams.Name = "%" + options.Name + "%";
			where += " and (Name like @Name) ";
		}
	}
	let sql = `  SELECT A.Id, A.Name, A.NumericalOrder, A.Status, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.DateTime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM sys_User_Role A    ${where}
			ORDER BY Id DESC
			offset ${skip} rows
			fetch next ${systemConfig.totalItemsPerPage} rows only`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}


module.exports = {

	saveInsert,
	deleteById,
	deleteList,
	listItems,
	listItemsByUser,

};
