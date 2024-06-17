/**
 * Removes HTML tags from a given string.
 *
 * @param html - The HTML string to strip tags from.
 * @returns The plain text content without HTML tags.
 */
const stripHtmlTags = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

export default stripHtmlTags;
