//**************************************************************************************************************************
//     Creation time: Wednesday, 25 October 2023 4:40 PM
//     Creator: 
//**************************************************************************************************************************
var moment = require('moment');
const dbConnection	= require(__path_helpers + 'utils-mssql');
const MainSchemas	 = require(__path_schemas + 'systemLog');
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'SystemLog';//use this parameter to check permissions: save, select, delete.... 

async function saveLog(Action, ImpactZone, IdTable, ContentLog, userLogin) {
	IdTable = String(IdTable);
	let strContentLog = JSON.stringify(ContentLog);
	let strContentLogMin = "";
	if (strContentLog.length > 1800) {
		strContentLogMin = strContentLog.substring(0, 1800);
	}
	else strContentLogMin = strContentLog;

	if (ImpactZone.length > 55) {
		ImpactZone = ImpactZone.substring(0, 55);
	}

	if (IdTable.length > 24) {
		IdTable = IdTable.substring(0, 24);
	}

	let FullName = userLogin.FirstName + ' ' + userLogin.LastName;
	if (FullName.length > 37) {
		FullName = FullName.substring(0, 37);
	}

	let IP = "";
	let data = {
		Action: Action,
		ImpactZone: ImpactZone,
		IdTable: IdTable,
		ContentLog: strContentLogMin,
		ContentLogMax: strContentLog,
		IP: IP,
		UserId: userLogin.UsersId,
		FullName: FullName,
		DateTimeLog: moment(Date.now()).format(systemConfig.format_time_sql_system),
	};                             
	await dbConnection.addAnything(MainSchemas.schemas, data);


}


async function deleteById(Id, userLogin = null){
	let arrParams = [
		{ "name": "Id", "value": Id, "type": "Int64" }
	];
	let sql = ` delete from SystemLog 
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
					let arrParams = [
						{ "name": "Id", "value": listId[i], "type": "Int64" }
					];
					let sql = ` delete from SystemLog 
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
	let where  = " WHERE (1 = 1) ";
	let sort = " A.Id DESC ";
	if(options != null) {
		if((options.Action != "") && (options.Action != undefined)){
			dataParams.Action = "%" + options.Action + "%";
			where += " and (A.Action like @Action) ";
		}
		if((options.ImpactZone != "") && (options.ImpactZone != undefined)){
			dataParams.ImpactZone = "%" + options.ImpactZone + "%";
			where += " and (A.ImpactZone like @ImpactZone) ";
		}
		if((options.IdTable != "") && (options.IdTable != undefined)){
			dataParams.IdTable = "%" + options.IdTable + "%";
			where += " and (A.IdTable like @IdTable) ";
		}
		if((options.ContentLog != "") && (options.ContentLog != undefined)){
			dataParams.ContentLog = "%" + options.ContentLog + "%";
			where += " and (A.ContentLog like @ContentLog) ";
		}
		if((options.ContentLogMax != "") && (options.ContentLogMax != undefined)){
			dataParams.ContentLogMax = "%" + options.ContentLogMax + "%";
			where += " and (A.ContentLogMax like @ContentLogMax) ";
		}
		if((options.FullName != "") && (options.FullName != undefined)){
			dataParams.FullName = "%" + options.FullName + "%";
			where += " and (A.FullName like @FullName) ";
		}
		if((options.sortColumn != undefined) && (options.sortColumn != "")){
			sort = "A." + options.sortColumn + " " + options.sortType;
		}
	}
	let sql = `  SELECT A.Id, A.Action, A.ImpactZone, A.IdTable, A.UserId, A.FullName, A.DateTimeLog 
			, COUNT(*) OVER() as TotalRecord
			FROM SystemLog A    ${where}
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
	let sql = ` SELECT A.Id, A.Action, A.ImpactZone, A.IdTable, A.ContentLog, 
		A.ContentLogMax, A.IP, A.MacAddress, A.HostName, A.UserId, A.FullName, 
		A.DateTimeLog 
		FROM SystemLog as A
		where (A.Id = @Id) `; 
	return await dbConnection.selectOne(MainSchemas.schemas, sql, dataParams);
}




async function exportData(item, userLogin){
	let dataParams = { };
	let where  = "";
		if((options.Action != "") && (options.Action != undefined)){
			dataParams.Action = "%" + options.Action + "%";
			where += " and (A.Action like @Action) ";
		}
		if((options.ImpactZone != "") && (options.ImpactZone != undefined)){
			dataParams.ImpactZone = "%" + options.ImpactZone + "%";
			where += " and (A.ImpactZone like @ImpactZone) ";
		}
		if((options.IdTable != "") && (options.IdTable != undefined)){
			dataParams.IdTable = "%" + options.IdTable + "%";
			where += " and (A.IdTable like @IdTable) ";
		}
		if((options.ContentLog != "") && (options.ContentLog != undefined)){
			dataParams.ContentLog = "%" + options.ContentLog + "%";
			where += " and (A.ContentLog like @ContentLog) ";
		}
		if((options.ContentLogMax != "") && (options.ContentLogMax != undefined)){
			dataParams.ContentLogMax = "%" + options.ContentLogMax + "%";
			where += " and (A.ContentLogMax like @ContentLogMax) ";
		}
		if((options.FullName != "") && (options.FullName != undefined)){
			dataParams.FullName = "%" + options.FullName + "%";
			where += " and (A.FullName like @FullName) ";
		}
	let sql = ` SELECT A.Id, A.Action, A.ImpactZone, A.IdTable, A.ContentLog, A.ContentLogMax, A.IP, A.MacAddress, A.HostName, A.UserId, A.FullName, A.DateTimeLog 
			 FROM SystemLog A  where (1 = 1)`; 
		sql += where; 
	let result =  await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams );
	return result.recordset;
}

module.exports = {
	saveLog,
	deleteById,
	deleteList,
	listItems,	
	getById,	
	exportData,
};
