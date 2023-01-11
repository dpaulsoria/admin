var express = require('express');
var router = express.Router();

let bd = {  
  'usuario': 'abc',  
  'contrasenia': '123'  
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/validate', function(req, res, next) {

  let { user, password } = req.body

  if(user == bd['usuario'] && password == bd['contrasenia']) {
  
    req.session.user = bd['usuario'];
    req.session.admin = true;  
    
    let tracing = req.cookies.tracing  || ''
    if(tracing.length > 0)
      res.redirect(tracing)   
    else
      res.redirect('/');
    
  } else {  
    res.redirect('/login'); 
  }
});

router.get('/invalidate', function(req, res, next) { 
  req.session.destroy();
  res.redirect('/login')
});


module.exports = router;
