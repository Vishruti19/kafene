const url = "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users";
const logout = document.querySelector(".logout");

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
      tcol1.innerHTML = rowData.id;
      tcol2.classList.add("profilePic");
      tcol2.innerHTML = `<img src=${rowData.profilePic}>`;
      tcol3.classList.add("fullName");
      tcol3.innerHTML = rowData.fullName;
      tcol4.classList.add("dob");
      tcol4.innerHTML = rowData.dob;
      tcol5.classList.add("gender");
      tcol5.innerHTML = rowData.gender;
      tcol6.classList.add("currentLocation");
      tcol6.innerHTML = `${rowData.currentCity}, ${rowData.currentCountry}`;

      tbody.appendChild(trow);
      trow.appendChild(tcol1);
      trow.appendChild(tcol2);
      trow.appendChild(tcol3);
      trow.appendChild(tcol4);
      trow.appendChild(tcol5);
      trow.appendChild(tcol6);
    }

    const input = document.querySelector("#search-user");

    input.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        const trow = document.querySelectorAll(".data-row");
        const filter = input.value.toLowerCase();
        if (filter.length < 2) {
          alert("Please enter at least 2 characters!");
        } else {
          for (let row of trow) {
            const fname = row.querySelector(".fullName");
            if (fname.textContent.toLowerCase().includes(filter)) {
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
        }
      }
    });

    const resetButton = document.querySelector("#reset-button");
    resetButton.addEventListener("click", () => {
      input.value = "";
      const hiddenRows = document.querySelectorAll(".hide-row");
      for (let row of hiddenRows) {
        row.classList.remove("hide-row");
      }
    });
  });
};

window.addEventListener("DOMContentLoaded", productData);

const currentTab = window.location.href;
if (currentTab.includes("users.html")) {
  document.querySelector(".users-tab").classList.add("active-tab");
}
