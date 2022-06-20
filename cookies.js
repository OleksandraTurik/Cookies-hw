const modal = document.createElement("div");
modal.style.display = "none";
modal.style.position = "fixed";
modal.style.zIndex = "1";
modal.style.left = "0";
modal.style.top = "0";
modal.style.width = "100%";
modal.style.height = "100%";
modal.style.backgroundColor = "rgb(0,0,0)";
modal.style.backgroundColor = "rgba(0,0,0,0.4)";

const modalBody = document.createElement("div");
modalBody.style.backgroundColor = "white";
modalBody.style.border = "1px solid #888";
modalBody.style.width = "60%";
modalBody.style.height = "max-content";
modalBody.style.padding = "15px";
modalBody.style.margin = "200px auto";
modalBody.style.borderRadius = "7px"

const modalCloseButton = document.createElement("span");
modalCloseButton.textContent = "❌";
modalCloseButton.style.height = "70px";
modalCloseButton.style.float = "right";
modalCloseButton.style.cursor = "pointer";
modalCloseButton.style.fontSize = "28px";

modalCloseButton.addEventListener("click", () => {
  modal.style.display = "none";
  localStorage.removeItem("cookies_modal_open");
  modalBody.removeChild(modalBody.querySelector("table"));
});

modalBody.appendChild(modalCloseButton);
modal.appendChild(modalBody);

const cookiesButton = document.createElement("button");
cookiesButton.innerText = "Cookies Guard";
cookiesButton.style.position = "absolute";
cookiesButton.style.bottom = "0";
cookiesButton.style.right = "0";
cookiesButton.style.zIndex = "999";
cookiesButton.style.backgroundColor = "red";
cookiesButton.style.color = "white";
cookiesButton.style.padding = "10px";
cookiesButton.style.borderRadius = "50%";
cookiesButton.style.cursor = "pointer";
cookiesButton.style.border = "2px solid black";
cookiesButton.style.fontSize = "14px";
cookiesButton.style.width = "75px";
cookiesButton.style.height = "75px";
cookiesButton.style.margin = "35px";

const getCookies = () => {
  const cookies = document.cookie.split("; ");
  const cookiesObject = {};
  cookies.forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookiesObject[key] = value;
  });
  return cookiesObject;
};

const createTable = (content) => {
  const table = document.createElement("table");
  table.style.width = "100%";
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.innerText = "Name";
  th1.style.paddingBottom = "45px"
  th1.style.fontSize = '19px'
  const th2 = document.createElement("th");
  th2.innerText = "Value";
  th2.style.paddingBottom = "45px"
  th2.style.fontSize = '19px'
  const th3 = document.createElement("th");
  th3.innerText = "Remove";
  th3.style.paddingBottom = "45px"
  th3.style.fontSize = '19px'
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  thead.appendChild(tr);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  for (const key in content) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerText = key;
    td1.style.textAlign = "center"
    const td2 = document.createElement("td");
    td2.innerText = content[key];
    td2.style.textAlign = "center"
    const td3 = document.createElement("td");
    td3.innerText = "❌";
    td3.style.cursor = "pointer";
    td3.style.textAlign = "center"
    td3.addEventListener("click", () => {
      document.cookie = key + '=; Max-Age=0'
      location.reload();
    });
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  return table;
};

cookiesButton.addEventListener("click", (e) => {
  const cookies = getCookies();
  modal.style.display = "block";
  localStorage.setItem("cookies_modal_open", true);
  const table = createTable(cookies);
  modalBody.appendChild(table);
});

window.addEventListener("DOMContentLoaded", () => {
  const modalOpen = localStorage.getItem("cookies_modal_open");
  if (modalOpen) {
    const cookies = getCookies();
    modal.style.display = "block";
    const table = createTable(cookies);
    modalBody.appendChild(table);
  }
});

document.body.appendChild(cookiesButton);
document.body.appendChild(modal);
