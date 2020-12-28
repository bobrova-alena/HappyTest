export async function getSheetData(url: URL) {
    const response = await fetch('/api/google-doc');
    return await response.json();
}

export async function authorize() {
    const response = await fetch('/api/doogle-doc');
    return await response.json();
    //await response;
    //return;
}