var md5 = require('md5');
var crypto = require('crypto');
var randomstring = require("randomstring");
//var sha1 = require('sha-1');
var jwt = require('jsonwebtoken');
var moment = require('moment');
const dbConnection = require(__path_helpers + 'utils-mssql');
const SendEmail = require(__path_helpers + 'sendEmail');
const MainSchemas = require(__path_schemas + 'sys_User');
const LogModel = require(__path_models + 'systemLog');
const systemConfig = require(__path_configs + 'system');
const functionBranch = 'Sys_User';
const SysPermissionModel = require(__path_models + 'sys_Permission');
const publicFunction = require(__path_helpers + 'publicFunction');
async function getSignedJwtToken(user) {
	return jwt.sign({ id: user.UsersId }, systemConfig.JWT_SECRET, {
		expiresIn: systemConfig.JWT_EXP
	})
}


async function getUserByUserNameEncrypted(UserName_Encrypted) {
	try {
		let dataParams = {
			UserName_Encrypted: UserName_Encrypted
		};
		let querySelect = " select * from Sys_User where UserName_Encrypted = @UserName_Encrypted ";
		let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, querySelect, dataParams);

		return result.recordset[0];
	}
	catch { }
	return {};
}

async function getUserByEmail(Email) {
	try {
		let dataParams = {
			Email: Email
		};
		let querySelect = " select * from Sys_User where Email = @Email ";
		let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, querySelect, dataParams);

		return result.recordset[0];
	}
	catch { }
	return {};
}

// async function  LayTaiKhoanTheoIdDangNhap(id) {
// 	let result = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, id); 

// 	return result;    
//   }


async function saveItem_(item, userLogin) {
	let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
	if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		return 'false';
	}
	item.UserName_Encrypted = md5(item.UserName_Encrypted);
	item.Password = md5(item.Password);
	let data = {
		EmployeeCode: item.EmployeeCode,
		CompanyId: item.CompanyId,
		DepartmentId: item.DepartmentId,
		PositionId: item.PositionId,
		LastName: item.LastName,
		FirstName: item.FirstName,
		UserName: item.UserName,
		UserName_Encrypted: item.UserName_Encrypted,
		Password: item.Password,
		Sex: item.Sex,
		Email: item.Email,
		PhoneNumber: item.PhoneNumber,
		Status: item.Status,
	}
	if (item.UsersId == '') {
		data["User_Id_Created"] = userLogin.UsersId;
		data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
		let status = 406;
		let success = false;
		if (result) {
			let recordset = result.recordset;
			let item = recordset[0];
			data["UsersId"] = item.id;
			status = 201;
			success = true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.UsersId, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'insert',
			data: data,
			message: result
		};
	}
	else {
		data["User_Id_Modified"] = userLogin.UsersId;
		data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
		data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
		let item_Old = await dbConnection.selectAnyByPrimaryKey(MaiMainSchemasnschemas.schemas, item.UsersId);
		if (item_Old) {
			let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.UsersId);
			let status = 200;
			let success = true;
			if (result != true) {
				status = 406;
				success = false;
			}
			data["UsersId"] = item.UsersId;
			LogModel.saveLog("Update", MainSchemas.schemas.table, data.UsersId, data, userLogin);
			return {
				success: success,
				status: status,
				action: 'update',
				data: data,
				message: result
			};
		}
		else {
			return {
				success: false,
				status: 410,
				action: 'update',
				data: data,
				message: 'Not found data'
			};
		}
	}
}


async function saveInsert(item, userLogin) {
	let checkExisting = await checkExistingAccount(item);
	if(checkExisting!=false){
		checkExisting["checkExistingAccount"] = true;		
		return {
			success	: false,
			status	: 406,
			action	: 'insert',
			data	: checkExisting,
			message	: 'AccountAlreadyExists'
		};
	}

	item.UserName_Encrypted = md5(item.UserName_Encrypted);
	item.Password = md5(item.Password);
	let data = {
		EmployeeCode: item.EmployeeCode,
		CompanyId: item.CompanyId,
		DepartmentId: item.DepartmentId,
		PositionId: item.PositionId,
		LastName: item.LastName,
		FirstName: item.FirstName,
		UserName: item.UserName,
		UserName_Encrypted: item.UserName_Encrypted,
		Password: item.Password,
		Sex: item.Sex,
		Email: item.Email,
		PhoneNumber: item.PhoneNumber,
		Status: item.Status,
	}
	data["User_Id_Created"] = userLogin.UsersId;
	data["User_Name_Created"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Created"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	if (item.UsersId == '') {
		let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);

		let status = 406;
		let success = false;
		if (result) {
			let recordset = result.recordset;
			let item = recordset[0];
			data["UsersId"] = item.id;
			status = 201;
			success = true;
		}
		LogModel.saveLog("Insert", MainSchemas.schemas.table, data.UsersId, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'insert',
			data: data,
			message: result
		};
	}
}

