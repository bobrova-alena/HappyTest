export function getLinks(sheets, spreadsheetId: string, range: string) {
    let links=[];
    sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
    }, (err, res) => {
        if(err)
            return console.log('The sheets API returned an error: ' + err);
        const rows = res.data.values;
        if(rows.length) {
            rows.map((row) => {
                console.log(`${row[0]}`);
                links.push(row[0]);
            });
        } else {
            console.log('No data found.');
        }
    });

    return links;
}