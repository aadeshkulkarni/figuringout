export const getFormattedDate = () => {
  const date = new Date();
  const options: any = { day: "numeric", month: "long", year: "numeric" };

  const formattedDate = date.toLocaleDateString("en-US", options).replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
  return formattedDate;
};