async function saveInsertRegister(item, url) {
	let language = await publicFunction.getLanguageJson('sys_User.ini');
	let password = randomstring.generate({ length: 8, charset: 'alphanumeric' }); // create random password
	var hashPassword = crypto.createHash('sha1'); //var hash = crypto.createHash('sha1');
	var hashUserName = crypto.createHash('sha1'); //var hash = crypto.createHash('sha1');

	var dataPassword = hashPassword.update(password, 'utf-8'); //passing the data to be hashed
	item["Password"] = dataPassword.digest('hex'); //Creating the hash in the required format
	item.UserName = item.UserName.toLowerCase();
	item.Email = item.Email.toLowerCase();

	var dataUserName = hashUserName.update(item.UserName, 'utf-8');
	item["UserName_Encrypted"] = dataUserName.digest('hex');

	item.UserName_Encrypted = md5(item.UserName_Encrypted);
	item.Password = md5(item.Password);

	let checkOldUser = await getUserByUserNameEncrypted(item.UserName_Encrypted);
	if (checkOldUser) {
		item.UserName_Encrypted = "";
		item.Password = "";
		return {
			success: false,
			status: 406,
			action: 'registerUser',
			data: item,
			message: language["Message_RegisterFail_AccountAlreadyExists"]
		};
	}

	let checkOldUserByEmail = await getUserByEmail(item.Email);
	if (checkOldUserByEmail) {
		item.UserName_Encrypted = "";
		item.Password = "";
		return {
			success: false,
			status: 406,
			action: 'registerUser',
			data: item,
			message: language["Message_RegisterFail_EmailAlreadyExists"]
		};
	}

	let data = {
		EmployeeCode: '000',
		CompanyId: 1,
		DepartmentId: 5,
		PositionId: 7,
		LastName: item.LastName,
		FirstName: item.FirstName,
		UserName: item.UserName,
		UserName_Encrypted: item.UserName_Encrypted,
		Password: item.Password,
		Email: item.Email,
		PhoneNumber: item.PhoneNumber,
		Status: 'true',
	}

	let result = await dbConnection.addAnythingGetIdentity(MainSchemas.schemas, data);
	let status = 406;
	let success = false;
	if (result) {
		let recordset = result.recordset;
		let item = recordset[0];
		data["UsersId"] = item.id;
		data["Password"] = password;
		status = 201;
		success = true;

		// Send email	
		var date = new Date();
		let email = data.Email;
		let idEmail = ". Id Register " + date.getDay().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();

		let subject = language["Message_RegisterSuccess_Email_Subject"] + idEmail
		let Body = language["Message_RegisterSuccess_Email_Body"];
		Body = Body.replace("%Url", "<a href=\"" + url + "\">" + url + "</a> ");
		Body = Body.replace("%UserName", data.UserName);
		Body = Body.replace("%Password", password);
		// let Body = " You have successfully registered an account on  <a href=\"" + url + "\">" + url + "</a> " +
		// 	". Now you can login to the system with your account   <br />" +
		// 	" UserName: " + data.UserName + "  <br /> " +
		// 	" Password: " + password + "  <br /><br /> " + idEmail;
		let resultSendEmail = await SendEmail.sendEmail({
			email: email,
			subject: subject,
			message: Body
		});
	}
	LogModel.saveLog("Insert", MainSchemas.schemas.table, data.UsersId, data, { FirstName: '', LastName: '', UsersId: '' });
	return {
		success: success,
		status: status,
		action: 'insert',
		data: data,
		message: result
	};
}
async function saveUpdate(item, userLogin) {
	let checkExisting = await checkExistingAccount_update(item);
	if(checkExisting!=false){
		checkExisting["checkExistingAccount"] = true;		
		return {
			success	: false,
			status	: 406,
			action	: 'insert',
			data	: checkExisting,
			message	: 'AccountAlreadyExists'
		};
	}	

	item.UserName_Encrypted = md5(item.UserName_Encrypted);
	item.Password = md5(item.Password);
	let data = {
		EmployeeCode: item.EmployeeCode,
		CompanyId: item.CompanyId,
		DepartmentId: item.DepartmentId,
		PositionId: item.PositionId,
		LastName: item.LastName,
		FirstName: item.FirstName,
		UserName: item.UserName,
		UserName_Encrypted: item.UserName_Encrypted,
		Sex: item.Sex,
		Email: item.Email,
		PhoneNumber: item.PhoneNumber,
		Status: item.Status,
	}
	if (item.Password != '0144712dd81be0c3d9724f5e56ce6685') {
		data["Password"] = item.Password;
	}
	data["User_Id_Modified"] = userLogin.UsersId;
	data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.UsersId);
	if (item_Old) {
	
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.UsersId);


		let status = 200;
		let success = true;
		if (result != true) {
			status = 406;
			success = false;
		}
		data["UsersId"] = item.UsersId;
		LogModel.saveLog("Update", MainSchemas.schemas.table, data.UsersId, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'update',
			data: data,
			message: result
		};
	}
	else {
		return {
			success: false,
			status: 410,
			action: 'update',
			data: data,
			message: 'Not found data'
		};
	}
}

