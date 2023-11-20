const dbConfig  = require(__path_configs + 'database');
const sqlDataType       = require('mssql');


let addAnything = async (schema, data) =>
{
    try{
        const sql       = require('mssql');    
        var keysData    = Object.keys(data);
        var keysChemas  = Object.keys(schema);
        let countKey    = keysData.length-1;  
        let SqlColumn   = "";
        let strSqlValue = "";
        //==============================
     
        await sql.connect(dbConfig.configMsSqlServer);
        // create request object
        var request = await new sql.Request();           
        // begin create sql string   
        for(let i=0; i < countKey; i++){   
            let column  = keysData[i];// keysData[i] is column name
            let index   = keysChemas.findIndex((key => key === column))
            if(index > -1){ //  found the column in the schema
                SqlColumn       += '['+column + '],';
                strSqlValue     += '@'+ column + ',';
                //let dataType    = schema[column];   // dataType of column name 
                let paramValue  = await createInsertParam(column,schema[column], data[column]);
                let p = paramValue[0];
                await request.input(p.name, p.sqltype, p.value);
            } 
        }// end for for(let i=0; i < countKey; i++)
        let columnEnd   = keysData[countKey]; // keysData[countKey] is the end  column name 
        let index       = keysChemas.findIndex((key => key === columnEnd))//
        if(index > -1) { //  found the column in the schema
            SqlColumn       += '['+columnEnd+']';
            //let dataType    = schema[columnEnd];   // dataType of the end column name 
            let paramValue  = await createInsertParam(columnEnd,schema[columnEnd], data[columnEnd])[0];
            
            await request.input(paramValue.name, paramValue.sqltype, paramValue.value);
            strSqlValue     += '@'+ columnEnd;
        }
        else{
            SqlColumn   = SqlColumn.substr(0,SqlColumn.length-1); // remove the last comma
            strSqlValue = strSqlValue.substr(0,strSqlValue.length-1); // remove the last comma
        }
        let query = ' INSERT INTO [' + schema.table + '] (' + SqlColumn+ ') VALUES (' + strSqlValue+ ') ';
        let results = await request.query(query); 
        sql.close();  
        if(results.rowsAffected[0]==1){
            return 'true';
        } 
    }
    catch(error) {
        return 'false: '+ error
    }        
    return 'false'; 
}


let updateAnything = async (schema, data, primaryKeyValue) =>
{
    try{
        const sql       = require('mssql');    
        var keysData    = Object.keys(data);
        var keysChemas  = Object.keys(schema);
        let countKey    = keysData.length-1;  
        let SqlUpdate   = '';
       
        //==============================
     
        await sql.connect(dbConfig.configMsSqlServer);
        // create request object
        var request = await new sql.Request();           
        // begin create sql string   
        for(let i=0; i < countKey; i++){   
            let column  = keysData[i];// keysData[i] is column name
            let index   = keysChemas.findIndex((key => key === column))
            if(index > -1){ //  found the column in the schema
                SqlUpdate       += ' ['+column + '] = @'+column+', ';                
                let paramValue  = await createInsertParam(column,schema[column], data[column])[0];//let dataType    = schema[column];   // dataType of column name 
                await request.input(paramValue.name, paramValue.sqltype, paramValue.value);// let p = paramValue[0];
            } 
        }// end for for(let i=0; i < countKey; i++)
        let columnEnd   = keysData[countKey]; // keysData[countKey] is the end  column name 
        let index       = keysChemas.findIndex((key => key === columnEnd))//
        if(index > -1) { //  found the column in the schema
            SqlUpdate       += ' ['+columnEnd + '] = @'+columnEnd;         
            let paramValue  = await createInsertParam(columnEnd,schema[columnEnd], data[columnEnd])[0];    //let dataType    = schema[columnEnd];   // dataType of the end column name 
            await request.input(paramValue.name, paramValue.sqltype, paramValue.value);
        }
        else{
            SqlUpdate   = SqlUpdate.substr(0,SqlUpdate.length-1); // remove the last comma
        }

        let primaryKeyColumn = schema.primaryKeyColumn;
        let paramValueWhere  = await createInsertParam(primaryKeyColumn,schema[primaryKeyColumn], primaryKeyValue)[0];    //let dataType    = schema[columnEnd];   // dataType of the end column name 
        await request.input(paramValueWhere.name, paramValueWhere.sqltype, paramValueWhere.value);

        let query = ' UPDATE [' + schema.table + '] SET '+ SqlUpdate + ' WHERE  ['+ primaryKeyColumn+'] = @'+primaryKeyColumn;
       
        let results = await request.query(query); 
        sql.close();  
        if(results.rowsAffected[0]==1){
            return 'true';
        } 
    }
    catch(error) {
        return 'false: '+ error
    }        
    return 'false'; 
}
 
