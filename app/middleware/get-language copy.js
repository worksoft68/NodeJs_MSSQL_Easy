//*************************************************************************************
//This middleware is language interface for backen and fontend of the same server
//*************************************************************************************

const publicFunction = require(__path_helpers + 'publicFunction');
exports.language = (...parameter) => {
  return async (req,res,next) => {
    let functionBranch = parameter[0];
    let name_cookie_language = 'language_'+functionBranch;
    res.cookie('infoa', '123', { signed: true }); 
    res.cookie('infob', '123b', { signed: false });
    
    let languageObject  = req.signedCookies['language_'+functionBranch];
   // let got_Language = false;
    if((typeof languageObject !== 'undefined') && languageObject) {
      let last_Time = new Date(languageObject.time);
      console.log(last_Time);
    console.log('444444444444444444444');
      let now = new Date();
      last_Time.setDate(last_Time.getMinutes() + 30);         
      if(last_Time > now){ // already got the language
        next();
      }
    }
    let languageText = await publicFunction.getLanguageJson(functionBranch + ".ini");
    let languageInterface = {};
    if(languageText != 'file_not_exists'){
      languageInterface = {
        text: languageText,
        time: new Date(),
      }

      let options = {
        expirers : new Date (
          Date.now() + 10 * 10 * 1000
        )
      }
       res.cookie('language_'+functionBranch,languageInterface, options)// 10 phút
      // res.cookie('language', languageInterface); // ghi cookie  user      

    res.cookie('language123', languageInterface);
    res.cookie('language1234', 'aaaaaaaaaaaaaaaaaaaaaaaaa');

      req['language_'+functionBranch] = languageInterface;
      req['language_'+functionBranch+'_time'] = new Date();
    }
    
    
    next(); 
  }
}

