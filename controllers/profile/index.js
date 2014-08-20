'use strict';


var userModel = require('../../models/user');
var userLib = require('../../lib/user')();

var logger = require('tracer').colorConsole();

module.exports = function (router) {

    
	var model = new userModel();
   
	router.get('/', function(req, res) {
        
        logger.trace("i am here111");
        model.data = model.data || {};

        model.messages = ''; // clear any messages
        
        model.data.userDetails = model.data.userDetails || {};
        model.data.userDetails.meetingPreferences = model.data.userDetails.meetingPreferences || {};
        
        model.data.userDetails.userid = req.user._id;
        logger.trace("i am here222");
        userLib.findUser(model.data.userDetails, function(err, result){
            logger.trace("i am here444, userid: " +  req.user._id);

            if(err){
                logger.trace("i am here 555, userid: " + req.user._id);
                res.render('profile/index', model);
            } else {
                logger.trace("i am here 666, userid: " + req.user._id + " result " + result);

                model.data.userDetails.userid = req.user._id;
                model.data.userDetails.login = req.user.login;
                model.data.userDetails.fullName = result.fullName;
                model.data.userDetails.role = result.role;
                model.data.userDetails.mobilePhone = result.mobilePhone;
                model.data.userDetails.homePhone = result.homePhone;
                model.data.userDetails.otherPhone = result.otherPhone;
                model.data.userDetails.city = result.city;
                model.data.userDetails.state = result.state;
                model.data.userDetails.college = result.college;
                model.data.userDetails.industry = result.industry;
                model.data.userDetails.experience = result.experience;
                model.data.userDetails.company = result.company;
                model.data.userDetails.gender = result.gender;
                model.data.userDetails.meetingPreferences.phone = result.meetingPreferences.phone;
                model.data.userDetails.meetingPreferences.inPerson = result.meetingPreferences.inPerson;
                model.data.userDetails.meetingPreferences.videoChat = result.meetingPreferences.videoChat;

                model.data.firstlogin = req.session.firstlogin;
                req.session.firstlogin = false; // clear initial login flag
                model.messages = ''; // clear any messages

                model.data.userDetails.userid = req.session.userid = req.user._id

                res.render('profile/index', model);
            }
        });
    });


    router.post('/', function(req, res) {
        
        if(req.session.userid){

            logger.trace("i am here in update.......");

        	model.data = model.data || {};
        	logger.trace("i am here in update model.data ......." + model.data);

	        model.data.userDetails = model.data.userDetails || {};
            model.data.userDetails.meetingPreferences = model.data.userDetails.meetingPreferences || {};
	        
	        model.data.userDetails.userid = req.body.userid;
	        model.data.userDetails.fullName = req.body.fullName;
	        model.data.userDetails.mobilePhone = req.body.mobilePhone;
            model.data.userDetails.homePhone = req.body.homePhone;
            model.data.userDetails.otherPhone = req.body.otherPhone;
	        model.data.userDetails.college = req.body.college;
	        model.data.userDetails.industry = req.body.industry;
	        model.data.userDetails.experience = req.body.experience;
            model.data.userDetails.company = req.body.company;
            model.data.userDetails.gender = req.body.gender;
            model.data.userDetails.meetingPreferences.phone = req.body.phone;
            model.data.userDetails.meetingPreferences.inPerson = req.body.inPerson;
            model.data.userDetails.meetingPreferences.videoChat = req.body.videoChat;
	        model.data.userDetails.city = req.body.city;
            //model.data.userDetails.state = req.body.state;
            model.data.userDetails.linkedin = req.body.linkedin;

	        userLib.updateUser(model.data.userDetails , function (err, result) {
	        	
	        	if(err){
	        		model.messages = err;	
	        		res.render('profile/index', model);
	        	}else{
	        		model.messages = 'Profile Updated';        		
	        		res.render('profile/index', model);	        		
	        	}

	        });
        }else{
            logger.trace("i am here in update.......");
        	res.redirect('/login');
        }
		
    });


    router.get('/:name', function (req, res) {
           res.render('profile/student', model);
    });
};
