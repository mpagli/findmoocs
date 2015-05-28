var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
	title: String,
	description: String,
	theta : { type : Array , "default" : [] },
	imageURL: String,
	courseURL: String,
	source: String,
	affiliates: { type : Array , "default" : [] }
});

mongoose.model('Course',CourseSchema);