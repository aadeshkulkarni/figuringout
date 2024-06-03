export const getFormattedDate = () => {
  const date = new Date();
  const options: any = { day: "numeric", month: "long", year: "numeric" };

  const formattedDate = date.toLocaleDateString("en-US", options).replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
  return formattedDate;
};

export function shuffleArray(array: Array<any>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // get a random index between 0 and i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements at index i and j
  }
  return array;
}