const express = require('express'),
      router = express.Router(),
      { MongoClient, ServerApiVersion } = require('mongodb'),
      uri = 'mongodb+srv://cscott53:mernStack1@cluster0.wscobq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      client = new MongoClient(uri, {
          serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
          }
      })
let db,entries,users
(async()=>{
    await client.connect()
    db = client.db('test')
    entries = db.collection('entries')
    users = db.collection('users')
})().catch(console.dir)
router.get('/entries',async({query},res)=>{
    try {
        let {username} = query,
            user = await users.findOne({username})
        if (!user) res.status(404).send('User not found')
        else {
            let entryUser = await entries.findOne({username})
            if (!entryUser) await entries.insertOne({username, entries:[]})
            let data = (await entries.findOne({username})).entries
            res.json({data})
        }
    } catch (error) {
        console.dir(error)
    }
})
router.post('/entries',async({body},res)=>{
    try {
        console.log(body)
        let {username,entry} = body,
            user = await users.findOne({username})
        if (!user) res.status(404).send('User not found')
        else {
            let data = (await entries.findOne({username}).entries).slice() //to copy array
            data.push(entry)
            await entries.findOneAndUpdate({username},{
                $set: {entries: data}
            })
            res.json({data})
        }
    } catch (error) {
        console.dir(error)
    }
})
router.put('/entries',async({body},res)=>{
    try {
        let {username,index,updatedEntry} = body,
            user = await users.findOne({username})
        if (!user) res.status(404).send('User not found')
        else {
            let data = (await entries.findOne({username})).entries.slice()
            data[index] = updatedEntry
            await entries.findOneAndUpdate({username},{
                $set: {entries: data}
            })
            res.json({data})
        }
    } catch (error) {
        console.dir(error)
    }
})
router.delete('/entries',async({body},res)=>{
    try {
        let {username,index} = body,
            user = await users.findOne({username})
        if (!user) res.status(404).send('User not found')
        else {
            let data = (await entries.findOne({username})).entries.slice()
            data.splice(index,1)
            await entries.findOneAndUpdate({username},{
                $set: {entries: data}
            })
            res.json({data})
        }
    } catch (error) {
        console.dir(error)
    }
})
module.exports = router