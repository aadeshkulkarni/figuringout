import moment from "moment";

export const CalculateMemberSince = (joiningDate:Date|string)=>{
    const DateOfJoin = moment(joiningDate);
      const currentDate = moment(); //Today's Date 
      const duration = moment.duration(currentDate.diff(DateOfJoin)); 
      let formattedDuration;
      if (duration.asMonths() >= 1) { // If Duration is Greater or Equal or One we Format According to That
        const months = Math.floor(duration.asMonths());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
  
        if (years > 0) {
          formattedDuration = `since ${years} ${
            years === 1 ? "year" : "years"
          }, ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
        } else {
          formattedDuration = `since ${remainingMonths} ${
            remainingMonths === 1 ? "month" : "months"
          }`;
        }
      } else {
        const days = Math.floor(duration.asDays());
        formattedDuration = `since ${days} ${days === 1 ? "day" : "days"}`;
      }
      return formattedDuration;
  }