// 
let deleteAnythingByPrimaryKey =  async (schema, primaryKeyValue) => {
    const sql = require('mssql');
    try {    
        await sql.connect(dbConfig.configMsSqlServer);     
        var request = await new sql.Request(); 
        let primaryKeyColumn = schema.primaryKeyColumn;
        let paramValueWhere  = await createInsertParam(primaryKeyColumn,schema[primaryKeyColumn], primaryKeyValue)[0];    //let dataType    = schema[columnEnd];   // dataType of the end column name 
        await request.input(paramValueWhere.name, paramValueWhere.sqltype, paramValueWhere.value);
        let query = ' DELETE [' + schema.table + '] WHERE ['+ primaryKeyColumn+'] = @'+primaryKeyColumn;       
        let results = await request.query(query); 
        sql.close();  
        if(results.rowsAffected[0]!=0){
            return 'true';
        }
    } catch (err) {
        try { sql.close(); }
        catch (err2){}      
        return err;
    }
    return 'false';
}


let executeQueryArrayParam = async (query, arrParams) => {
    const sql = require('mssql');
    try {       
        await sql.connect(dbConfig.configMsSqlServer);        
        var request = await new sql.Request();  
        let lengthParam = arrParams.length;
        for(let index = 0; index < lengthParam; index++)
        {
            let param  = arrParams[index]; 
            let paramValue  = await createInsertParam(param.name, param.type, param.value)[0];           
            await request.input(paramValue.name, paramValue.sqltype, paramValue.value);
        }   
        let results = await request.query(query);
        sql.close();
        return  results;
    } catch (err) {
        try { sql.close(); }
        catch (err2){}      
        return data = {
            status: 'error',
            message: err
        }
    }
}


let executeQuerySchemaParam = async (schemas, query, JsonParamsData ) => {
    const sql = require('mssql');
    try { 
        var keysParams    = Object.keys(JsonParamsData); 
        let countParams   = keysParams.length; 
        await sql.connect(dbConfig.configMsSqlServer);        
        var request = await new sql.Request(); 
        for(let index = 0; index < countParams; index++)
        {
            let paramColumn  = keysParams[index];           
            let paramValue  = await createInsertParam(paramColumn, schemas[paramColumn], JsonParamsData[paramColumn])[0];           
            await request.input(paramValue.name, paramValue.sqltype, paramValue.value);  
        }   
        let results = await request.query(query);
        sql.close();
        return  results;
    } catch (err) {
        try { sql.close(); }
        catch (err2){}      
        return data = {
            status: 'error',
            message: err
        }
    }
}
// get list of data with sql query and array params, in the parameter array, 
// there must be a data type attribute 
// This function is suitable for parameters in many different tables
let selectQueryParamArray = async (querySelect, arrParams) => {
    const sql = require('mssql');
    try {       
        await sql.connect(dbConfig.configMsSqlServer);
        // create request object
        var request = await new sql.Request();  
        let lengthParam = arrParams.length;
        for(let index = 0; index < lengthParam; index++)
        {
            let param  = arrParams[index]; 
            let paramValue  = await createInsertParam(param.name, param.type, param.value)[0];           
            await request.input(paramValue.name, paramValue.sqltype, paramValue.value);
        }        
        let results = await request.query(querySelect); 
        sql.close();
        return  results;
    } catch (err) {
        try { sql.close(); }
        catch (err2){}      
        return data = {
            status: 'error',
            message: err
        }
    }
}

