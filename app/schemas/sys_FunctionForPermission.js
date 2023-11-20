//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 10:45 AM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'Sys_FunctionForPermission',
	primaryKeyColumn: 'FunctionName',
	FunctionName: 'string',
	Description: 'string',
	Note: 'string',
	ModuleSystem: 'string',
	Status: 'bool',
	User_Id_Created: 'int',
	User_Name_Created: 'string',
	DateTime_Created: 'DateTime',
	User_Id_Modified: 'int',
	User_Name_Modified: 'string',
	DateTime_Modified: 'DateTime',
};
module.exports = {
	schemas
};
