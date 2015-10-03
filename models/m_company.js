var model = require('../config/sequelize.js');
var dataTypes = require('sequelize');
var Company = model.define('m_user', {
	
	company_id			: {
		type: dataTypes.INTEGER,
	    primaryKey: true,
	    autoIncrement: true
	    }
},{
	timestamps: false,
	 freezeTableName: true,
	tableName: 'm_company'
},{
	classMethods: {
		associate	:function(models){
			Company.belongsTo(models.m_user)
			
		}
	}
});
module.exports = Company;