//  get list of data with sql query, Json Params and Schema. JsonParams must belong to schema
//This function matches the parameters in the same table 
let selectQueryParamSchema = async (schema, querySelect, JsonParams) => {
    const sql = require('mssql');
    try {
        var keysParams    = Object.keys(JsonParams); 
        let countParams   = keysParams.length;        
        await sql.connect(dbConfig.configMsSqlServer);       
        var request = await new sql.Request();   
        
        for(let index = 0; index < countParams; index++) {
            let paramColumn  = keysParams[index];           
            let paramValue  = await createInsertParam(paramColumn, schema[paramColumn], JsonParams[paramColumn])[0];           
            await request.input(paramValue.name, paramValue.sqltype, paramValue.value);  
        } 

        let results = await request.query(querySelect); 
        sql.close();
        return  results;
    } catch (err) {
        try { sql.close(); }
        catch (err2){}      
        return data = {
            status: "error",
            message: err
        }
    }
}

let SelectAnyByPrimaryKey  = async (schema, primaryKeyValue) =>{    
    const sql = require('mssql');
    try{
        await sql.connect(dbConfig.configMsSqlServer);
        var request = await new sql.Request(); 
        let primaryKeyColumn = schema.primaryKeyColumn;
        let param  = await createInsertParam(primaryKeyColumn,schema[primaryKeyColumn], primaryKeyValue)[0];    //let dataType    = schema[columnEnd];   // dataType of the end column name 
        await request.input(param.name, param.sqltype, param.value);
        let querySelect = ' SELECT * FROM [' + schema.table + '] WHERE ['+ primaryKeyColumn+'] = @'+primaryKeyColumn; 
        let results = await request.query(querySelect); 
        sql.close();
        return  results;
    }
     catch (err) {
        try { sql.close(); }
        catch (err2){}      
        return data = {
            status: 'error',
            message: err
        }
    }

}

// Get list of data with Procedure and arrParams
// Inside arrParams there must be a data type attribute
let selectDataListProcedure = async (arrParams, Procedure) => {
    const sql = require('mssql');
    try {       
        let pool = await sql.connect(dbConfig.configMsSqlServer)
        const result1 = await pool.request();
        arrParams.forEach(function (param) {
            result1.input(param.name, param.type, param.value);
        });
        let results=  await result1.execute(Procedure);       
    } catch (err) {
        try { sql.close(); }
        catch (err2){}      
        return data = {
            status: "error",
            message: err
        }
    }
}

// This function retrieves data very simply by SQL statement. 
// However, it is easy to get injection errors if you do not handle it carefully 
// Should only be used when the parameter is a number
// It is recommended to limit the use of this function
let selectQuery =  async (sqlQuery) => {
    const sql = require('mssql');
    try {    
        await sql.connect(dbConfig.configMsSqlServer);      
        let results = await sql.query(sqlQuery);
        let result = results.recordset;
        sql.close();     
        return result;
    } catch (err) {
        try { sql.close(); }
        catch (err2){}      
        return data = {
            status: 'error',
            message: err
        }
    }
}