async function saveUpdateProfile(item, userLogin) {
	item.UserName_Encrypted = md5(item.UserName_Encrypted);	
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, item.UsersId);
	item["CompanyId"]		= item_Old.CompanyId;
	let checkExisting = await checkExistingAccount_update(item);
	if(checkExisting != false){
		checkExisting["checkExistingAccount"] = true;		
		return {
			success	: false,
			status	: 406,
			action	: 'insert',
			data	: checkExisting,
			message	: 'AccountAlreadyExists'
		};
	}

	let data = {
		EmployeeCode: item.EmployeeCode,		
		DepartmentId: item.DepartmentId,		
		LastName: item.LastName,
		FirstName: item.FirstName,
		UserName: item.UserName,
		UserName_Encrypted: item.UserName_Encrypted,
		Birthday: moment(item.Birthday).format(systemConfig.format_time_sql_system),		
		Sex: item.Sex,
		Email: item.Email,
		PhoneNumber: item.PhoneNumber,		
		Address: item.Address,		
		Avatar: item.Avatar,		
	}	
	data["User_Id_Modified"] = userLogin.UsersId;
	data["User_Name_Modified"] = userLogin.FirstName + ' ' + userLogin.LastName;
	data["DateTime_Modified"] = moment(Date.now()).format(systemConfig.format_time_sql_system);
	if (item_Old) {	
		let result = await dbConnection.updateAnything(MainSchemas.schemas, data, item.UsersId);
		let status = 200;
		let success = true;
		if (result != true) {
			status = 406;
			success = false;
		}
		data["UsersId"] = item.UsersId;
		LogModel.saveLog("Update", MainSchemas.schemas.table, data.UsersId, data, userLogin);
		return {
			success: success,
			status: status,
			action: 'update',
			data: data,
			message: result
		};
	}
	else {
		return {
			success: false,
			status: 410,
			action: 'update',
			data: data,
			message: 'Not found data'
		};
	}
}

async function changePassword(passwordOld, passwordNew, userLogin) {
	let dataParams = {
		UsersId: userLogin.UsersId,
		Password: passwordOld
	};
	let querySelect = "select * from Sys_User where (Password = @Password) and (UsersId = @UsersId)";
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, querySelect, dataParams);
	let resultOld = result.recordset;
	
	if (resultOld.length > 0) {
		let data = {
			Password: passwordNew,
			TimeChangedPassword: moment(Date.now()).format(systemConfig.format_time_sql_system)
		};
		resultupdate = await dbConnection.updateAnything(MainSchemas.schemas, data, userLogin.UsersId);
		
		return resultupdate;
	}
	
	return false;

}

