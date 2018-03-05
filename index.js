

 let speechOutput;
 let reprompt;
 let Speech = require('ssml-builder');
 const config = require('./config.js');
 const welcomeOutput = "Welcome to Insurance Advisor skill. <break time='250ms'/> You can get details of your policy by saying get my policy details. <break time='250ms'/> I have sent home card to your Alexa App for further refrernce. <break time='250ms'/>So try it out";
 const welcomeReprompt = "I did not hear anything. You can get details of your policy by saying get my policy details. So try it out";
 const welcomeCard = "Welcome to Insurance Advisor skill. You can get policy details by asking ALexa  get my policy details." +
 "User  need to provide two inputs : \n" +
 "\n\u22C5 Policy Number" +
  "\n\u22C5 Customer Name \n"




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
    },
    'getPolicyDetails': function () {
        //delegate to Alexa to collect all the required slot values
        var filledSlots = delegateSlotCollection.call(this);

        var policyDetails = getPolicy(this.event.request.intent.slots.customerName.value.toLowerCase(),this.event.request.intent.slots.policyNumber.value);

          console.log(policyDetails);
            let speech = new Speech();
        //say the results
        if(policyDetails) {
          speech.say('Your premium amount is ')
              .pause('500ms')
              .sayAs({
                word: policyDetails.premium,
                interpret: "number"
              })
              .pause('250ms')
              .say('dollars  and  is   due for renewal on')
              .pause('500ms')
              .sayAs({
                word: policyDetails.renewalDate,
                interpret: "date"
              });
          let speechOutput = speech.ssml(true);
          this.emit(':tell', speechOutput);
        }
        else {

            speech.say('Policy does not exist in the system. ');
            let speechOutput = speech.ssml(true);
            this.emit(':tell', speechOutput);

        }

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
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
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
