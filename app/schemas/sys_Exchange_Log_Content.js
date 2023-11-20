//**************************************************************************************************************************
//     Creation time: Friday, 02 December 2022 1:39 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'Sys_Exchange_Log_Content',
	primaryKeyColumn: 'Id',
	Id: 'int',
	LogSubjectId: 'int',
	LogSubject: 'string',
	ExchangeLogId: 'int',
	Title: 'string',
	Image: 'string',
	Content_Exchange: 'string',
	Status: 'string',
	Status_Processed: 'string',
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
