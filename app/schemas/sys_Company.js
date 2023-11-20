//**************************************************************************************************************************
//     Creation time: Monday, 29 May 2023 2:19 PM
//     Creator: 
//**************************************************************************************************************************
let schemas = {
	table: 'Sys_Company',
	primaryKeyColumn: 'CompanyId',
	CompanyId: 'Int64',
	CompanyName: 'string',
	Address: 'string',
	Provincial: 'Int64',
	District: 'Int64',
	Email1: 'string',
	Email2: 'string',
	PhoneNumber1: 'string',
	PhoneNumber2: 'string',
	NumberWorkers: 'int',
	Notes: 'string',
	RenewalDate: 'DateTime',
	ExpirationDate: 'DateTime',
	RepresentativeName: 'string',
	LinkFaceBook: 'string',
	UpdatePerson: 'Int64',
	UpdateDay: 'DateTime',
	RegistrationAmount: 'int',
	RegisteredStorage: 'int',
	RegisteredSMS: 'int',
	RegistrationAmountSMS: 'int',
	BankAccountNumber1: 'string',
	BankName1: 'string',
	BankAccountNumber2: 'string',
	Status: 'string',
	BankName2: 'string',
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
