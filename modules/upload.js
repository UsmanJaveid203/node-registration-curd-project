const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://usmanjaved:usman@cluster0.vay5k.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,});
var conn =mongoose.Collection;
var uploadSchema =new mongoose.Schema({
    imagename: {type:String},
    date:{
        type: Date, 
        default: Date.now }
});

var uploadModel = mongoose.model('upload_infor', uploadSchema);
module.exports=uploadModel; 