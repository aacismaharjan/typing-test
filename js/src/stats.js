window.addEventListener("load", init);

// DOM Elements
const previousStatDisplay = document.querySelector("#previous-stats");

// Initial function
export function init() {
  updatePreviousStats();
}

// Update previous records
function updatePreviousStats() {
  previousStatDisplay.style.display = "flex";
  let previousRecords = JSON.parse(localStorage.getItem("records"));
  let previousRecordsEl;

  previousRecordsEl = previousRecords
    .slice(0, 5)
    .map((item, index) => getListItem(item, index))
    .join("");

  document.querySelector(
    "#previous-records"
  ).innerHTML = `<ul class="list-group list-group-flush">${previousRecordsEl}</ul>`;
}

function getListItemBack(item, index) {
  return `
  <li class="list-group-item">
    <div class="row justify-content-space-between">
      <div class="col">${index + 1}. ${item.name}</div>
      <div class="col" id="stat1">
        ${item.accuracy}%
      </div>
      <div class="col" id="stat1">
        ${item.wpmNet} WPM
      </div>
    </div>
  </li>`;
}

function getListItem(item, index) {
  const { name, accuracy, wpmNet, startTime } = item;
  return `
   <tr>
      <th scope="row">${index + 1}</th>
      <td>${accuracy}%</td>
      <td>${wpmNet}</td>
      <td>${moment(startTime).format("lll")}</td>
    </tr>`;
}
