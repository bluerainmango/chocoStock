//! Cannot use the below module? Only CDN in HTML?
//! Working with Bundler?
// import axios from "axios";
// const axios = require("axios");

const form = document.querySelector("form");
const list = document.getElementById("list");

if (form) {
  form.addEventListener("submit", submitHandler);

  async function submitHandler(e) {
    e.preventDefault();
    const item = document.getElementById("item").value;
    const qty = document.getElementById("qty").value;

    console.log(item, qty);

    try {
      await axios.post("/api/v1/choco", {
        item,
        qty
      });

      location.assign("/stock");
    } catch (err) {
      throw new Error(err);
    }
  }
}

if (list) {
  (async () => {
    try {
      const res = await axios.get("/api/v1/choco");
      console.log(res.data.chocos);

      const chocos = res.data.chocos;

      let lis = "";
      for (choco in chocos) {
        const li = `<li class="list-group-item">
      <p class="d-flex justify-content-between"><span class="name">Choco: ${choco}</span><span class="qty"> Quantity: ${chocos[choco]}</span></p>
    </li>`;

        lis += li;
      }

      list.innerHTML = lis;
    } catch (err) {
      console.log(err);
    }
  })();
}
