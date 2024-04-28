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
      });
/*
I usually don't use semicolons but had to put one on
the line above since JS thought the () on the line
below was trying to call what was returned on the
line above as if it were a function and throw an error
*/
(async()=>await client.connect())()

module.exports = router