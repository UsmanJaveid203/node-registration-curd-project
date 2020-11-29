const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://usmanjaved:usman@cluster0.vay5k.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true,});
var conn =mongoose.Collection;
var employeeSchema =new mongoose.Schema({
    name: {type:String, 
        required: true, 
        },
	email: { 
        type:String, 
        required: true,
        index: {
            unique: true, 
        }},
    etype: {type:String, 
        required: true, 
        },
    hourlyrate: {
        type:Number, 
        required: true
    },
    totalHour: {
        type:Number, 
        required: true
    },
    total:{type:Number},
    image: {type:String},
    date:{
        type: Date, 
        default: Date.now }
});

var employeeModel = mongoose.model('users_infor', employeeSchema);
module.exports=employeeModel;

  