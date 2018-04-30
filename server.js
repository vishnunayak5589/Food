//Console logs present in this file will be shown on the command prompt.
//Importing functions from express module and using them.

var express  = require('express');
var app = express();

//Importing functions from mongojs module and using them.
var mongojs = require('mongojs');
//referring to our database and the 'orders' collection.
var db = mongojs('orders',['orders']);

var bodyParser = require('body-parser');

//locates all those static files(.html or .css or .js) present in the given directory
app.use(express.static(__dirname + "/public"));

//used for parsing the body of the data
app.use(bodyParser.json());

//All the Api's used will be present here.
app.get('/orders',function (req,res) {
	console.log('I received the get request');
	db.orders.find(function (err,docs) {
		console.log(docs);
		//sending the response back to controller.
		res.json(docs);
	});
	
});
app.post('/orders',function (req,res){
	console.log(req.body);
	db.orders.insert(req.body,function (err,docs){
			res.json(docs);	
	});
});
app.delete('/orders/:id',function (req,res){
	var id = req.params.id;
	console.log(id);
	db.orders.remove({_id: mongojs.ObjectId(id)},function (err,doc){
		res.json(doc);
	});
});
app.get('/orders/:id',function (req,res) {
	var id = req.params.id;
	console.log(id);
	db.orders.findOne({_id: mongojs.ObjectId(id)},function (err,docs) {
		console.log(docs);
		res.json(docs);
	});
});
app.put('/orders/:id',function (req,res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.orders.findAndModify({query: {_id: mongojs.ObjectId(id)},update: {$set:{name:req.body.name,
		email:req.body.email,number:req.body.number}},new: true},function (err,docs) {
		res.json(docs);
	});
});
app.listen(3000);
console.log('Server running on port 3000');
