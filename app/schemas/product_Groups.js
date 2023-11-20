//**************************************************************************************************************************
//     Creation time: Tuesday, 23 May 2023 4:14 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'Product_Groups',
	primaryKeyColumn: 'Id',
	Id: 'int',
	Name: 'string',
	Ordering: 'int',
	Description: 'string',
	Is_Using: 'bool',
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
