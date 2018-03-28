var MongoMock = require('mongomock');
let Speech = require('ssml-builder');
//initial mock data
var db = {
   advisorDetails:[
        {
           "address":"XYZ",
           "availabledate": "2018-03-22",
        //   "availableStartSlot":10:30,
        //   "availableEndSlot":11:30,
           "name":"John",
        }
   ]
}

var mongo = new MongoMock(db);


exports.getInsuranceSummary = function(lob,period,region,handler) {
console.log("Params",lob);
console.log("Params",period)
console.log("Params",region)
mongo.collection('insuranceSummaries').
find( { $and: [ { "lob": lob },{ "region": region }, { "period": period} ] } ).toArray(function(err,results){

  console.log("Results",results);


  let speech = new Speech();

  if(results.length >0)
    {
      speech.say('For the ' + period + ' in ' + region )
        .pause('250ms')
        .say('Net Written premium recorded was ')
        .pause('500ms')
        .sayAs({
        word: results[0].NWP,
        interpret: "number"
        })
        .pause('250ms')
        .say('million  ')
        .pause('250ms')
        .say('Net Earned premium was ')
        .pause('500ms')
        .sayAs({
            word: results[0].NEP,
            interpret: "number"
        })
        .pause('150ms')
        .say('million with  ')
        .sayAs({
          word: results[0].NWP,
          interpret: "number"
        })
        .pause('250ms')
        .say('million Net Claims Paid ')
        .pause('150ms')
        .say('having claim ratio and loss ratio as ')
        .sayAs({
          word: results[0].ClaimRatio,
          interpret: "number"
      })
      .say('percent and').sayAs({
        word: results[0].ClaimRatio,
        interpret: "number"
      })
      .say('percent' ) ;
    }
  else {
    speech.say('No summary found for the provided inputs')
  }

  let speechOutput = speech.ssml(true);
  handler.emit(':tell', speechOutput);

})
}
