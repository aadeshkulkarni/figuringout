/**
 * @param html string containing HTML tags and attributes along with innerHTML
 * @returns a plain string containing only the innerHTML data.
 */
export const getPlainTextFromHTML = (html: string): string => {
  return html.replace(/<(\w+)\s*[^>]*>|<\/(\w+)\s*>|<(\w+)\s*\/>/gi, function (match, p1, p2) {
    if (p2 === p1 && p2 !== 'br') {
      return match.startsWith('</') ? ' ' : '';
    } else {
      return match.startsWith('</') ? ' ' : p1 === 'br' ? '' : '';
    }
  });
};

export const htmlTagRegex = /^(<\/?[\w\s="'-]+>)+$/;

export function formatDateString(publishedDate: string, showTime: boolean = false) {
  const date = new Date(publishedDate);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[date.getUTCMonth()];

  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  let formattedDate = `${month} ${day}, ${year}`;
  if (showTime) {
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    formattedDate = `${formattedDate} ${hours}:${minutes} ${ampm}`;
  }
  return formattedDate;
}
