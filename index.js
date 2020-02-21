
const express = require('express');
require('dotenv').config()
const path = require('path');

const sgMail = require('@sendgrid/mail');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3030;

sgMail.setApiKey(process.env.SENDGRID_KEY);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    // res.sendFile(path.resolve('public', 'index.html'));
    res.render('contact');
    // console.log('cool');

});



app.post('/send', async function (req, res) {
    const body = req.body;
    console.log(body);

    const emailMessage = `
    <h3>Details:</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h4>Message</h4>
    <p>${req.body.userText}</p>
    `;
    const msg = {

        to: 'mitchellmmarkgeorge@gmail.com',
        from: 'mindfulextension@outlook.com', // 
        subject: `New Feedback or Issue Submitted by ${req.body.name}`,
        html: emailMessage
    }



    sgMail.send(msg)
        .then(() => {res.render('thanks')})
        .catch(() => {res.render('err')})

    // res.render('err')  
});

app.listen(port, function () {
    console.log("server is runnig at port " + port);
    //console.log(path.resolve('public', 'index.html'));
});