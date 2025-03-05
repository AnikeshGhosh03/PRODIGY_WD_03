let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let modeSelector = document.querySelector("#mode-selector");

let turnO = true;
let count = 0;
let gameActive = true;
let vsAI = false;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  gameActive = true;
  msgContainer.classList.add("hide");
  vsAI = modeSelector.value === "pvc";
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showMessage = (message) => {
  msg.innerText = message;
  msgContainer.classList.remove("hide");
  gameActive = false;
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      showMessage(`Congratulations, Winner is ${boxes[a].innerText}`);
      return true;
    }
  }
  return false;
};

const handleClick = (box) => {
  if (!gameActive || box.innerText !== "") return;
  box.innerText = turnO ? "O" : "X";
  box.disabled = true;
  count++;
  if (checkWinner()) return;
  if (count === 9) showMessage("Game was a Draw.");
  turnO = !turnO;

  if (vsAI && !turnO) {
    aiMove();
  }
};

const aiMove = () => {
  let availableBoxes = Array.from(boxes).filter((box) => !box.innerText);
  if (availableBoxes.length > 0) {
    let randomBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    count++;
    if (checkWinner()) return;
    if (count === 9) showMessage("Game was a Draw.");
    turnO = true;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => handleClick(box));
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
modeSelector.addEventListener("change", resetGame);
