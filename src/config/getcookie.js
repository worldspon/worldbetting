export default function getUUIDFromCookie() {
    const cookiesArray = document.cookie.split(';');
    const targetCookie = new String(cookiesArray.filter(cookie => cookie.includes('worldLottoUUID')));
    const [, cookieValue] = targetCookie.split('=');

    return cookieValue;
}