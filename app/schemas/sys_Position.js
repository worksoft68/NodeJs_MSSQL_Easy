//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 2:17 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'Sys_Position',
	primaryKeyColumn: 'PositionId',
	PositionId: 'Int64',
	PositionName: 'string',
	NumericalOrder: 'int',
	IsManager: 'bool',
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
