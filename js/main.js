document.addEventListener("DOMContentLoaded", () => {
  const birthDay = document.querySelector("#day-input");
  const birthMonth = document.querySelector("#month-input");
  const birthYear = document.querySelector("#year-input");
  const suButton = document.querySelector(".seperator-icon");
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const dayResult = document.getElementById("day-result");
  const monthResult = document.getElementById("month-result");
  const yearResult = document.getElementById("year-result");
  // Wrong Input Nodes
  const wrongDate = document.getElementById("wrong-date");
  const wrongDMY = document.getElementById("wrong-dmy");
  const requiredField = document.getElementById("required-fields");

  // Check for white spaces and numbers
  const isNumeric = (str) => {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  };

  // check for valid data
  const dataVerification = (cDay, cMonth, cYear, bDay, bMonth, bYear) => {
    if (
      bDay != (null || "") &&
      bMonth != (null || "") &&
      bYear != (null || "")
    ) {
      if (!isNumeric(bDay) || !isNumeric(bMonth) || !isNumeric(bYear)) {
        return 101;
      } else if (cYear >= bYear) {
        if ((cYear = bYear) && cMonth + 1 < bMonth) {
          return 102;
        } else if ((cMonth = bMonth) && (cDay < bDay || cDay == bDay)) {
          return 102;
        }
      }
      return 100;
    } else return 103;
  };

  // Calculating age
  const ageCalculation = (cDay, cMonth, cYear, bDay, bMonth, bYear) => {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (bDay > cDay) {
      cDay = cDay + months[bMonth - 1];
      cMonth = cMonth - 1;
    }
    if (bMonth > cMonth) {
      cYear = cYear - 1;
      cMonth = cMonth + 12;
    }
    var calculated_date = cDay - bDay;
    var calculated_month = cMonth - bMonth;
    var calculated_year = cYear - bYear;
    return [calculated_date, calculated_month, calculated_year];
  };

  suButton.addEventListener("click", () => {
    // console.log(birthDay.value, birthMonth.value, birthYear.value);
    const verfication = dataVerification(
      currentDay,
      currentMonth,
      currentMonth,
      birthDay.value,
      birthMonth.value,
      birthYear.value
    );

    if (verfication == 100) {
      wrongDMY.style.display = "none";
      wrongDate.style.display = "none";
      requiredField.style.display = "none";
      const calculated_data = ageCalculation(
        currentDay,
        currentMonth,
        currentYear,
        birthDay.value,
        birthMonth.value,
        birthYear.value
      );
      yearResult.textContent = calculated_data[2];
      monthResult.textContent = calculated_data[1];
      dayResult.textContent = calculated_data[0];
    } else if (verfication == 103) {
      const wrong = document.querySelectorAll(".label");
      console.log(wrong);
      for (let i = 0; i <= 2; i = i + 1) {
        wrong[i].classList.add("wrong-input-label");
        wrong[i].classList.remove("valid-input-label");
      }
      console.log(verfication);
      wrongDMY.style.display = "none";
      wrongDate.style.display = "none";
      requiredField.style.display = "block";
    } else if (verfication == 101) {
      console.log(verfication);
      wrongDate.style.display = "none";
      requiredField.style.display = "none";
      wrongDMY.style.display = "block";
    } else {
      console.log(verfication);
      wrongDate.style.display = "block";
      requiredField.style.display = "none";
      wrongDMY.style.display = "none";
    }
  });
});
