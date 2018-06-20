let Sequelize = require('sequelize');
let url = process.env.DATABASE_URL || "sqlite: //url;";
let sequelize = new Sequelize(url);

let User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING,
		unique: true,
		validate: {notEmpty: {msg:"Username can not be empty."}},
	},

	name: {
		type: Sequelize.STRING,
		validate: {notEmpty: {msg:"Name can not be empty."}},
	},

	isOnline: {
		type: Sequelize.BOOLEAN,
		validate: {notEmpty: {msg:"IsOnline can not be empty."}},
	},
});

let Messages = sequelize.define(messages, {
	userId: {
		type: Sequelize.INTEGER,
		validate: {notEmpty: {msg:"UserId can not be empty."}},
	},

	date: {
		type: Sequelize.DATE,
		validate: {notEmpty: {msg:"Date can not be empty."}},
	}

	message: {
		type: Sequelize.STRING,
		validate: {notEmpty: {msg:"Message can not be empty."}},
	},
});

Messages.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Messages, {as: 'author', foreignKey: 'userId'});

sequelize.sync()
	.then(() => {
		console.log("Database updated");
	})
	.catch((error) => {
		console.log("Error in database");
	})

exports.User = User;
exports.Messages = Messages;
exports.sequelize = sequelize;