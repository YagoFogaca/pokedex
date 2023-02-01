export async function CreateCard(img, name) {
  const sectionCards = document.getElementById("card-presentation");
  const cards = `
      <div class="card-pokemon">
      <figure>
      <img
      class="card-pokemon--img"
      src=${img}
      />
      </figure>
      <p class="card-pokemon--name">${name}</p>
      </div>
      `;

  sectionCards.insertAdjacentHTML("beforeend", cards);
}
