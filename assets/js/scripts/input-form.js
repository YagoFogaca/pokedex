export function InputFilter() {
  const input = document.querySelector("input");

  input.addEventListener("input", () => {
    const cards = document.querySelectorAll(".card-pokemon");
    cards.forEach((card) => {
      if (input.value.length <= 0) {
        card.style.display = "flex";
      } else if (
        !card.outerText.toLowerCase().includes(input.value.toLowerCase())
      ) {
        card.style.display = "none";
      }
    });
  });
}
