const express = require('express'),
      path = require('path'),
      port = process.env.PORT || 3000,
      app = express(),
      router = require('./api')
app.use('/api',router)
app.use(express.json())
app.use(express.static(path.join(__dirname,'../client/build/')))
app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'../client/build/index.html')))
app.listen(port,()=>console.log(`Server running at port ${port}`))