var express = require('express')
var router = express.Router()

router.get('/',function(req, res){
	res.render('index.html')
})
router.get('/register',function(req, res){
	res.render('register.html')
})
router.post('/register',function(req, res){
	//console.log(req.body)
})

router.get('/login',function(req, res){
	res.render('login.html')
})
router.post('/login',function(req, res){
	// res.render('index.html')
})

module.exports = router