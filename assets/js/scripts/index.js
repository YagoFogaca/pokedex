import { InitCards } from "./init-cards.js";
import { InputFilter } from "./input-form.js";

async function Machine() {
  window.scroll({
    behavior: "smooth",
  });

  let initial = 0;

  const btn = document.querySelector("button");
  window.addEventListener("scroll", function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      console.log("helo");
      initial += 25;

      InitCards(initial);
    }
  });

  InitCards(initial);

  btn.addEventListener("click", async () => {
    await InputFilter();
  });
}

Machine();
