import "./style.css";
import { renderSchema } from "./renderer.js";
import { exampleSchema } from "./schema.js";

const schemaInput = document.getElementById("schema-input");
const form = document.getElementById("schema-form");
const clearBtn = document.getElementById("clear-btn");
const loadExampleBtn = document.getElementById("load-example");
const output = document.getElementById("output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  output.innerHTML = "";

  try {
    const parsed = JSON.parse(schemaInput.value);
    const renderedFields = renderSchema(parsed);
    output.appendChild(renderedFields);
  } catch {
    const err = document.createElement("div");
    err.textContent = "Invalid JSON schema.";
    err.className = "text-red-400";
    output.appendChild(err);
  }
});

clearBtn.addEventListener("click", () => {
  schemaInput.value = "";
  output.innerHTML = "";
});

loadExampleBtn.addEventListener("click", () => {
  schemaInput.value = JSON.stringify(exampleSchema, null, 2);
});
