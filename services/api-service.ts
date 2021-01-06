export async function authorize() {
    const response = await fetch('/api/google-doc');
    return await response.json();
}