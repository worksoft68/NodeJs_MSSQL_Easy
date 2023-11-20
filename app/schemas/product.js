//**************************************************************************************************************************
//     Creation time: Friday, 05 May 2023 2:56 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'Product',
	primaryKeyColumn: 'Id',
	Id: 'int',
	IdProduct_Groups: 'int',
	Name: 'string',
	Description: 'string',
	Ordering: 'int',
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
