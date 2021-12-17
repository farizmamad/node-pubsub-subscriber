const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();

const port = process.env.PORT || 8080;
app.listen(port, async (req, res) => {
    console.log('email service is listening on port', port);
});

app.post('/', async (req, res) => {
    console.log(req.body);
    const labReport = decodeBase64Json(req.body.message.data);
    console.log(labReport);
    try {
        console.log(`Email svc: Report ${labReport.lab_report} being processed`);
        sendEmail();
        console.log(`Email svc: Report number ${labReport.lab_report} email sent`);
        res.status(204).send();
    } catch (error) {
        console.log(`Email svc: Report ${labReport.lab_report} failed ${error}`);
        res.status(500).send();
    }
});

function decodeBase64Json(data) {
    const stringBuffer = Buffer.from(data, 'base64').toString();
    console.log(stringBuffer);
    return JSON.parse(stringBuffer);
}

function sendEmail() {
    console.log('sending email');
}