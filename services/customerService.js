var Customer = require('../models/customer.js');

exports.addCustomer = function(req, res){
	
	Customer.create({ name: req.param('name'),address : req.param('address'), phone : req.param('phone'), email: req.param('email') })
	.then(function(err, resu){
		if(err)
			res.send(err);
		else
			res.send(resu);
	})
};
exports.getAllCustomer = function(req, res){
	Customer.findAll().then(function(err, customers) {
		if(err)
			res.send(err);
		else
			res.send(customers);
	})
}
exports.getCustomer = function(req, res){
	Customer.findById(req.param('id'), function(err, customer){
		if(err)
			res.send(err);
		else
			res.send(customer);
	});
};

exports.editCustomer = function(req, res){
	Customer.findById(req.param('id'), function(err, customer){
		if(err)
			res.send(err);
		else{
			customer.name	= req.param('name') || customer.name;
			customer.address= req.param('address') || customer.address;
			customer.email	= req.param('email') || customer.email;
			customer.phone	= req.param('phone') || customer.phone;
			customer.save();
			res.send('Edit Success');
		}
			
	});
};

exports.deleteCustomer = function(req, res){
	Customer.findById(req.param('id'), function(err, customer){
		if(err)
			res.send(err);
		else
			res.send(customer);
	});
};