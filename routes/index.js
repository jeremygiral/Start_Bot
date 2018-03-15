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
  console.log(req.body);
  if (req.body.result.parameters.Reponse1){
    var rep1=req.body.result.parameters.Reponse1
    if (rep1.toLowerCase==="oui"){
      /*return res.json({
      speech: "Très bien, où en êtes vous dans la construction de votre Business Plan ? ( Commencement/ En Cours / En finition )",
      displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
    });*/
    console.log("ok webhook oui");
    return res.json({
      "followupEvent": {
        "name": "FOui",
        "data": {
          "paramOui":rep1
        }
      }
    });
  }
  else {
      /*return res.json({
        speech: "Très bien, où en êtes vous dans la construction de votre Business Plan ? ( Commencement/ En Cours / En finition )",
        displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
      });*/

      return res.json({
        "followupEvent": {
          "name": "FNon",
          "data": {
            "paramNon":rep1
          }
        }
      });
    }
  }
  return res.json({
    speech: speech,
    displayText: speech+'\n'+testparam+'\n'+testaction+'\n'+testcontext,
    source: "webhook-echo-sample"
  });
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
