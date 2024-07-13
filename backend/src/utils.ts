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

// export const CalculateMemberSince = (joiningDate:Date)=>{
//   const DateOfJoin = moment(joiningDate);
//     const currentDate = moment(); //Today's Date 
//     const duration = moment.duration(currentDate.diff(DateOfJoin)); 
//     let formattedDuration;
//     if (duration.asMonths() >= 1) { // If Duration is Greater or Equal or One we Format According to That
//       const months = Math.floor(duration.asMonths());
//       const years = Math.floor(months / 12);
//       const remainingMonths = months % 12;

//       if (years > 0) {
//         formattedDuration = `since ${years} ${
//           years === 1 ? "year" : "years"
//         }, ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
//       } else {
//         formattedDuration = `since ${remainingMonths} ${
//           remainingMonths === 1 ? "month" : "months"
//         }`;
//       }
//     } else {
//       const days = Math.floor(duration.asDays());
//       formattedDuration = `since ${days} ${days === 1 ? "day" : "days"}`;
//     }
//     return formattedDuration;
// }