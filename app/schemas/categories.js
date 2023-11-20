let schemas = {
	table: 'Categories',
	primaryKeyColumn: 'Id',
	Id: 'int',
	Parent_Id: 'int',
	Company_Id: 'int',
	Name: 'string',
	Slug: 'string',
	Thumbnail: 'string',
	ViewType: 'string',
	Link: 'string',
	Zone: 'string',
	ShowHomePage: 'bool',
	Ordering: 'int',
	Description: 'string',
	Status: 'int',
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
