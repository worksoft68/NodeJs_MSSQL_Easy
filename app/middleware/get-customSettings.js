const CollectionsModel 	= require(__path_models + 'sys_CustomSettings');
module.exports = async(req, res, next) => {    
    await CollectionsModel
            .listItemsFrontend()
            .then( (items) => { res.locals.itemsCustomSettings = items; 
            });
           
    next();
   
}