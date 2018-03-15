var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
/* GET home page. */
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

module.exports = router;
/*if (req.body.result.parameters.Reponse10){
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
