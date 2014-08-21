'use strict';


var userModel = require('../../models/user');
//var userSchema = require('../../models/schemas');
var userLib = require('../../lib/user')();

var logger = require('tracer').colorConsole();

module.exports = function (router) {

	var model = new userModel();
    //mongoose.model('userModel', userSchema);
   
	router.get('/', function(req, res) {

        //debugger;
        
        model.data = model.data || {};

        model.messages = ''; // clear any messages
        
        model.data.userDetails = model.data.userDetails || {};
        model.data.userDetails.meetingPreferences = model.data.userDetails.meetingPreferences || {};
        model.data.userDetails.preferredMeetingDays = model.data.userDetails.preferredMeetingDays || {};
           
        model.data.userDetails.userid = req.user._id;
   
        userLib.findUser(model.data.userDetails, function(err, result){
   
            if(err){
                   res.render('profile/index', model);
            } else {
                logger.trace("i am here 666, userid: " + req.user._id + " result " + result);

                model.data.userDetails.userid = req.user.userid;
                model.data.userDetails.login = req.user.login;
                model.data.userDetails.role = result.role;
                model.data.userDetails.fullName = result.fullName;
                model.data.userDetails.emailId = result.emailId;
                model.data.userDetails.primaryPhone = result.primaryPhone;
                model.data.userDetails.alternativePhone = result.alternativePhone;
                model.data.userDetails.city = result.city;
                model.data.userDetails.state = result.state;
                model.data.userDetails.college = result.college;
                model.data.userDetails.industry = result.industry;
                model.data.userDetails.experience = result.experience;
                model.data.userDetails.gender = result.gender;
                model.data.userDetails.meetingPreferences.phone = result.meetingPreferences.phone;
                model.data.userDetails.meetingPreferences.inPerson = result.meetingPreferences.inPerson;
                model.data.userDetails.meetingPreferences.videoChat = result.meetingPreferences.videoChat;
                model.data.userDetails.preferredMeetingDays.sunday = result.preferredMeetingDays.sunday;
                model.data.userDetails.preferredMeetingDays.monday = result.preferredMeetingDays.monday;
                model.data.userDetails.preferredMeetingDays.tuesday = result.preferredMeetingDays.tuesday;
                model.data.userDetails.preferredMeetingDays.wednesday = result.preferredMeetingDays.wednesday;
                model.data.userDetails.preferredMeetingDays.thursday = result.preferredMeetingDays.thursday;
                model.data.userDetails.preferredMeetingDays.friday =  result.preferredMeetingDays.friday;
                model.data.userDetails.preferredMeetingDays.saturday = result.preferredMeetingDays.saturday;
                model.data.userDetails.linkedinUrl = result.linkedinUrl;

                model.data.firstlogin = req.session.firstlogin;
                req.session.firstlogin = false; // clear initial login flag
                model.messages = ''; // clear any messages

                model.data.userDetails.userid = req.session.userid = req.user._id

                res.render('profile/index', model);
            }
        });
    });


    router.post('/', function(req, res) {

        debugger;
        
        if(req.session.userid){

            logger.trace("i am here in update.......");

        	model.data = model.data || {};
        	logger.trace("i am here in update model.data ......." + model.data);

	        model.data.userDetails = model.data.userDetails || {};
            model.data.userDetails.meetingPreferences = model.data.userDetails.meetingPreferences || {};
            model.data.userDetails.preferredMeetingDays = model.data.userDetails.preferredMeetingDays || {};
	        
	        model.data.userDetails.userid = req.body.userid;
            model.data.userDetails.emailId = req.body.emailId;
	        model.data.userDetails.fullName = req.body.fullName;
	        model.data.userDetails.primaryPhone = req.body.primaryPhone;
            model.data.userDetails.alternativePhone = req.body.alternativePhone;
            model.data.userDetails.city = req.body.city;
            model.data.userDetails.state = req.body.state;            
	        model.data.userDetails.college = req.body.college;
	        model.data.userDetails.industry = req.body.industry;
	        model.data.userDetails.experience = req.body.experience;
            model.data.userDetails.gender = req.body.gender;
            model.data.userDetails.meetingPreferences.phone = req.body.phone;
            model.data.userDetails.meetingPreferences.inPerson = req.body.inPerson;
            model.data.userDetails.meetingPreferences.videoChat = req.body.videoChat;
            model.data.userDetails.preferredMeetingDays.sunday = req.body.sunday;
            model.data.userDetails.preferredMeetingDays.monday = req.body.monday;
            model.data.userDetails.preferredMeetingDays.tuesday = req.body.tuesday;
            model.data.userDetails.preferredMeetingDays.wednesday = req.body.wednesday;
            model.data.userDetails.preferredMeetingDays.thursday = req.body.thursday;
            model.data.userDetails.preferredMeetingDays.friday = req.body.friday;
            model.data.userDetails.preferredMeetingDays.saturday = req.body.saturday;
            model.data.userDetails.linkedinUrl = req.body.linkedinUrl;

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
