const url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders";
const logout = document.querySelector(".logout");
const countNum = document.querySelector(".count-number");

logout.addEventListener("click", () => {
  location.href = "./index.html";
  localStorage.clear();
});

if (localStorage.getItem("isLoggedIn") !== "true") {
  location.href = "./index.html";
}

const data = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

const orderData = () => {
  const data1 = data(url);
  data1.then((response) => {
    const tbody = document.querySelector(".table-body");
    for (let rowData of response) {
      const trow = document.createElement("tr");
      trow.classList.add("data-row");
      const tcol1 = document.createElement("td");
      const tcol2 = document.createElement("td");
      const tcol3 = document.createElement("td");
      const tcol4 = document.createElement("td");
      const tcol5 = document.createElement("td");
      const p = document.createElement("p");
      tcol1.classList.add("id");
      tcol1.classList.add("id-width");
      tcol1.innerHTML = rowData.id;
      tcol2.classList.add("customerName");
      tcol2.innerHTML = rowData.customerName;
      tcol3.classList.add("orderDate");
      tcol3.innerHTML = rowData.orderDate;
      p.classList.add("orderTime");
      p.innerHTML = rowData.orderTime;
      tcol4.classList.add("amount");
      tcol4.innerHTML = `$${rowData.amount}`;
      tcol5.classList.add("orderStatus");
      tcol5.innerHTML = rowData.orderStatus;

      tbody.appendChild(trow);
      trow.appendChild(tcol1);
      trow.appendChild(tcol2);
      trow.appendChild(tcol3);
      tcol3.appendChild(p);
      trow.appendChild(tcol4);
      trow.appendChild(tcol5);
    }
    countNum.innerHTML = response.length;
  });
};

const filterOrders = (e) => {
  if (e.currentTarget.checked) {
    const trow = document.querySelectorAll(".data-row");
    const filter = e.currentTarget.name;
    for (let row of trow) {
      const fname = row.querySelector(".orderStatus");
      if (fname.textContent.includes(filter)) {
        for (let obj of Object.entries(row.classList)) {
          if ("hide-row" === obj[1]) {
            row.classList.remove("hide-row");
          }
        }
      }
    }
  } else {
    const trow = document.querySelectorAll(".data-row");
    const filter = e.currentTarget.name;
    for (let row of trow) {
      const fname = row.querySelector(".orderStatus");
      if (fname.textContent.includes(filter)) {
        for (let obj of Object.entries(row.classList)) {
          if ("hide-row" !== obj[1]) {
            row.classList.add("hide-row");
          }
        }
      }
    }
  }
  countNum.innerHTML =
    document.querySelectorAll(".data-row").length -
    document.querySelectorAll(".hide-row").length;
};

window.addEventListener("DOMContentLoaded", orderData);
const currentTab = window.location.href;
if (currentTab.includes("orders.html")) {
  document.querySelector(".orders-tab").classList.add("active-tab");
}
