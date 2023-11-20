const clean = require('xss-clean/lib/xss').clean;
const collection = "sys_Department";
const systemConfig = require(__path_configs + 'system');
const MainControllers = require(__path_controllers + collection);
const MainModel = require(__path_models + collection);
const MainValidate = require(__path_validates + collection);
const Sys_CompanyModel = require(__path_models + 'sys_Company');
const BanModel = require(__path_models + 'ban');
const SysPermissionModel = require(__path_models + 'sys_Permission');
const ParamsHelpers = require(__path_helpers + 'params');
const publicFunction = require(__path_helpers + 'publicFunction');
const linkIndex = systemConfig.prefixAdmin + '/' + collection + '/';
const pageTitleIndex = 'Danh mục phòng ban';
const folderView = __path_views_backend + collection + '/';

module.exports = {
    index: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
        let params = await ParamsHelpers.createParam(req);
        let languageString = await publicFunction.getLanguage(collection + ".ini");
        const catalogue = [];
        sys_company = await Sys_CompanyModel.listItemForDropdown();
        catalogue.push(sys_company);
        ban = await BanModel.listItemForDropdown();
        catalogue.push(ban);
        let catalogueString = JSON.stringify(catalogue);
        MainModel.listItems(params, userLogin).then((items) => {
            if (items.length > 0)
                params.pagination.totalItems = items[0].TotalRecord;
            else params.pagination.totalItems = 0;
            let itemString = JSON.stringify(items);
            let paramsString = JSON.stringify(params);
            res.render(`${folderView}list`, {
                pageTitle: pageTitleIndex,
                itemString,
                item: {},
                params: paramsString,
                language: languageString,
                catalogue: catalogueString,
            });
        });
    },
    // end index =================================================================================================
    searchGet: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        await SysPermissionModel.checkPermissionAccess(userLogin.UsersId, collection, res)
        let params = await ParamsHelpers.createParam(req);
        let languageString = await publicFunction.getLanguage(collection + ".ini");
        const catalogue = [];
        sys_company = await Sys_CompanyModel.listItemForDropdown();
        catalogue.push(sys_company);
        ban = await BanModel.listItemForDropdown();
        catalogue.push(ban);
        let catalogueString = JSON.stringify(catalogue);
        let item = {
            DepartmentName: await ParamsHelpers.getParam(req.query, 'DepartmentName', ''),
            Abbreviation: await ParamsHelpers.getParam(req.query, 'Abbreviation', ''),
        };
        item = clean(item);
        MainModel.search(params, userLogin, item).then((items) => {
            if (items.length > 0)
                params.pagination.totalItems = items[0].TotalRecord;
            else params.pagination.totalItems = 0;
            let itemString = JSON.stringify(items);
            let paramsString = JSON.stringify(params);
            res.render(`${folderView}list`, {
                pageTitle: pageTitleIndex,
                itemString,
                item,
                params: paramsString,
                language: languageString,
                catalogue: catalogueString,
            });
        });
    },
    // end searchGet =================================================================================================
    save: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        let result = await SysPermissionModel.save(userLogin, collection);
        if (result.success == false) {
            return res.status(result.status).send({ status: result.status, success: result.success, data: result });
        }
        let err = await validateReq(req, res, next);
        if (!err) {
            req.body = JSON.parse(JSON.stringify(req.body));
            let item = Object.assign(req.body);
            item = clean(item);
            await MainModel.saveInsert(item, userLogin).then((result) => {
                res.status(result.status).send({ status: result.status, success: result.success, data: result })
            });
        }
    },
    // end save =================================================================================================
    update: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        let result = await SysPermissionModel.save(userLogin, collection);
        if (result.success == false) {
            return res.status(result.status).send({ status: result.status, success: result.success, data: result });
        }
        let err = await validateReq(req, res, next);
        if (!err) {
            req.body = JSON.parse(JSON.stringify(req.body));
            let item = Object.assign(req.body);
            item = clean(item);
            await MainModel.saveUpdate(item, userLogin).then((result) => {
                return res.status(result.status).json({ status: result.status, success: result.success, data: result })
            });
        }
    },
    // end update =================================================================================================

    getById: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        let result = await SysPermissionModel.getData(userLogin, collection);
        if (result.success == false) {
            return res.status(result.status).send({ status: result.status, success: result.success, data: result });
        }
        let id = ParamsHelpers.getParam(req.params, 'id', '');
        await MainModel.getById(id, userLogin).then((result) => {
            res.send({
                'success': true,
                'data': result
            });
        });
    },
    // end getById =================================================================================================
    search: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        let result = await SysPermissionModel.getData(userLogin, collection);
        if (result.success == false) {
            return res.status(result.status).send({ status: result.status, success: result.success, data: result });
        }
        req.body = JSON.parse(JSON.stringify(req.body));
        let item = Object.assign(req.body);
        item = clean(item);
        let params = await ParamsHelpers.createPagination(item);
        await MainModel.search(params, userLogin, item).then((result) => {
            if (result.length > 0) params.pagination["totalItems"] = result[0].TotalRecord;
            else params.pagination["totalItems"] = 0;
            res.send({
                result,
                params,
                item
            });
        });
    },
    // end search =================================================================================================
    deleteById: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        let result = await SysPermissionModel.deleteItem(userLogin, collection);
        if (result.success == false) {
            return res.status(result.status).send({ status: result.status, success: result.success, data: result });
        }
        req.body = JSON.parse(JSON.stringify(req.body));
        let item = Object.assign(req.body);
        item = clean(item);
        await MainModel.deleteById(item.DepartmentId, userLogin).then((result) => {
            res.send({
                'success': result
            });
        });
    },
    // end deleteById =================================================================================================
    deleteList: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        let result = await SysPermissionModel.deleteItem(userLogin, collection);
        if (result.success == false) {
            return res.status(result.status).send({ status: result.status, success: result.success, data: result });
        }
        req.body = JSON.parse(JSON.stringify(req.body));
        let item = Object.assign(req.body);
        item = clean(item);
        await MainModel.deleteList(item, userLogin).then((result) => {
            res.send({
                result
            });
        });
    },
    // end deleteList =================================================================================================



    exportData: async function (req, res, next) {
        let userLogin = publicFunction.getUserLogin(req, res);
        let result = await SysPermissionModel.getData(userLogin, collection);
        if (result.success == false) {
            return res.status(result.status).send({ status: result.status, success: result.success, data: result });
        }
        req.body = JSON.parse(JSON.stringify(req.body));
        let item = Object.assign(req.body);
        item = clean(item);
        await MainModel.exportData(item, userLogin).then((result) => {
            res.send({
                result
            });
        });
    },
    // end exportData =================================================================================================

};
const validateReq = async (req, res, next) => {
    let err = await MainValidate.validator(req);
    if (Object.keys(err).length > 0) {
        return res.status(400).json({ status: 400, success: true, error: err })
    }
    return false;
}