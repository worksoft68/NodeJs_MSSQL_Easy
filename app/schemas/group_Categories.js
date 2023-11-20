//**************************************************************************************************************************
//     Creation time: Thursday, 27 April 2023 2:52 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'Group_Categories',
	primaryKeyColumn: 'Id',
	Id: 'int',
	Name: 'string',
	Slug: 'string',
	Ordering: 'int',
	Description: 'string',
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
