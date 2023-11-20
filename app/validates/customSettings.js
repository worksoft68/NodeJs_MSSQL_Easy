const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    key: { min: 3, max: 100 },
    value: { min: 1, max: 1000 },
    ordering: { min: 0, max: 500 },
    status: { value: 'novalue' }
    
}

module.exports = {
    validator: (req) => {      
        // KEY 
        req.checkBody('key', util.format(notify.ERROR_NAME, options.key.min, options.key.max) )
            .isLength({ min: options.key.min, max: options.key.max });

        // VALUE
        req.checkBody('value', util.format(notify.ERROR_NAME, options.value.min, options.value.max) )
        .isLength({ min: options.value.min, max: options.value.max });


        // ORDERING
        req.checkBody('ordering', util.format(notify.ERROR_ORDERING, options.ordering.min, options.ordering.max))
            .isInt({gt: options.ordering.min, lt: options.ordering.max});
        
        // STATUS
        req.checkBody('status', notify.ERROR_STATUS)
            .isNotEqual(options.status.value);

        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        return errors;
    }
}