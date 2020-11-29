var express = require('express');
var empModel = require('../modules/employee');
var uploadModel = require('../modules/upload');
var router = express.Router();
var employee = empModel.find({});
var upfile = uploadModel.find({});
var multer  = require('multer');
var path = require('path');
router.use(express.static(__dirname+'./public/'))

var storage = multer.diskStorage({
  destination:"./public/uploads",
  filename:(req, file, cb) =>{
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage }).single('file');
/* GET home page. */
router.get('/', function(req, res, next) {
  employee.exec((err,data)=>{
    if(err){throw err}
    else{res.render('index', { title: 'Employee Records' , records:data, success:'' });}
  })
});

router.post('/',upload, function(req, res, next) {
  let name = req.body.ename;
  let email = req.body.empmail;
  let etype = req.body.emptype;
  let hourlyrate = req.body.hrlyrate;
  let totalHour = req.body.ttlhrs;
  let total = parseInt(hourlyrate)*parseInt(totalHour);
  let fileName = req.file.filename;
  let detail = new empModel({
    name:name,
    email:email,
    etype:etype,
    hourlyrate:hourlyrate,
    totalHour:totalHour,
    total:total,
    image:fileName
  });
  detail.save((err,data1)=>{
    if(err){throw err;}
    else{
      employee.exec((err,data)=>{
        if(err){throw err}
        else{res.render('index', { title: 'Employee Records' , records:data, success:'Inserted Successfully............' });}
      });
    } 
  })
});


router.post('/search', function(req, res, next) {
  let name = req.body.enamee;
  let email = req.body.empmaill;
  let etype = req.body.emptypee;
  let flterparameter="";
if(name != '' && email != '' && etype != ''){
  flterparameter={$and:[{name:name},
  {$and:[{email:email},{etype:etype}]}]}
}else if(name != '' && email == '' && etype != ''){
  flterparameter={$and:[{name:name},{etype:etype}]}
}else if(name == '' && email != '' && etype != ''){
  flterparameter={$and:[{etype:etype},{etype:etype}]}
}else if(name == '' && email == '' && etype != ''){
  flterparameter={etype}
}else{flterparameter={}}
let empfilter=empModel.find(flterparameter);
empfilter.exec((err,data)=>{
    if(err){throw err}
    else{res.render('index', { title: 'Employee Records' , records:data, success:'' });}
  });
});


router.get('/delete/:id', function(req, res, next) {
  let db_id= req.params.id;
  let delRecord = empModel.findByIdAndDelete(db_id);
  delRecord.exec((err)=>{
    if(err){throw err}
    else{res.redirect('/')}
  })
});


router.get('/edit/:id', function(req, res, next) {
  let db_id= req.params.id;
  let getRecord = empModel.findById(db_id);
  getRecord.exec((err,data)=>{
    if(err){throw err}
    else{res.render('edit', { title: 'Employee Records' ,records:data });}
  })
});

router.post('/edit/',upload, function(req, res, next) {
  let UpdateRecord="";
  if(req.file){
    let db_id= req.body.idd;
    let name = req.body.ename;
    let email = req.body.empmail;
    let etype = req.body.emptype;
    let hourlyrate = req.body.hrlyrate;
    let totalHour = req.body.ttlhrs;
    let total = parseInt(hourlyrate)*parseInt(totalHour);
    let fileName = req.file.filename;
     UpdateRecord = empModel.findByIdAndUpdate(db_id,{name:name ,
       email:email, 
       etype:etype,
       hourlyrate:hourlyrate , 
       totalHour: totalHour,
       total:total,
       image:fileName});
  }else{
    let db_id= req.body.idd;
    let name = req.body.ename;
    let email = req.body.empmail;
    let etype = req.body.emptype;
    let hourlyrate = req.body.hrlyrate;
    let totalHour = req.body.ttlhrs;
    let total = parseInt(hourlyrate)*parseInt(totalHour);
     UpdateRecord = empModel.findByIdAndUpdate(db_id,{name:name ,
       email:email, 
       etype:etype,
       hourlyrate:hourlyrate , 
       totalHour: totalHour,
       total:total});
  }

  UpdateRecord.exec((err,data)=>{
    if(err){throw err}
    else{res.redirect('/')}
  })
});


router.get('/upload', function(req, res, next){
  upfile.exec((err,data)=>{
    if(err){throw err;}
    else{res.render('upload_file',{title:'Employee Records',success:'', records:data})}
  })
})




router.post('/upload',upload, function(req, res, next){
  let fileName = req.file.filename;
  let success = req.file.filename + "uploaded successfully ";
  let uploadfile = new uploadModel({
    imagename:fileName
  })
  uploadfile.save((err,data1)=>{
    if(err){throw err;}
    else{
      upfile.exec((err,data)=>{
        if(err){throw err;}
        else{res.render('upload_file',{title:'Employee Records',success:success, records:data})}
      })}
  })
})

module.exports = router;