let createInsertParam = (column, dataType, dataValue)=>{
    dataType = dataType.toLowerCase();
    
    let resultDataType;
    switch(dataType) {
        case 'bit':
            resultDataType =  sqlDataType.Bit;
            break;
        case 'boolean':
            if((dataValue == true) ||(dataValue == "true") ||(dataValue == "True")  ||(dataValue == "TRUE") || (dataValue==1)|| (dataValue=="1")) 
                dataValue = true;
            else  dataValue = false;
            resultDataType =  sqlDataType.Bit;           
            break;
        case 'bigint':
            resultDataType =  sqlDataType.BigInt;
            break;
        case 'decimal':
            resultDataType =  sqlDataType.Decimal;
            break;
        case 'float':
            resultDataType =  sqlDataType.Float;
            break;
        case 'int':
            resultDataType =  sqlDataType.Int;
            break;
        case 'money':
            resultDataType =  sqlDataType.Money;
            break;
        case 'numeric':
            resultDataType =  sqlDataType.Numeric;
            break;
        case 'smallint':
            resultDataType =  sqlDataType.SmallInt;
            break;
        case 'smallmoney':
            resultDataType =  sqlDataType.SmallMoney;
            break;        
        case 'real':
            resultDataType =  sqlDataType.Real;
            break;
        case 'tinyint':
            resultDataType =  sqlDataType.TinyInt;
            break;
        case 'number':
            resultDataType =  sqlDataType.Int;
            break;

        case 'char':
            resultDataType =  sqlDataType.NVarChar;
            break;
        case 'text':
            resultDataType =  sqlDataType.Text;
            break;
        case 'ntext':
            resultDataType =  sqlDataType.NText;
            break;
        case 'varchar':
            resultDataType =  sqlDataType.NVarChar;
            break;
        case 'nvarchar':
            resultDataType =  sqlDataType.NVarChar;
            break;
        case 'string':
            resultDataType =  sqlDataType.NVarChar;
            break;
        case 'xml':
            resultDataType =  sqlDataType.Xml;
            break;
        case 'time':
            resultDataType =  sqlDataType.Time;
            break;
        case 'date':
            resultDataType =  sqlDataType.Date;
            break;
        case 'datetime':
            resultDataType =  sqlDataType.DateTime;
            break;
        case 'datetime2':
            resultDataType =  sqlDataType.DateTime2;
            break;
        case 'datetimeoffset':
            resultDataType =  sqlDataType.DateTimeOffset;
            break;
        case 'smalldatetime':
            resultDataType =  sqlDataType.SmallDateTime;
            break;
        case 'uniqueidentifier':
            resultDataType =  sqlDataType.UniqueIdentifier;
            break;
        case 'variant':
            resultDataType =  sqlDataType.Variant;
            break;
            case 'binary':
            resultDataType =  sqlDataType.Binary;
            break;
        case 'varbinary':
            resultDataType =  sqlDataType.VarBinary;
            break;
        case 'image':
            resultDataType =  sqlDataType.Image;
            break;
        case 'udt':
            resultDataType =  sqlDataType.UDT;
            break;
        case 'geography':
            resultDataType =  ssqlDataTypeql.Geography;
            break;
        case 'geometry':
            resultDataType =  sqlDataType.Geometry;
            break; 
        default:
            resultDataType = sqlDataType.NVarChar;  
      };

      var parameters = [
        { name: column, sqltype: resultDataType, value: dataValue},
      ];
    return parameters;
}



module.exports = {    
    addAnything,
    updateAnything,
    selectQuery,
    deleteAnythingByPrimaryKey,
    selectDataListProcedure,
    selectQueryParamSchema,
    selectQueryParamArray,
    SelectAnyByPrimaryKey,
    executeQueryArrayParam,
    executeQuerySchemaParam
    
}


// let createInsertParam = (column, dataType, dataValue, sql)=>{
//     dataType = dataType.toLowerCase();
//     let resultDataType;
//     switch(dataType) {
//         case 'bit':
//             resultDataType =  sql.Bit;
//             break;
//         case 'boolean':
//             if((dataValue == true) ||(dataValue.toLowerCase() == "true") || (dataValue==1)|| (dataValue=="1")) 
//                 dataValue = true;
//             else  dataValue = false;
//             resultDataType =  sql.Bit;           
//             break;
//         case 'bigint':
//             resultDataType =  sql.BigInt;
//             break;
//         case 'decimal':
//             resultDataType =  sql.Decimal;
//             break;
//         case 'float':
//             resultDataType =  sql.Float;
//             break;
//         case 'int':
//             resultDataType =  sql.Int;
//             break;
//         case 'money':
//             resultDataType =  sql.Money;
//             break;
//         case 'numeric':
//             resultDataType =  sql.Numeric;
//             break;
//         case 'smallint':
//             resultDataType =  sql.SmallInt;
//             break;
//         case 'smallmoney':
//             resultDataType =  sql.SmallMoney;
//             break;        
//         case 'real':
//             resultDataType =  sql.Real;
//             break;
//         case 'tinyint':
//             resultDataType =  sql.TinyInt;
//             break;
//         case 'number':
//             resultDataType =  sql.Int;
//             break;

