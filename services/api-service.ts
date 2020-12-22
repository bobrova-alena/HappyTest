export async function getSheetData(url: URL) {
    const response = await fetch('/api/google-doc');
    return await response.json();
}

export async function authorize() {
    const response = await fetch('/api/doogle-doc-authorization');
    return await response.json();
}