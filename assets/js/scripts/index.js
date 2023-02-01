import { CreateCards } from "../scripts/create-card.js";
import { InputFilter } from "./input-form.js";

async function Machine() {
  CreateCards();
  InputFilter();
}

Machine();
