let schemas = {
	table: 'Sys_CustomSettings',
	primaryKeyColumn: 'KeySettings',
	KeySettings: 'string',
	Image: 'string',
	UseCKEditor: 'bool',
	Value: 'string',
	DefaultValue: 'string',
	Location: 'string',
	StartTime: 'DateTime',
	EndTime: 'DateTime',
	Description: 'string',
	Status: 'bool',
	Ordering: 'int',
	IsSystem: 'bool',
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
