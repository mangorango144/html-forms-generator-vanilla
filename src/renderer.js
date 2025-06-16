export function renderSchema(schema, parentKey = "") {
  const container = document.createElement("div");
  container.className = "space-y-6";

  Object.entries(schema).forEach(([field, config]) => {
    const {
      type,
      label,
      hint,
      options,
      schema: nestedSchema,
      ...attributes
    } = config;

    const fieldName = parentKey ? `${parentKey}[${field}]` : field;
    const fieldId = fieldName.replace(/\[|\]/g, "_");
    const labelText = label || capitalize(field);

    if (type === "schema") {
      const fieldset = document.createElement("fieldset");
      fieldset.className =
        "space-y-3 bg-stone-900 p-4 border border-stone-700 rounded-md";

      const legend = document.createElement("legend");
      legend.textContent = labelText;
      legend.className = "mb-2 font-semibold text-white text-lg";

      fieldset.appendChild(legend);
      fieldset.appendChild(renderSchema(nestedSchema, fieldName));
      container.appendChild(fieldset);
      return;
    }

    const wrapper = document.createElement("div");

    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", fieldId);
    labelEl.textContent = labelText;
    labelEl.className = "block mb-1 font-medium text-stone-300";

    wrapper.appendChild(labelEl);

    let input;

    if (type === "select") {
      input = document.createElement("select");
      if (attributes.placeholder) {
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.textContent = attributes.placeholder;
        input.appendChild(placeholderOption);
      }
      options.forEach(([val, text]) => {
        const option = document.createElement("option");
        option.value = val;
        option.textContent = text;
        input.appendChild(option);
      });
    } else if (type === "textarea") {
      input = document.createElement("textarea");
    } else {
      input = document.createElement("input");
      input.type = type;
    }

    input.name = fieldName;
    input.id = fieldId;
    input.className =
      "bg-stone-800 p-2 border border-stone-700 rounded-md w-full text-white";

    Object.entries(attributes).forEach(([key, val]) => {
      input.setAttribute(key, val);
    });

    wrapper.appendChild(input);

    if (hint) {
      const hintEl = document.createElement("div");
      hintEl.textContent = hint;
      hintEl.className = "mt-1 text-stone-400 text-sm";
      wrapper.appendChild(hintEl);
    }

    container.appendChild(wrapper);
  });

  return container;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
