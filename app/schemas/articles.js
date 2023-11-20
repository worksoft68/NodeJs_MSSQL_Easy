let schemas = {
	table: 'Articles',
	primaryKeyColumn: 'Id',
	Id: 'int',
	CompanyId: 'int',
	CategorieId: 'int',
	Title: 'string',
	Slug: 'string',
	Thumb: 'string',
	Summary: 'string',
	ContentArticles: 'string',
	Ordering: 'int',
	Special: 'bool',
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
