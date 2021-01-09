export async function authorize() {
    const response = await fetch('/api/google-doc');
    return await response.json();
}

export async function getLinksFromSheet() {
    const response = await fetch('/api/google-doc-api');
    return await response.json();
}