//         case 'char':
//             resultDataType =  sql.NVarChar;
//             break;
//         case 'text':
//             resultDataType =  sql.Text;
//             break;
//         case 'ntext':
//             resultDataType =  sql.NText;
//             break;
//         case 'varchar':
//             resultDataType =  sql.NVarChar;
//             break;
//         case 'nvarchar':
//             resultDataType =  sql.NVarChar;
//             break;
//         case 'string':
//             resultDataType =  sql.NVarChar;
//             break;
//         case 'xml':
//             resultDataType =  sql.Xml;
//             break;
//         case 'time':
//             resultDataType =  sql.Time;
//             break;
//         case 'date':
//             resultDataType =  sql.Date;
//             break;
//         case 'datetime':
//             resultDataType =  sql.DateTime;
//             break;
//         case 'datetime2':
//             resultDataType =  sql.DateTime2;
//             break;
//         case 'datetimeoffset':
//             resultDataType =  sql.DateTimeOffset;
//             break;
//         case 'smalldatetime':
//             resultDataType =  sql.SmallDateTime;
//             break;
//         case 'uniqueidentifier':
//             resultDataType =  sql.UniqueIdentifier;
//             break;
//         case 'variant':
//             resultDataType =  sql.Variant;
//             break;
//             case 'binary':
//             resultDataType =  sql.Binary;
//             break;
//         case 'varbinary':
//             resultDataType =  sql.VarBinary;
//             break;
//         case 'image':
//             resultDataType =  sql.Image;
//             break;
//         case 'udt':
//             resultDataType =  sql.UDT;
//             break;
//         case 'geography':
//             resultDataType =  sql.Geography;
//             break;
//         case 'geometry':
//             resultDataType =  sql.Geometry;
//             break; 
//         default:
//             resultDataType = sql.NVarChar;  
//       };

//       var parameters = [
//         { name: column, sqltype: resultDataType, value: dataValue},
//       ];
//     return parameters;
// }

// let addAnything = async (schema, data) =>
// {
//     const sql       = require('mssql');
  
//     var keysData    = Object.keys(data);
//     var keysChemas  = Object.keys(schema);
//     let countKey    = keysData.length-1;  
//     let SqlColumn   = "";
//     let strSqlValue = "";
//     //==============================
//      try { 
//        await sql.connect(dbConfig.configMsSqlServer,async function(err){
//             if(err){
//                 console.log("there is a database connection error -> "+err);
//                 return "false: there is a database connection error -> "+err;
//             }
//             // create request object
//             var request = await new sql.Request();
//             // begin create sql string   
//             for(let i=0; i < countKey; i++){   
//                 let column  = keysData[i];// keysData[i] is column name
//                 let index   = keysChemas.findIndex((key => key === column))
//                 if(index > -1){ //  found the column in the schema
//                     SqlColumn       += column + ",";
//                     strSqlValue     += "@"+ column + ",";
//                     //let dataType    = schema[column];   // dataType of column name 
//                     let paramValue  = await createInsertParam(column,schema[column], data[column], sql);
//                     let p = paramValue[0];
//                     await request.input(p.name, p.sqltype, p.value);
//                 } 
//             }// end for for(let i=0; i < countKey; i++)
//             let columnEnd   = keysData[countKey]; // keysData[countKey] is the end  column name 
//             let index       = keysChemas.findIndex((key => key === columnEnd))//
//             if(index > -1) { //  found the column in the schema
//                 SqlColumn       += columnEnd;
//                 //let dataType    = schema[columnEnd];   // dataType of the end column name 
//                 let paramValue  = await createInsertParam(columnEnd,schema[columnEnd], data[columnEnd], sql)[0];
                
