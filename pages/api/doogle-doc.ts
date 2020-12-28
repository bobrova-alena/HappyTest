import { NextApiRequest, NextApiResponse } from "next";
import { getLinks } from "../../src/sheets-reading";

const {google} = require('googleapis');
require('dotenv').config()

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const client_secret = process.env.client_secret;
const client_id = process.env.client_id;
const redirect_uris = process.env.redirect_uris;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
    if(req.query.code ){
      let links=[];
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
    }else{
    const authUrl = oAuth2Client.generateAuthUrl({
        scope: SCOPES,
        access_type:"offline",
        response_type: 'code',
        include_granted_scopes:true,
        //prompt: "consent",
      });

    //res.writeHead(302, { Location: authUrl })
    //res.end();

    res.redirect(authUrl);
 
    //res.setHeader('Content-Type', 'application/json');
    //res.status(200).json({ url: encodeURI(authUrl) })//res.end(JSON.stringify({ url: encodeURI(authUrl) }))
    }
  }