async function userResetsPassword(item, url) {
	let dataParams = {
		TokenChangePassword: item.token,
	};
	let querySelect = "select * from Sys_User where (TokenChangePassword = @TokenChangePassword)";
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, querySelect, dataParams);
	let resultOld = result.recordset;
	if (resultOld.length > 0) {
		let strNotificationTimeChangedPassword = resultOld[0].NotificationTimeChangedPassword;
		var NotificationTimeChangedPassword = new Date(strNotificationTimeChangedPassword);
		let dateTimeNow = new Date();

		var totalSec = (dateTimeNow.getTime() - NotificationTimeChangedPassword.getTime()) / 1000;
		if (totalSec > 3600) { // 1h
			return false;
		}

		let data = {
			Password: item.Password,
			TokenChangePassword: '',
			NotificationTimeChangedPassword: moment(Date.now()).format(systemConfig.format_time_sql_system)
		};
		resultupdate = await dbConnection.updateAnything(MainSchemas.schemas, data, resultOld[0].UsersId);

		var date = new Date();
		let email = "";
		let idEmail = " Id " + date.getDay().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();
		let subject = "Changed password"; + idEmail;
		let Body = "You just changed the password on the website " + url + "; " + idEmail;

		email = resultOld[0].Email;
		if (email.length > 5) {
			let result = await SendEmail.sendEmail({
				email: email,
				subject: subject,
				message: Body
			});
		}


		return resultupdate;
	}
	return false;

}

async function forgotPassword(UserName_Encrypted, url) {
	let dataParams = {
		UserName_Encrypted: UserName_Encrypted
	};
	let querySelect = " select * from Sys_User where (UserName_Encrypted = @UserName_Encrypted) ";
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, querySelect, dataParams);
	let resultOld = result.recordset;
	if (resultOld.length > 0) {
		let data = {
			UsersId: resultOld[0].UsersId,
			TokenChangePassword: randomstring.generate({ length: 35, charset: 'alphanumeric' }),
			NotificationTimeChangedPassword: moment(Date.now()).format(systemConfig.format_time_sql_system)
		};
		let query = "Update Sys_User set TokenChangePassword = @TokenChangePassword, NotificationTimeChangedPassword = @NotificationTimeChangedPassword   where (UsersId = @UsersId)";
		let resultupdate = await dbConnection.executeQuerySchemaParam2(MainSchemas.schemas, query, data);
		if ((resultupdate[0] != 1)) // gửi email
		{
			return false;
		}

		let prefixAdmin = "";	
		if(systemConfig.prefixAdmin!="")
			prefixAdmin = systemConfig.prefixAdmin+"/";
		url = url + prefixAdmin+"auth/login/forgotPassword/token/" + data.token_change_password;
		

		var date = new Date();
		let email = "";
		let idEmail = ". Id " + date.getDay().toString() + date.getMonth().toString() + date.getFullYear().toString() + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString() + date.getMilliseconds().toString();
		let subject = "Password Recovery"; + idEmail;
		let Body = "You or someone else reported forgetting the website's password ";
		Body += " You can click on the link below to reset your password: <a href=\"" + url + "\">" + url + "</a> or copy link <a href=\"" + url + "\">" + url + "</a> paste in the address bar of your web browser to reset the password <br /><br /> ";
		Body += "<br /> This email is valid for 60 minutes only. <br /> If you are not informed of forgot password, please ignore this email." + idEmail;

		email = resultOld[0].Email;

		if (email.length < 3) {
			return false;
		}

		let result = await SendEmail.sendEmail({
			email: email,
			subject: subject,
			message: Body
		});
		return true;

	}
	return false;

}

async function deleteById(UsersId, userLogin = null) {
	let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, UsersId);
	LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.UsersId, item_Old, userLogin);
	return await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, UsersId);
}

async function deleteList(arrayId, userLogin = null) {
	try {
		// let permissionAccess = await SysPermissionModel.getPermissionByFunction(userLogin.UsersId, functionBranch);
		// if ((permissionAccess.FullAuthority != true) && (permissionAccess.FullOfYourself != true)) {
		// 	return {
		// 		success: false,
		// 		message: 'You have no permission delete'
		// 	};
		// }
		let listId = arrayId["arrayId[]"];
		let lengthListId = listId.length;
		let deleteSuccess = [];
		let deleteError = [];
		for (let i = 0; i < lengthListId; i++) {
			let resultOne = 'fales';
			try {
				let item_Old = await dbConnection.selectAnyByPrimaryKey(MainSchemas.schemas, listId[i]);
				LogModel.saveLog("Delete", MainSchemas.schemas.table, item_Old.UsersId, item_Old, userLogin);
				resultOne = await dbConnection.deleteAnythingByPrimaryKey(MainSchemas.schemas, listId[i]);
			}
			catch (error) { }
			if (resultOne == 'true') {
				deleteSuccess.push(listId[i]);
			}
			else {
				deleteError.push(listId[i]);
			}
		}
		return {
			success: true,
			deleteSuccess,
			deleteError,
			message: 'true'
		};
	}
	catch (error) { }
	return {
		success: false,
		message: 'Error! Delete fail'
	};
}