//                 await request.input(paramValue.name, paramValue.sqltype, paramValue.value);
//                 strSqlValue     += "@"+ columnEnd + "";
//             }
//             else{
//                 SqlColumn   = SqlColumn.substr(0,SqlColumn.length-1); // remove the last comma
//                 strSqlValue = strSqlValue.substr(0,strSqlValue.length-1); // remove the last comma
//             }
//             let query = " INSERT INTO " + schema.table + " (" + SqlColumn+ ") VALUES (" + strSqlValue+ ") ";

//             // query to the database
//             await request.query(query,function(err,result){
//                 sql.close();
//                 if(err){
//                     console.log("error while querying database -> "+err);
//                     return "false: error while querying database -> "+err;
//                 }
//                 if(result.rowsAffected[0]==1)
//                 {
//                     return "true";
//                 }                  
//             });            
//         });
      
//     } catch (err) {
//         try { sql.close(); } catch (err2){}      
//         return err;
        
//     }
//     return "false 123";
// }


// let createInsertValue = (dataType, dataValue)=>{
//     let result = '';
//     switch(dataType) {
//         case 'String':
//         case 'Datetime':            
//             result =  "'" + dataValue + "'";
//           break;
//         case 'Number': 
//         case 'BigInt':  
//             result =  dataValue;
//             break;
//         case 'Boolean':  
//             if((dataValue == true) ||(dataValue == "true") || (dataValue==1)|| (dataValue=="1"))        
//                 result   =  "1";
//             else  result =  "0";
//           break;       
//         break;
//         default:
//             result =  "'" + dataValue + "'";          
//       }
//     return result;
// }

// let addAnything = async (schema, data) =>
// {
//     const sql       = require('mssql');
//     var keysData    = Object.keys(data);
//     var keysChemas  = Object.keys(schema);
//     let countKey    = keysData.length-1;  
//     let SqlColumn   = "";
//     let strSqlValue = "";
//     for(let i=0; i < countKey; i++)
//     {
//         let column  = keysData[i];// keysData[i] is column name
//         let index   = keysChemas.findIndex((key => key === column))
//         if(index > -1){ //  found the column in the schema
//             SqlColumn       += keysData[i] + ",";

//             let dataType    = schema[column];   // dataType of column name 
//             let paramValue  = createInsertValue(dataType, data[column]);
//             strSqlValue     += paramValue + ",";
//         } 
//     }
//     let columnEnd   = keysData[countKey]; // keysData[countKey] is the end  column name 
//     let index       = keysChemas.findIndex((key => key === columnEnd))//
//     if(index > -1) { //  found the column in the schema
//         SqlColumn       += columnEnd;
//         let dataType    = schema[columnEnd];   // dataType of the end column name 
//         let paramValue  = createInsertValue(dataType, data[columnEnd]);
//         strSqlValue     += paramValue;
//     }
//     else{
//         SqlColumn   = SqlColumn.substr(0,SqlColumn.length-1); // remove the last comma
//         strSqlValue = strSqlValue.substr(0,strSqlValue.length-1); // remove the last comma
//     }
//     let strSql = " INSERT INTO " + schema.table + " (" + SqlColumn+ ") VALUES (" + strSqlValue+ ") ";
//     console.log(strSql);
//     try {    
//         await sql.connect(dbConfig.configMsSqlServer);
//         let results = await sql.query(strSql); 
//         let rowsAffected  = results.rowsAffected[0]; 
//         sql.close();    
//         if(rowsAffected==1)
//             return "true";           
//         return "false";        
//     } catch (err) {
//         try { sql.close(); } catch (err2){}      
//         return err;
//     }
// }

