const MongoClient = require('mongodb').MongoClient
const json2csv = require('json2csv').parse
const fs = require('fs')
const toS3 = require('./s3')
const collections = require('./collections')
const mongoUrl = process.env.DB_ENDPOINT || 'mongodb://127.0.0.1:27017/pop'

// Convert collection to CSV and send it to s3.
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
  toS3(`${name}.csv`, fs.createReadStream(filename))
}

// Create storage dir (temporary).
function mkStorage () {
  try {
    fs.mkdirSync('storage')
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err
    }
  }
}

// Export all collections.
async function main () {
  const client = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
  })
  const db = await client.db()
  mkStorage()
  await Promise.all(collections.map(c => collectionToCsv(db, c)))
  await client.close()
}

main()
