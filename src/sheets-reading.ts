export async function getLinks(sheets, spreadsheetId: string, range: string) {
    let links=[];
    const request = {
        spreadsheetId: spreadsheetId,
        range: range,
    };
    const response = (await sheets.spreadsheets.values.get(request)).data;
    const rows = response.values;
    if(rows.length) {
        links = rows.map(row => row[0]);
    } else {
        console.log('No data found.');
    }
    return links;
}