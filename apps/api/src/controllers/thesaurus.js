const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const X2JS = require("x2js");
const passport = require("passport");

const Thesaurus = require("./../models/thesaurus");
const { capture } = require("./../sentry.js");

const x2js = new X2JS();
const router = express.Router();

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

router.get("/search", (req, res) => {
  var id = req.query.id;
  var value = escapeRegExp(req.query.value);
  var q = Thesaurus.find({
    arc: id,
    value: { $regex: new RegExp("^" + value) }
  }).limit(10);
  q.exec((e, values) => {
    res.send(values);
  });
});

router.get("/validate", (req, res) => {
  var id = req.query.id;
  var value = escapeRegExp(req.query.value);
  const query = {
    arc: id,
    $text: {
      $search: `"${value}"`,
      $caseSensitive: false,
      $diacriticSensitive: false
    }
  };
  var q = Thesaurus.find(query).limit(1);
  q.exec((e, values) => {
    const exist = !!values.length;
    res.send(exist);
  });
});

router.get("/getTopConceptsByThesaurusId", (req, res) => {
  try {
    const thesaurusId = req.query.id;
    getTopConceptsByThesaurusId(thesaurusId).then(arr => {
      res.status(200).send(arr);
    });
  } catch (e) {
    capture(e);
    res.status(500).send({ success: false, msg: JSON.stringify(e) });
  }
});

router.get("/getAllChildrenConcept", (req, res) => {
  try {
    const topconcepts = req.query.id;
    const arr = [];
    getAllChildrenConcept(topconcepts, arr).then(() => {
      res.status(200).send(arr);
    });
  } catch (e) {
    capture(e);
    res.status(500).send({ success: false, msg: JSON.stringify(e) });
  }
});

router.get("/getPreferredTermByConceptId", (req, res) => {
  try {
    const conceptId = req.query.id;
    const allTerms = [];
    getPreferredTermByConceptId(conceptId).then(r => {
      for (let j = 0; j < r.length; j++) {
        if (r[j].languageId === "fr-FR") {
          allTerms.push(r[j].lexicalValue);
        }
      }
      res.status(200).send(allTerms);
    });
  } catch (e) {
    capture(e);
    res.status(500).send({ success: false, msg: JSON.stringify(e) });
  }
});

router.get("/deleteAllThesaurus", (req, res) => {
  try {
    const thesaurusId = req.query.id;
    Thesaurus.remove({ arc: thesaurusId }, function() {
      res.status(200).send({});
    });
  } catch (e) {
    capture(e);
    res.status(500).send({ success: false, msg: JSON.stringify(e) });
  }
});

router.post("/createThesaurus", (req, res) => {
  try {
    const thesaurusId = req.query.id;
    const terms = req.body.terms;
    // je créé tous les terms qui existent
    const arr = terms.map(e => new Thesaurus({ arc: thesaurusId, value: e }));
    Thesaurus.insertMany(arr, (err, docs) => {
      if (err) {
        console.log("ERROR", err);
        capture(err);
      }
      res.status(200).send({ success: true, msg: "OK" });
    });
  } catch (e) {
    capture(e);
    res.status(500).send({ success: false, msg: JSON.stringify(e) });
  }
});

// router.get("/update", (req, res) => {
//   const thesaurusId = req.query.id;
//   return new Promise(async (resolve, reject) => {
//     try {
//       const allTerms = [];
//       // je récupère les top concepts des thesaurus
//       console.log("START GET TOP CONCEPT FOR THESAURUS ", thesaurusId);
//       const topconcepts = await getTopConceptsByThesaurusId(thesaurusId);
//       const arr = [];

//       //send a confirmation here, so the timeout error is not call
//       res.status(200).send({ success: true, msg: "OK" });

//       console.log("END TOP CONCEPT ", topconcepts.length);
//       // je vais chercher tous les enfants recursivement
//       console.log("START GET ALL CONCEPTS FOR THESAURUS ", thesaurusId);
//       for (let i = 0; i < topconcepts.length; i++) {
//         await getAllChildrenConcept(topconcepts[i], arr);
//       }

