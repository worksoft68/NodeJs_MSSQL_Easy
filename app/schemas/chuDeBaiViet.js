//**************************************************************************************************************************
//     Creation time: Wednesday, 30 November 2022 7:02 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'ChuDeBaiViet',
	primaryKeyColumn: 'Id',
	Id: 'int',
	Name: 'string',
	Image: 'string',
	Slug: 'string',
	ShowHomePage: 'bool',
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
