import { NextApiRequest, NextApiResponse } from 'next';
import { getLinks } from '../../src/sheets-reading';

const { google } = require('googleapis');
require('dotenv').config();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const client_secret = process.env.client_secret;
const client_id = process.env.client_id;
const redirect_uris = process.env.redirect_uris;
export const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(!req.query.code) {
        const authUrl = oAuth2Client.generateAuthUrl({
            scope: SCOPES,
            access_type: 'offline',
            response_type: 'code',
            include_granted_scopes: true
        });

        //res.writeHead(302, { Location: authUrl });
        res.json({ authUrl: encodeURI(authUrl) });
        res.end();
    } else {
        const { tokens } = await oAuth2Client.getToken(req.query.code);
        oAuth2Client.setCredentials(tokens);
        res.writeHead(302, { Location: '/' });
        res.end();
    }
    //else https://oauth2.example.com/auth?error=access_denied
}