var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
/* GET home page. */


var functions = require('firebase-functions'); // Cloud Functions for Firebase library
//var DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
router.post("/echo", function(request, response) {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  if (request.body.result) {
    processV1Request(request, response);
  } else if (request.body.queryResult) {
    processV2Request(request, response);
  } else {
    console.log('Invalid Request');
    return response.status(400).end('Invalid Webhook Request (expecting v1 or v2 webhook request)');
  }
});
//var app = new DialogflowApp();

function processV2Request (request, response) {
  // An action is a string used to identify what needs to be done in fulfillment
  var action = (request.body.queryResult.action) ? request.body.queryResult.action : 'default';
  // Parameters are any entites that Dialogflow has extracted from the request.
  var parameters = request.body.queryResult.parameters || {}; // https://dialogflow.com/docs/actions-and-parameters
  // Contexts are objects used to track and store conversation state
  var inputContexts = request.body.queryResult.contexts;

  var outputContexts = request.body.queryResult.outputContexts || "ya rien"; // https://dialogflow.com/docs/contexts
  outputContexts.forEach(function(con){
    console.log(con.name.slice(-con.name.lenght+8+con.name.indexOf("contexts/")));
  });
  console.log('Contexts ' + JSON.stringify(outputContexts));
  // Get the request source (Google Assistant, Slack, API, etc)
  var requestSource = (request.body.originalDetectIntentRequest) ? request.body.originalDetectIntentRequest.source : undefined;
  // Get the session ID to differentiate calls from different users
  var session = (request.body.session) ? request.body.session : undefined;
  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'input.welcome': function(){
      sendResponse('Hello, Welcome to my Dialogflow agent!'); // Send simple response to user
    },
    // The default fallback intent has been matched, try to recover (https://dialogflow.com/docs/intents#fallback_intents)
    'input.unknown': function(){
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      sendResponse('I\'m having trouble, can you try that again?'); // Send simple response to user
    },
    // Default handler for unknown or undefined actions
    'default': function(){
       responseToUser = {
        //fulfillmentMessages: richResponsesV2, // Optional, uncomment to enable
        //outputContexts: [{ 'name': `${session}/contexts/weather`, 'lifespanCount': 2, 'parameters': {'city': 'Rome'} }], // Optional, uncomment to enable
        fulfillmentText: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
      };
      sendResponse(responseToUser);
    },

    // METTRE ICI LES DIFFERENTES ACTIONS ET LES RESPONSES A ENVOYER
  };
  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }
  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();
  // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      var responseJson = {fulfillmentText: responseToUser}; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      var responseJson = {};
      // Define the text response
      responseJson.fulfillmentText = responseToUser.fulfillmentText;
      //Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
      if (responseToUser.fulfillmentMessages) {
       responseJson.fulfillmentMessages = responseToUser.fulfillmentMessages;
      }
      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      if (responseToUser.outputContexts) {
        responseJson.outputContexts = responseToUser.outputContexts;
      }
      if(responseToUser.followup_event_input){
        responseJson.followup_event_input=responseToUser.followup_event_input;
      }
      // Send the response to Dialogflow
      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
      response.json(responseJson);
    }
  }
}
module.exports = router;
/*
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

router.use(bodyParser.json());

router.post("/echo", function(req, res) {
  console.log(req.body.queryResult.queryText);
  if (req.body.queryResult.queryText){
    var rep1=req.body.queryResult.queryText.toLowerCase();
    console.log(rep1);
    if (rep1==="oui"){
      console.log("ok webhook oui");
      return res.json({
        "followup_event_input": {
          name: "FOui",
          parameters: {
            paramOui: rep1
          }
        }
      });
    }
    else {



      return res.json({
        "followup_event_input": {
          name: "FNon",
          parameters: {
            paramNon: rep1
          }
        }
      });
    }
  }

});

if (req.body.result.parameters.Reponse10){
return res.json({
speech: speech,
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,

});

}
if (req.body.result.parameters.Reponse9){
return res.json({
speech: speech,
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
});
}
if (req.body.result.parameters.Reponse8){
return res.json({
speech: speech,
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
});
}
if (req.body.result.parameters.Reponse7){
return res.json({
speech: speech,
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
});
}
if (req.body.result.parameters.Reponse6){
return res.json({
speech: speech,
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
});
}
if (req.body.result.parameters.Reponse5){
return res.json({
speech: speech,
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
});
}
if (req.body.result.parameters.Reponse4){
return res.json({
speech: speech,
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
});
}
if (req.body.result.parameters.Reponse3){
return res.json({
speech: speech,
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
});
}
if (req.body.result.parameters.Reponse2){
return res.json({
speech: "Au cours de la création de votre entreprise, ou durant son existence avez-vous élaboré un Business Plan ?",
displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
});
}*/
