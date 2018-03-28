
const NOTIFY_MISSING_PERMISSIONS = "Please enable Location permissions in the Amazon Alexa app.";
const ALL_ADDRESS_PERMISSION = "read::alexa:device:all:address";
const PERMISSIONS = [ALL_ADDRESS_PERMISSION];
const NO_ADDRESS = "It looks like you don't have an address set. You can set your address from the companion app.";

 let speechOutput;
 let reprompt;
 let controller = require('./controller.js');
 //let Speech = require('ssml-builder');
 const config = require('./config.js');
 const welcomeOutput = "Welcome to MLC Life Insurance. <break time='250ms'/> You can get an indicative quote  by saying  <break time='250ms'/> get quote  <break time='250ms'/>for  different insurance products like Life Cover, Critical Illness and Income Protection. <break time='250ms'/> I have sent the details to your Alexa App for further reference. ";
 const welcomeReprompt = "I did not hear anything.  You can get indicative quote for  different inurances products like Life Cover , Crtical Illness and Income Protection. <break time='250ms'/> I have sent home card to your Alexa App for further referernce. <break time='250ms'/>So try it out";
 const welcomeCard = "Welcome Quote Insurance Advisor skill. You can get policy quote  by asking ALexa  get me policy quote." +
 "User  need to provide Insutance type he is interested in : \n" +
 "\n\u22C5 Policy Number" +
  "\n\u22C5 Customer Name \n"

  const welcomeInsuranceSummary = "Welcome to Insurance Premium Summary Skill. <break time='250ms'/> ."+
  "You can get insurance summary details by providng key parameters like line of business , <break time='50ms'/> region and <break time='50ms'/> period .<break time='250ms'/>I have sent home card to your Alexa App for further referernce. <break time='250ms'/>So try it out "

var gcal = require('google-calendar');


var MongoMock = require('mongomock');
let Speech = require('ssml-builder');
//initial mock data
var db = {
   advisorDetails:[
        {
           "address":"268 Flinders Street Melbourne 3000",
           "availabledate": "2018-03-22",
           "availableStartSlot":"17:00",
           "availableEndSlot":"18:00",
           "name":"John",
           "emailId" : "mohit.sharma4@techmahindra.com"
        }
   ],
   deviceDetails:[
        {
           "deviceId":"XYZ",
           "emailId": "naqueeb.mehdi@techmahindra.com",
           "address":"268 Flinders Street Melbourne 3000"
        }
   ]
}

var mongo = new MongoMock(db);


 // 2. Skill Code =======================================================================================================

'use strict';
const Alexa = require('alexa-sdk');
let APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
const APP_NAME = "Insurance Advisor"

