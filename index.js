const express = require('express');
const rp = require('request-promise');
const $ = require('cheerio');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
const HAKurl = 'https://www.hak.hr/info/stanje-na-cestama/#prohodnost-cesta';

const mails = ['mislavtv@gmail.com'];

app.get('/mail/:mail', (req, res) => {
    //res.send(req.params.mail);
    mails.push(req.params.mail);
});


// Webscraping HAK every minute
var hakNovosti = null;
setInterval(function () {
    rp(HAKurl)
        .then(function (html) {
            const text = $('.stanje-inner-text', html).text();
            if (text != hakNovosti) {
                hakNovosti = text;
                console.log('New info detected, sending emails...');
                mails.every(x => sendNews(x));
            }
        })
        .catch(function (err) {
            //handle error
        });
}, 60 * 1000); // 60 * 1000 milsec¸

function sendNews(userEmail) {
    var mailOptions = {
        from: 'haknewsapp@gmail.com',
        to: userEmail,
        subject: 'Obavijest o stanju na cestama - HAK',
        text: hakNovosti
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

//Mailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "haknewsapp@gmail.com",
        pass: "haknewsApp123"
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

app.listen(port, () => console.log(`HAKmail app listening on port ${port}!`))
