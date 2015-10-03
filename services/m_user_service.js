var User = require('../models/m_user.js');
var Customer = require('../models/m_customer.js');

exports.signup = function(req, res){
	User.findOne({ where : {login_id : req.param('email')}})
	.then(function(err, user){
		if(err){
			console.log(err);
			res.send(err);
		} else if(!user){
			console.log(user);
			res.send(user);
		} else{
			user.login_id	= req.param('email'),
			user.user_name	= req.param('firstname')+' '+req.param('lastname'),
			user.login_pwd	= req.param('password'),
			user.company_id	= req.param('companyid')
			
		}
			
	});
	Customer.create({
		cus_first_name	: req.param('firstname'),
		cus_last_name	: req.param('lastname'),
		email_id		: req.param('email'),
		mobile_no		: req.param('mobile'),
		company_id		: req.param('companyid')
	})
	.then(function(err, user){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log(user);
			res.send(user);
		}
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