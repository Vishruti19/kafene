const url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products";
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

const productData = () => {
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
      const tcol6 = document.createElement("td");
      tcol1.classList.add("id");
      tcol1.classList.add("id-width");
      tcol1.innerHTML = rowData.id;
      tcol2.classList.add("medicineName");
      tcol2.innerHTML = rowData.medicineName;
      tcol3.classList.add("medicineBrand");
      tcol3.innerHTML = rowData.medicineBrand;
      tcol4.classList.add("expiryDate");
      tcol4.innerHTML = rowData.expiryDate;
      tcol5.classList.add("unitPrice");
      tcol5.innerHTML = `$${rowData.unitPrice}`;
      tcol6.classList.add("stock");
      tcol6.innerHTML = rowData.stock;

      tbody.appendChild(trow);
      trow.appendChild(tcol1);
      trow.appendChild(tcol2);
      trow.appendChild(tcol3);
      trow.appendChild(tcol4);
      trow.appendChild(tcol5);
      trow.appendChild(tcol6);
    }
    filterData();
    countNum.innerHTML =
      document.querySelectorAll(".data-row").length -
      document.querySelectorAll(".hide-row").length;
  });
};

const filterData = () => {
  const trow = document.querySelectorAll(".data-row");
  const todaysDate = new Date();
  const today = `${todaysDate.getDate()}-${todaysDate.toLocaleString(
    "default",
    { month: "short" }
  )}-${todaysDate.getFullYear()}`;
  const minNum = 100;
  if (
    document.querySelector("#expired-filter").checked &&
    document.querySelector("#low-stock-filter").checked
  ) {
    console.log(trow);
    for (let row of trow) {
      const stock = row.querySelector(".stock").textContent;
      const date = row.querySelector(".expiryDate").textContent;
      if (new Date(today) < new Date(date) && minNum < stock) {
        console.log(new Date(today) < new Date(date), minNum < stock);
        for (let obj of Object.entries(row.classList)) {
          if ("hide-row" != obj[1]) {
            console.log("Adding", stock);
            row.classList.add("hide-row");
          }
        }
      } else {
        for (let obj of Object.entries(row.classList)) {
          if ("hide-row" == obj[1]) {
            row.classList.remove("hide-row");
          }
        }
      }
    }
  } else if (
    !document.querySelector("#expired-filter").checked &&
    document.querySelector("#low-stock-filter").checked
  ) {
    for (let row of trow) {
      const date = row.querySelector(".expiryDate").textContent;
      if (new Date(today) < new Date(date)) {
        for (let obj of Object.entries(row.classList)) {
          if ("hide-row" != obj[1]) {
            row.classList.add("hide-row");
          }
        }
      } else {
        for (let obj of Object.entries(row.classList)) {
          if ("hide-row" == obj[1]) {
            row.classList.remove("hide-row");
          }
        }
      }
    }
  } else if (
    document.querySelector("#expired-filter").checked &&
    !document.querySelector("#low-stock-filter").checked
  ) {
    for (let row of trow) {
      const stock = row.querySelector(".stock").textContent;
      if (minNum > stock) {
        for (let obj of Object.entries(row.classList)) {
          if ("hide-row" == obj[1]) {
            row.classList.remove("hide-row");
          }
        }
      } else {
        for (let obj of Object.entries(row.classList)) {
          if ("hide-row" != obj[1]) {
            row.classList.add("hide-row");
          }
        }
      }
    }
  } else {
    for (let row of trow) {
      for (let obj of Object.entries(row.classList)) {
        if ("hide-row" == obj[1]) {
          row.classList.remove("hide-row");
        }
      }
    }
  }
  countNum.innerHTML =
    document.querySelectorAll(".data-row").length -
    document.querySelectorAll(".hide-row").length;
};

window.addEventListener("DOMContentLoaded", productData);

const currentTab = window.location.href;
if (currentTab.includes("products.html")) {
  document.querySelector(".products-tab").classList.add("active-tab");
}
