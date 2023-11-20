
//const dbConfig  = require(__path_configs + 'database');
const dbConnection = require(__path_helpers + 'utils-mssql');
const Mainschemas = require(__path_schemas + 'contracts');
const systemConfig = require(__path_configs + 'system');

var moment = require('moment');
const table = "HopDong";




async function Getlist() {
  let sql = "select * from HopDong ";
  let result = dbConnection.selectData(sql);
  return result;
}

async function Getlist_Procedure() {
  const sql = require('mssql');
  let sqlParams = [{ "name": "SoHopDong", "type": sql.NVarChar, "value": "a" },
  { "name": "MaKhachHang", "type": sql.NVarChar, "value": 'c' }];
  let result = dbConnection.selectDataListProcedure(sqlParams, "HopDong_TraCuu");
  return result;
}

async function Getlist_SqlParamSchema(data) {
  // let arrParams = [{ "name": "SoHopDong", "value": "%a%" },
  //                   { "name": "MaKhachHang", "value": "%b%" }];
  let dataParams = {
    SoHopDong: '%a%',
    MaKhachHang: '%b%',
  };


  let querySelect = "select * from HopDong where (SoHopDong like @SoHopDong)  and (MaKhachHang like @MaKhachHang)";
  let result = dbConnection.selectQueryParamSchema(Mainschemas.schemas, querySelect, dataParams);
  return result;
}


// Truyền kiểu dữ liệu vào array
async function Getlist_SqlParam2(data) {
  let arrParams = [{ "name": "SoHopDong", "value": "%a%", "type": "string" },
  { "name": "MaKhachHang", "value": "%b%", "type": "string" }];
  let querySelect = "select * from HopDong where (SoHopDong like @SoHopDong)  and (MaKhachHang like @MaKhachHang)";
  let result = dbConnection.selectDataListSqlParamArray(querySelect, arrParams);
  return result;
}





async function addNew(item) {
  let data = {
    SoHopDong: 'a1',
    MaKhachHang: 'b',
    PO: 'c',
    IdNguoBan: 101,
    GhiChu: 'd',
    NgayThemMoi: moment(Date.now()).format(systemConfig.format_time_sql_system),
    TrangThai: "true"
  };
  return await dbConnection.addAnything(Mainschemas.schemas, data);

  //return await dbConnection.updateAnything(Mainschemas.schemas, data, 41);
}

async function deleteItem(item) {
  return await dbConnection.deleteAnythingByPrimaryKey(Mainschemas.schemas, 41);
}


async function LayDanhSachTaiKhoan2() {
  let sql = "select * from NhanVien where Ten like '%Khoa%'";
  let result = dbConnection.selectDataList(sql);

  return result;
}

async function SelectByPrimaryKey() {

  let arrParams = [{ "name": "SoHopDong", "value": "aaaaaaa", "type": "string" },
  { "name": "MaKhachHang", "value": "aaa", "type": "string" },
  { "name": "id", "value": 49, "type": "number" }
  ];
  let query = "update HopDong set SoHopDong = @SoHopDong, MaKhachHang = @MaKhachHang  where (id = @id)";

  let result = dbConnection.executeQueryArrayParam(query, arrParams);
  return result;

  // let result = dbConnection.selectAnyByPrimaryKey(Mainschemas.schemas, 47);

  // return result;    
}

async function executeQueryArrayParam() {

  let arrParams = [{ "name": "SoHopDong", "value": "aaaaaaa", "type": "string" },
  { "name": "MaKhachHang", "value": "aaa", "type": "string" },
  { "name": "id", "value": 49, "type": "number" }
  ];
  let query = "update HopDong set SoHopDong = @SoHopDong, MaKhachHang = @MaKhachHang  where (id = @id)";
  let result = dbConnection.executeQueryArrayParam(query, arrParams);
  return result;
}

async function executeQuerySchemaParam(item) {
  let data = {
    id: 51,
    SoHopDong: 'SoHopDong e',
    MaKhachHang: 'dddd',
    PO: 'PO ddd',
    IdNguoBan: 101,
    GhiChu: 'GhiChu daa',
    NgayThemMoi: moment(Date.now()).format(systemConfig.format_time_sql_system),
    TrangThai: "aaaaa"
  };
  let query = "update HopDong set SoHopDong = @SoHopDong, MaKhachHang = @MaKhachHang, PO  =@PO, IdNguoBan = @IdNguoBan, GhiChu = @GhiChu , NgayThemMoi = @NgayThemMoi, TrangThai = @TrangThai   where (id = @id)";

  let result = dbConnection.executeQuerySchemaParam(Mainschemas.schemas, query, data);
  return result;
}



// async function  update() {
//     const sql = require('mssql');
//     await sql.connect(dbConfig.configMsSqlServer);  
//     const request = new sql.Request();
//     request.stream = true
//     request.query("update NhanVien set Ten = 'An' where id = 2")
//     request.on('rowsaffected', rowCount => {
//     });
//     request.on('done', result => {
//     });
//     return 'aaaaaaaaaaaaaaa';  
// }



module.exports = {
  Getlist: Getlist,
  LayDanhSachUser2: LayDanhSachTaiKhoan2,
  addNew: addNew,
  deleteItem: deleteItem,
  Getlist_Procedure,
  Getlist_SqlParamSchema: Getlist_SqlParamSchema,
  Getlist_SqlParam2: Getlist_SqlParam2,
  SelectByPrimaryKey,
  executeQueryArrayParam,
  executeQuerySchemaParam
};



