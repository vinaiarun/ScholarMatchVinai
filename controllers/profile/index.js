'use strict';


var ProfileModel = require('../../models/profile');
var userLib = require('../../lib/user')();

var logger = require('tracer').colorConsole();

module.exports = function (router) {

    
	var model = new ProfileModel();
   
	router.get('/', function(req, res) {
        
        logger.trace("i am here");
        model.data = model.data || {};

        model.messages = ''; // clear any messages
        
        model.data.userDetails = model.data.userDetails || {}
        model.data.userDetails.login = req.user.login;
        model.data.userDetails.fullName = req.user.fullName;
        model.data.userDetails.role = req.user.role;
        model.data.userDetails.mobilePhone = req.user.mobilePhone;
        model.data.userDetails.homePhone = req.user.homePhone;
        model.data.userDetails.otherPhone = req.user.otherPhone;
        model.data.userDetails.college = req.user.college;
        model.data.userDetails.industry = req.user.industry;
        model.data.userDetails.experience = req.user.experience;
        model.data.userDetails.company = req.user.company;
        model.data.userDetails.gender = req.user.gender;
        //model.data.userDetails.meetingPreferences.phone = req.user.phone;
        //model.data.userDetails.meetingPreferences.inPerson = req.user.inPerson;
        //model.data.userDetails.meetingPreferences.videoChat = req.user.videoChat;
        logger.trace("i am here");
        console.log(req.user.city);
        logger.trace("i am here");
        model.data.userDetails.city = req.user.city;
        model.data.userDetails.state = req.user.state;
        logger.trace("i am here");
        model.data.userDetails.linkedin = req.user.linkedin;

        model.data.userDetails.userid = req.session.userid = req.user._id

        model.data.firstlogin = req.session.firstlogin;

        req.session.firstlogin = false; // clear initial login flag

        res.render('profile/index', model);
    });


    router.post('/', function(req, res) {
        
        if(req.session.userid){

        	model.data = model.data || {};        
	        model.data.userDetails = model.data.userDetails || {}
	        
	        model.data.userDetails.fullName = req.body.fullName;
	        model.data.userDetails.mobilePhone = req.body.mobilePhone;
            model.data.userDetails.homePhone = req.body.homePhone;
            model.data.userDetails.otherPhone = req.body.otherPhone;
	        model.data.userDetails.college = req.body.college;
	        model.data.userDetails.industry = req.body.industry;
	        model.data.userDetails.experience = req.body.experience;
            model.data.userDetails.company = req.body.company;
	        model.data.userDetails.gender = req.body.gender;
            model.data.userDetails.meetingPreferences.phone = req.user.phone;
            model.data.userDetails.meetingPreferences.inPerson = req.user.inPerson;
            model.data.userDetails.meetingPreferences.vidoChat = req.user.vidoChat;
	        model.data.userDetails.city = req.body.city;
            model.data.userDetails.state = req.body.state;
            model.data.userDetails.linkedin = req.body.linkedin;

	        // console.dir(model.data.userDetails);

	        userLib.updateUser(model.data.userDetails , function (err, result) {
	        	
	        	if(err){
	        		model.messages = err;	
	        		// model.messages.status = 'error';	 - Need to add this later
	        		res.render('profile/index', model);
	        	}else{
	        		// console.log('result '  + result);
	        		// model.messages.status = 'success';
	        		model.messages = 'Profile Updated';        		
	        		res.render('profile/index', model);	        		
	        	}

	        });
        }else{
        	res.redirect('/login');
        }
		
    });


    router.get('/:name', function (req, res) {
        
        res.render('profile/student', model);
        
    });
};