async function listItems(params, userLogin, options = null) {
	let dataParams = {};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (1=1) ";
	if (options != null) {
		if (options.EmployeeCode != "") {
			dataParams.EmployeeCode = "%" + options.EmployeeCode + "%";
			where += " and (EmployeeCode like @EmployeeCode) ";
		}
		if (options.LastName != "") {
			dataParams.LastName = "%" + options.LastName + "%";
			where += " and (LastName like @LastName) ";
		}
		if (options.FirstName != "") {
			dataParams.FirstName = "%" + options.FirstName + "%";
			where += " and (FirstName like @FirstName) ";
		}
		if (options.UserName != "") {
			dataParams.UserName = "%" + options.UserName + "%";
			where += " and (UserName like @UserName) ";
		}
		
		if (options.Email != "") {
			dataParams.Email = "%" + options.Email + "%";
			where += " and (Email like @Email) ";
		}
		if (options.PhoneNumber != "") {
			dataParams.PhoneNumber = "%" + options.PhoneNumber + "%";
			where += " and (PhoneNumber like @PhoneNumber) ";
		}
	}
	let sql = `  SELECT A.UsersId, A.EmployeeCode, A.CompanyId, B.CompanyName, A.DepartmentId, C.DepartmentName, A.PositionId, D.PositionName, A.LastName, A.FirstName, A.UserName, A.UserName_Encrypted, A.Password, A.Birthday, A.Sex, A.Email, A.PhoneNumber, A.Address, A.District, A.Provincial, A.Nation, A.IsManagement, A.Status, A.LastLoginTime, A.Avatar, A.ReceiveEmail, A.ReceiveSMS, A.FullPathTemporarySave, A.TemporaryFileName, A.PathTemporarySave, A.ManagerCode, A.LinkChangePassword, A.TimeChangedPassword, A.BrowserHeaders, A.StatusLogin, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.Datetime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_User A inner join Sys_Company B on A.CompanyId = B.CompanyId inner join Sys_Department C on A.DepartmentId = C.DepartmentId inner join Sys_Position D on A.PositionId = D.PositionId    ${where}
			ORDER BY UsersId DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function search(params, userLogin, options = null) {
	let dataParams = {};
	let skip = (params.pagination.currentPage - 1) * params.pagination.totalItemsPerPage;
	let where = " WHERE (UsersId != 0) ";
	if (options != null) {
		if (options.EmployeeCode != "") {
			dataParams.EmployeeCode = "%" + options.EmployeeCode + "%";
			where += " and (EmployeeCode like @EmployeeCode) ";
		}
		if (options.LastName != "") {
			dataParams.LastName = "%" + options.LastName + "%";
			where += " and (LastName like @LastName) ";
		}
		if (options.FirstName != "") {
			dataParams.FirstName = "%" + options.FirstName + "%";
			where += " and (FirstName like @FirstName) ";
		}
		if (options.UserName != "") {
			dataParams.UserName = "%" + options.UserName + "%";
			where += " and (UserName like @UserName) ";
		}
		
		if (options.Email != "") {
			dataParams.Email = "%" + options.Email + "%";
			where += " and (Email like @Email) ";
		}
		if (options.PhoneNumber != "") {
			dataParams.PhoneNumber = "%" + options.PhoneNumber + "%";
			where += " and (PhoneNumber like @PhoneNumber) ";
		}
	}
	let sql = `  SELECT A.UsersId, A.EmployeeCode, A.CompanyId, B.CompanyName, A.DepartmentId, C.DepartmentName, A.PositionId, D.PositionName, A.LastName, A.FirstName, A.UserName, A.UserName_Encrypted, A.Password, A.Birthday, A.Sex, A.Email, A.PhoneNumber, A.Address, A.District, A.Provincial, A.Nation, A.IsManagement, A.Status, A.LastLoginTime, A.Avatar, A.ReceiveEmail, A.ReceiveSMS, A.FullPathTemporarySave, A.TemporaryFileName, A.PathTemporarySave, A.ManagerCode, A.LinkChangePassword, A.TimeChangedPassword, A.BrowserHeaders, A.StatusLogin, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified, A.Datetime_Modified 
			, COUNT(*) OVER() as TotalRecord
			FROM Sys_User A inner join Sys_Company B on A.CompanyId = B.CompanyId inner join Sys_Department C on A.DepartmentId = C.DepartmentId inner join Sys_Position D on A.PositionId = D.PositionId    ${where}
			ORDER BY UsersId DESC
			offset ${skip} rows
			fetch next ${params.pagination.totalItemsPerPage} rows only`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

async function getByIdCheckLogin(id) {
	try {
		let dataParams = {
			UsersId: id
		};
		let sql = ` SELECT * FROM Sys_User where (Status = 'true') and (UsersId = @UsersId)`;
		let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
		let user = result.recordset[0];
		if((user.Avatar=='')||(user.Avatar==null)){
			user['Avatar'] = 'User_no_avatar.png'; 
		}
		return user;
	} catch {}
	return {};
}

async function checkExistingAccount(user){
	let dataParams = {	
		CompanyId : user.CompanyId,
		EmployeeCode : user.EmployeeCode,
		UserName : user.UserName,
		Email : user.Email
	};
	let sql = ` SELECT A.UsersId, A.EmployeeCode, A.CompanyId, B.CompanyName, A.DepartmentId, C.DepartmentName, A.PositionId, D.PositionName, A.LastName, A.FirstName, A.UserName, A.UserName_Encrypted, A.Password, A.Birthday, A.Sex, A.Email, A.PhoneNumber, A.Address, A.District, A.Provincial, A.Nation, A.IsManagement, A.Status, A.LastLoginTime, A.Avatar, A.ReceiveEmail, A.ReceiveSMS, A.FullPathTemporarySave, A.TemporaryFileName, A.PathTemporarySave, A.ManagerCode, A.LinkChangePassword, A.TimeChangedPassword, A.BrowserHeaders, A.StatusLogin, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified
				FROM Sys_User A
				inner join Sys_Company B on A.CompanyId = B.CompanyId inner join Sys_Department C on A.DepartmentId = C.DepartmentId inner join Sys_Position D on A.PositionId = D.PositionId 
				where ((A.CompanyId like @CompanyId) and (A.EmployeeCode like @EmployeeCode))
				or (A.UserName like @UserName) or (A.Email like @Email) 
	 `;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	let recordset = result.recordset;
	 if(recordset.length > 0)
		return recordset[0];
	else
		return false;
}


async function checkExistingAccount_update(user){
	let dataParams = { 
		UsersId : user.UsersId,
		CompanyId : user.CompanyId,
		EmployeeCode : user.EmployeeCode,
		UserName : user.UserName,
		Email : user.Email
	};

	let sql = ` SELECT A.UsersId, A.EmployeeCode, A.CompanyId, B.CompanyName, A.DepartmentId, C.DepartmentName, A.PositionId, D.PositionName, A.LastName, A.FirstName, A.UserName, A.UserName_Encrypted, A.Password, A.Birthday, A.Sex, A.Email, A.PhoneNumber, A.Address, A.District, A.Provincial, A.Nation, A.IsManagement, A.Status, A.LastLoginTime, A.Avatar, A.ReceiveEmail, A.ReceiveSMS, A.FullPathTemporarySave, A.TemporaryFileName, A.PathTemporarySave, A.ManagerCode, A.LinkChangePassword, A.TimeChangedPassword, A.BrowserHeaders, A.StatusLogin, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified
				FROM Sys_User A
				inner join Sys_Company B on A.CompanyId = B.CompanyId inner join Sys_Department C on A.DepartmentId = C.DepartmentId inner join Sys_Position D on A.PositionId = D.PositionId 
				where (((A.CompanyId like @CompanyId) and (A.EmployeeCode like @EmployeeCode))
				or (A.UserName like @UserName) or (A.Email like @Email)) and (A.UsersId != @UsersId)
	`;
	 let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	//console.log(result);
	let recordset = result.recordset;
	 if(recordset.length > 0)
		return recordset[0];
	else
		return false;
}

async function getById(UsersId, userLogin = null) {
	let sql = ` SELECT A.UsersId, A.EmployeeCode, A.CompanyId, B.CompanyName, A.DepartmentId, C.DepartmentName, A.PositionId, D.PositionName, A.LastName, A.FirstName, A.UserName, A.UserName_Encrypted, A.Password, A.Birthday, A.Sex, A.Email, A.PhoneNumber, A.Address, A.District, A.Provincial, A.Nation, A.IsManagement, A.Status, A.LastLoginTime, A.Avatar, A.ReceiveEmail, A.ReceiveSMS, A.FullPathTemporarySave, A.TemporaryFileName, A.PathTemporarySave, A.ManagerCode, A.LinkChangePassword, A.TimeChangedPassword, A.BrowserHeaders, A.StatusLogin, A.User_Id_Created, A.User_Name_Created, A.DateTime_Created, A.User_Id_Modified, A.User_Name_Modified
				FROM Sys_User A
				inner join Sys_Company B on A.CompanyId = B.CompanyId inner join Sys_Department C on A.DepartmentId = C.DepartmentId inner join Sys_Position D on A.PositionId = D.PositionId 
				where A.UsersId = ${UsersId} `;
	let results = await dbConnection.selectQueryRecordset(sql);
	let result = results[0];
	return result;
}


async function listItemForDropdown() {
	let sql = ` SELECT UsersId, (LastName + ' '+ FirstName) as FullName 
				FROM Sys_User  where Status = 'true'`;
	return await dbConnection.selectQueryRecordset(sql);
}

async function exportData(item, userLogin) {
	let dataParams = {};
	let where = "";
	where = " WHERE (UsersId != 0) ";
	if (item.EmployeeCode != "") {
		dataParams.EmployeeCode = "%" + item.EmployeeCode + "%";
		where += " and (EmployeeCode like @EmployeeCode) ";
	}
	if (item.LastName != "") {
		dataParams.LastName = "%" + item.LastName + "%";
		where += " and (LastName like @LastName) ";
	}
	if (item.FirstName != "") {
		dataParams.FirstName = "%" + item.FirstName + "%";
		where += " and (FirstName like @FirstName) ";
	}
	if (item.UserName != "") {
		dataParams.UserName = "%" + item.UserName + "%";
		where += " and (UserName like @UserName) ";
	}
	if (item.Password != "") {
		dataParams.Password = "%" + item.Password + "%";
		where += " and (Password like @Password) ";
	}
	if (item.Sex != "") {
		dataParams.Sex = "%" + item.Sex + "%";
		where += " and (Sex like @Sex) ";
	}
	if (item.Email != "") {
		dataParams.Email = "%" + item.Email + "%";
		where += " and (Email like @Email) ";
	}
	if (item.PhoneNumber != "") {
		dataParams.PhoneNumber = "%" + item.PhoneNumber + "%";
		where += " and (PhoneNumber like @PhoneNumber) ";
	}
	let sql = ` SELECT UsersId, EmployeeCode, CompanyId, DepartmentId, PositionId, LastName, FirstName, UserName, UserName_Encrypted, Password, Birthday, Sex, Email, PhoneNumber, Address, District, Provincial, Nation, IsManagement, Status, LastLoginTime, Avatar, ReceiveEmail, ReceiveSMS, FullPathTemporarySave, TemporaryFileName, PathTemporarySave, ManagerCode, LinkChangePassword, TimeChangedPassword, BrowserHeaders, StatusLogin, User_Id_Created, User_Name_Created, DateTime_Created, User_Id_Modified, User_Name_Modified, Datetime_Modified 
			FROM Sys_User   ${where}
			ORDER BY UsersId DESC`;
	let result = await dbConnection.executeQuerySchemaParam(MainSchemas.schemas, sql, dataParams);
	return result.recordset;
}

module.exports = {
	getUserByUserNameEncrypted,
	getUserByEmail,
	getSignedJwtToken,
	saveItem_,
	saveInsert,
	saveInsertRegister,
	saveUpdate,
	saveUpdateProfile,
	forgotPassword,
	userResetsPassword,
	changePassword,
	deleteById,
	deleteList,
	listItems,
	search,
	getByIdCheckLogin,
	getById,
	listItemForDropdown,
	exportData,
	checkExistingAccount,
	checkExistingAccount_update
};
