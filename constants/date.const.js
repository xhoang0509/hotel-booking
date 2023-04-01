export const dateFormat = 'YYYY-MM-DD';

export function getDateDetail(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
}
