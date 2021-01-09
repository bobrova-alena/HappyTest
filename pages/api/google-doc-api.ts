import { NextApiRequest, NextApiResponse } from 'next';
import { getLinks } from '../../src/sheets-reading';
import { oAuth2Client } from './google-doc';

const { google } = require('googleapis');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });
    const links = await getLinks(sheets, process.env.spreadsheetId, process.env.range);
    res.json({ links });
    res.end();
}