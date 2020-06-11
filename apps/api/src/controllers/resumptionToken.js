const resumptionToken = require("../models/resumptionToken");
let moment = require('moment-timezone')
let uuid = require('uuid/v4')


async function getResumptionToken(resumptoken){
    try{
        const token = await resumptionToken.find({ TOKEN: resumptoken })
        if (token) {
            return token
        }else{
            return res.status(404).send({ success: false, msg: "token introuvable." })
        }
    }catch (e) {
        capture(e);
        res.status(500).send({ success: false, msg: JSON.stringify(e) })
    }
}

async function createResumptionToken(nbPage,listSize,queryContent){
    try{
        let expDate = new Date()
        let resumpObj = {
            TOKEN: uuid(),
            DEXP: moment(expDate.setDate(expDate.getDate()+1)).format('YYYY-MM-DDTHH:mm:ss'),
            CURSOR: nbPage + 1,
            FROM: queryContent.from,
            UNTIL: queryContent.until,
            SET: queryContent.set,
            META: queryContent.metadataPrefix,
            SIZE: listSize
        }
        let obj = new resumptionToken(resumpObj)
        const promises = []
        promises.push(obj.save())
        await Promise.all(promises)
        return resumpObj
    }catch (e) {
    capture(e);
    res.status(500).send({ success: false, msg: JSON.stringify(e) })}
}

// Update a resumptionToken.
async function updateResumptionToken(token, updatedObj) {
    return new Promise((resolve, reject) => {
         resumptionToken.findOneAndUpdate({ token }, updatedObj, { upsert: true, new: true, useFindAndModify: false}, (err, doc) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(doc);
      });
    });
  }

  // delete a resumptionToken.
async function deleteResumptionToken(token) {
        await resumptionToken.deleteOne({ TOKEN: token })
}

module.exports = {
    getResumptionToken,
    createResumptionToken,
    updateResumptionToken,
    deleteResumptionToken
}