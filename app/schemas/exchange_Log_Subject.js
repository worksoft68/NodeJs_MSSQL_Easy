//**************************************************************************************************************************
//     Creation time: Thursday, 01 December 2022 10:32 AM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'Exchange_Log_Subject',
	primaryKeyColumn: 'Id',
	Id: 'int',
	Name: 'string',
	Ordering: 'int',
	Description: 'string',
	Status: 'string',
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
