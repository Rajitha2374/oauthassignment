const express = require('express')
const app = express()
const axios = require('axios')

//client ID and the client secret obtained during the registration
const clientID = 'Iv1.c52c7e7e0a624432'
const clientSecret = '33f7989c72f3f85f56a46a4e844cc20e72837be0'


// Define the redirecting route
app.get('/main', (req, res) => {

  const requestToken = req.query.code
  
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
         accept: 'application/json'
    }
    
  }).then((response) => {

    const accessToken = response.data.access_token
    console.log(response.data)
    //redirect to the main page along with the access token
    res.redirect(`/main.html?access_token=${accessToken}`)
  })
})

app.use(express.static(__dirname + '/public'))
app.listen(4000,()=>{
    console.log("Server is listening on port : 4000")
})