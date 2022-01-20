const pG = document.querySelector("div"),
  winMsg = document.querySelector(".winMessage"),
  input = document.querySelector("input"),
  button = document.querySelector(".button"),
  time = document.querySelector(".time"),
  record = document.querySelector(".recordText"),
  recordTable = document.querySelector(".recordTable");

let container = [],
  firstCard = null,
  secondCard = null,
  completeCards = [],
  seconds = 0,
  timerInterval = null;

// record.textContent = ` ${localStorage.getItem('record')}c.`

button.addEventListener("click", (e) => {
  firstCard = null;
  secondCard = null;
  e.preventDefault();
  time.style.color = "";
  clearInterval(timerInterval);
  seconds = 0;
  timerInterval = setInterval(changeTime, 100);
  winMsg.style.display = "none";
  container.forEach((item) => pG.removeChild(item));
  container = [];
  function createCard(count) {
    const card = document.createElement("div");
    card.textContent = count;
    card.classList.add("card");
    return card;
  }
  for (let i = 1; i <= input.value; i++) {
    container.push(createCard(i));
    container.push(createCard(i));
  }
  container.sort(() => Math.random() - 0.5);
  container.forEach((item) => pG.append(item));
});

pG.addEventListener("click", (e) => {
  if (
    firstCard == null &&
    e.target.classList.contains("card") &&
    !e.target.classList.contains("active") &&
    !e.target.classList.contains("completed")
  ) {
    e.target.classList.add("active");
    firstCard = e.target;
  } else if (
    secondCard == null &&
    e.target.classList.contains("card") &&
    !e.target.classList.contains("active") &&
    !e.target.classList.contains("completed")
  ) {
    e.target.classList.add("active");
    secondCard = e.target;
    if (firstCard.textContent == secondCard.textContent) {
      firstCard.classList.add("completed");
      secondCard.classList.add("completed");
      firstCard = null;
      secondCard = null;
    } else {
      setTimeout(() => {
        firstCard.classList.remove("active");
        secondCard.classList.remove("active");
        firstCard = null;
        secondCard = null;
      }, 500);
    }
    completeCards = document.querySelectorAll(".completed");
    if (completeCards.length === input.value * 2) {
      winMsg.style.display = "block";
      clearInterval(timerInterval);
      time.style.color = "green";
      checkRecord(seconds);
    }
  }
});
function createRecordLi() {
  recordTable.innerHTML = "";
  const object = Object.entries(localStorage);
  object.forEach((item) => {
    if (!item[0].search(/record/i)) {
      const recordLi = document.createElement("li");
      recordLi.classList.add("record__li");
      recordLi.textContent = `Рекорд ${(+item[0].replace(/\D/gi,""))*2} карточек: ${item[1]} с.`;
      recordTable.append(recordLi);
    }
  });
}
createRecordLi();

function checkRecord(sec) {
  if (!localStorage.getItem(`record${input.value}`)) {
    localStorage.setItem(`record${input.value}`, sec.toFixed(2));
    createRecordLi();
  }
  if (sec < localStorage.getItem(`record${input.value}`)) {
    localStorage.setItem(`record${input.value}`, sec.toFixed(2));
    createRecordLi();
  }
}
function changeTime() {
  time.textContent = `${seconds.toFixed(1)}с`;
  seconds += 0.1;
}