const handlers = {
    'LaunchRequest': function () {
      this.response.speak(welcomeOutput).listen(welcomeReprompt);
      let cardTitle = "Skill: " + APP_NAME;
      this.response.cardRenderer(cardTitle, welcomeCard);
      this.emit(':responseReady');
    //this.emit(":tellWithPermissionCard", NOTIFY_MISSING_PERMISSIONS, PERMISSIONS);
    },
    'insurancePremiumSummary': function () {
    //  this.response.speak(welcomeInsuranceSummary).listen(welcomeInsuranceSummary);
      this.emit(':ask',welcomeInsuranceSummary,welcomeInsuranceSummary);
    },
    'getInsurancePremiumSummary': function () {

      var filledSlots = delegateSlotCollection.call(this);
      let slots = this.event.request.intent.slots;
      controller.getInsuranceSummary(slots.lob.value.toLowerCase(),slots.Period.value.toLowerCase(),slots.Region.value.toLowerCase(),this)

    },
    'getQuote': function () {

        var filledSlots = delegateSlotCollection.call(this);
        if(!filledSlots) {
          return;
        }
        console.log(JSON.stringify(filledSlots));

      var slots= this.event.request.intent.slots;
       var sumAssured = parseInt(slots["questionThree"].value) * 10;

        console.log(JSON.stringify(slots));
var handler1 = this;
      let speech = new Speech();

      mongo.collection('deviceDetails').
      find( {"deviceId": "XYZ" } ).toArray(function(err,results1){
       mongo.collection('advisorDetails').
         find( {"address": results1[0].address } ).toArray(function(err,results2){

                 var google_calendar = new gcal.GoogleCalendar("ya29.Glt_BbWe03LKfJdoHL8gYzB0TXUj4fy5pTRZbuYaWMs4bF49gzCgTIF-YX03x_UEKCoc0JcicpRVVz40avW53ZMY0oltsAsI_LmttFhM1c2SY5g5X4pyC7h-wIK5");
               var moment = require('moment-timezone');

               console.log( moment.tz("2018-03-15 09:55", "Australia/Sydney").format());
                 //  console.log(moment.tz("2018-03-15 09:55", "Australia/Sydney"));
             /*  var event = {
                                    summary: "AdvisorVisit",
                                    start: {
                                        dateTime:  moment.tz("2018-03-22 09:55", "Australia/Sydney").format(),
                                        timeZone: "Australia/Sydney"
                                    },
                                    end: {
                                        dateTime:moment.tz("2018-03-22 10:55", "Australia/Sydney").format(),
                                        timeZone: "Australia/Sydney"
                                    },
                                    attendees: [
                                      {"email": "naqueeb.mehdi@techmahindra.com"},
                                     {"email": "mohit.sharma4@techmahindra.com"}
                                    ],
                                    "description": "Life Insurance Proposal \n" +
                                                 "Date : 14/03/2018 \n" +
                                               " 1. Proposal Reference Number : 2 \n"+
                                               " 2. General Information \n" +
                                                   "\tName : praveen Ram \n" +
                                                   "\tAge : 28\n" +
                                                   "\tAddress : Kondapur ,Hyderabad ,Telangana ,500084 \n" +
                                                   "\tGender : Male\n" +
                                                   "\tEmail : test@test.com\n" +
                                               "3. Quote Details \n" +
                                                     " \tType of Policy : Term Life \n" +
                                                     " \tIndicative Premium : ₹22,500.00* \n" +
                                                     " \tSum Assured : ₹500,000.00 \n" +
                                                     " \tPremium frequency : Annual \n"
                                  };*/
                                  var UniqueNumber = require("unique-number");

                var uniqueNumber = new UniqueNumber(true);
console.log(results2[0].availableStartSlot);
                                  var event = {
                                                         summary: "Appointment with MLC Life Adviser",
                                                         start: {
                                                             dateTime:  moment.tz(results2[0].availabledate + ' ' + results2[0].availableStartSlot , "Australia/Sydney").format(),
                                                             timeZone: "Australia/Sydney"
                                                         },
                                                         end: {
                                                             dateTime: moment.tz(results2[0].availabledate + ' ' + results2[0].availableEndSlot, "Australia/Sydney").format(),
                                                             timeZone: "Australia/Sydney"
                                                         },
                                                         attendees: [
                                                           {"email": results2[0].emailId},
                                                          {"email": results1[0].emailId}
                                                         ],
                                                         "description": "Life Insurance Proposal \n" +
                                                                      "Date : " +new Date().toISOString().slice(0,10)+" \n" +
                                                                    " 1. Proposal Reference Number :" +  uniqueNumber.generate()+ "\n"+
                                                                    " 2. General Information \n" +
                                                                        "\t \tName:" +  slots["name"].value + "\n" +
                                                                        "\t \tAge: "+  slots["age"].value + "\n" +
                                                                        "\t \tAddress:" + results1[0].address + "\n" +
                                                                        "\t \tGender: "+  slots["gender"].value + "\n" +
                                                                        "\t \tEmail: " + results1[0].emailId + "\n" +
                                                                    "3. Quote Details \n" +
                                                                          " \tType of Policy: "+  slots["insuranceType"].value + "\n" +
                                                                          " \tIndicative Premium: 250 AUD \n" +
                                                                          " \tSum Assured: " + sumAssured + " AUD" +"\n" +
                                                                          " \tPremium frequency: Annual \n"
                                                       };

                                                       console.log(event);

                  google_calendar.events.insert('primary', event, {sendNotifications : true},function (err, data) {
                                     if (err) console.log(err);
                                     else  {console.log(data)
                                       speech.say('Thank you,' + slots["name"].value)
                                             .pause('250ms')
                                             .say("Your indicative premium is")
                                             .sayAs({
                                             word: "250",
                                             interpret: "number"
                                             })
                                             .say('dollars annualy')
                                             .pause('250ms')
                                             .say('Our adviser John is available to meet you at your place at 5pm tomorrow.')
                                             .pause('250ms')
                                             .say('I have blocked your calendar with the indicative quote for your cover.')
                                           let speechOutput = speech.ssml(true);
                                          handler1.emit(':tell', speechOutput);

                                     };

          });

  });
});




    },
    'AMAZON.HelpIntent': function () {
        speechOutput = "";
        reprompt = "";
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        var speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
};

exports.handler = (event, context) => {
  APP_ID = event.session.application.applicationId;
   console.log('event:\n' + JSON.stringify(event, null, 4));
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(":delegate", updatedIntent);
      return false;
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
      return false;
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}

function getPolicy(name, policyNo) {
    //Handle variances of itemType for config value lookup
     console.log(name);
    for(var key in config.users) {
        if(config.users.hasOwnProperty(name)) {
            console.log(config.users[name].policies);
            return  config.users[name].policies.find(item=>item.policyNo==policyNo);

        }
    }
    return null;
}
