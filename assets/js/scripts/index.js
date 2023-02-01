import { InitCards } from "./init-cards.js";
import { InputFilter } from "./input-form.js";

async function Machine() {
  const btn = document.querySelector("button");

  InitCards();
  btn.addEventListener("click", async () => {
    await InputFilter();
  });
}

Machine();