//       console.log("GOT CHILDREN CONCEPT ", arr.length);
//       console.log("START GET ALL PREFERED TERMS FOR THESAURUS ", thesaurusId);
//       // je prend tous les term préféré de tous les concepts
//       for (let i = 0; i < arr.length; i++) {
//         const r = await getPreferredTermByConceptId(arr[i]);
//         for (let j = 0; j < r.length; j++) {
//           if (r[j].languageId === "fr-FR") {
//             allTerms.push(r[j].lexicalValue);
//           }
//         }
//       }
//       console.log("GOT TERMS ", allTerms.length);
//       // je supprime les terms qui existent
//       Thesaurus.remove({ arc: thesaurusId }, function() {
//         // je créé tous les terms qui existent
//         const arr = allTerms.map(
//           e => new Thesaurus({ arc: thesaurusId, value: e })
//         );
//         Thesaurus.insertMany(arr, function(err, docs) {
//           if (err) {
//             capture(err);
//           }
//           console.log("SAVED ", docs.length);
//           resolve();
//         });
//         console.log(allTerms);
//       });

//       console.log("DONE UPDATE ", thesaurusId);
//     } catch (e) {
//       capture(e);
//       res.status(500).send({ success: false, msg: "FAIL UPDATE" });
//       console.log("FAIL UPDATE ", thesaurusId);
//     }
//   });
// });

module.exports = router;

function getAllChildrenConcept(conceptId, arr) {
  try {
    return new Promise(async (resolve, reject) => {
      arr.push(conceptId);
      const childs = await getChildrenByConceptId(conceptId);
      const ArrP = [];
      if (childs) {
        for (var i = 0; i < childs.length; i++) {
          ArrP.push(getAllChildrenConcept(childs[i], arr));
        }
      }
      await Promise.all(ArrP);
      resolve();
    });
  } catch (e) {
    capture(e);
    resolve();
  }
}

function getChildrenByConceptId(conceptId) {
  const body = `<soap:getChildrenByConceptId> 
          <conceptId>${conceptId}</conceptId> 
         </soap:getChildrenByConceptId>`;
  return post(body, "thesaurusConcept");
}

function getPreferredTermByConceptId(conceptId) {
  const body = `<soap:getPreferredTermByConceptId> 
            <conceptId>${conceptId}</conceptId> 
        </soap:getPreferredTermByConceptId>`;
  return post(body, "thesaurusConcept");
}

function getTopConceptsByThesaurusId(thesaurusId) {
  const body = `<soap:getTopConceptsByThesaurusId> 
            <thesaurusId>${thesaurusId}</thesaurusId> 
        </soap:getTopConceptsByThesaurusId>`;
  return post(body, "thesaurusConcept");
}

function post(req, service) {
  let envelopedBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soap="http://soap.ginco.mcc.fr/"> 
    <soapenv:Header/> 
    <soapenv:Body>${req}</soapenv:Body> 
    </soapenv:Envelope>`;

  return new Promise((resolve, reject) => {
    request.post(
      {
        url: `https://ginco.culture.fr/ginco-webservices/services/${service}`,
        body: envelopedBody,
        headers: { "Content-Type": "text/xml;charset=UTF-8" }
      },
      (error, response, body) => {
        if (!error && response.statusCode === 200) {
          try {
            const bodyjson = x2js.xml2js(body);
            const key = Object.keys(bodyjson.Envelope.Body)[0];
            const resp = bodyjson.Envelope.Body[key].return;
            if (resp && !Array.isArray(resp)) {
              resolve([resp]);
            } else {
              resolve(resp);
            }
          } catch (e) {
            reject(new Error("Response malformed"));
          }
        } else {
          capture(error);
          reject(error);
        }
      }
    );
  });
}
