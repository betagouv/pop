const MongoClient = require('mongodb').MongoClient
const json2csv = require('json2csv').parse
const fs = require('fs')
const sendToS3 = require('./s3')

const mongoUrl = process.env.DB_ENDPOINT || 'mongodb://127.0.0.1:27017/pop'

async function collectionToCsv (db, name) {
  const col = db.collection(name)
  const filename = `storage/${name}.csv`
  for (let i = 0, l = 2000, c = await col.countDocuments(); i < c; i += l) {
    console.log(`${i}/${c}`)
    const items = await col.find().sort({
      _id: 1
    }).skip(i).limit(l).toArray()
    if (i === 0) {
      fs.writeFileSync(filename, json2csv(items))
    } else {
      fs.appendFileSync(filename, json2csv(items, {header: false}))
    }
  }
  sendToS3(`${name}.csv`, fs.createReadStream(filename))
}

function mkStorage () {
  try {
    fs.mkdirSync('storage')
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
}

async function main () {
  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
  })
  const db = await client.db()
  mkStorage()
  await collectionToCsv(db, 'joconde')
  await client.close()
}

main()
