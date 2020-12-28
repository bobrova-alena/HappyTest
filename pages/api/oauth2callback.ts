
const {google} = require('googleapis');
import { NextApiRequest, NextApiResponse } from "next";
require('dotenv').config()
import {getLinks} from '../../src/sheets-reading'

const client_secret = process.env.client_secret;
const client_id = process.env.client_id;
const redirect_uris = process.env.redirect_uris;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
    let links=[];
    oAuth2Client.on('tokens', (tokens) => {
        if (tokens.refresh_token) {
          // store the refresh_token in my database!
          console.log("tokens.refresh_token " + tokens.refresh_token);
        }
        console.log("tokens.access_token " + tokens.access_token);
      });

    oAuth2Client.getToken(req.query.code, (err, token) => {
        if (err) 
            return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        const sheets = google.sheets({version: 'v4', auth: oAuth2Client});
        links = getLinks(sheets, process.env.spreadsheetId, process.env.range);
    })
    

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ links: links }))
}