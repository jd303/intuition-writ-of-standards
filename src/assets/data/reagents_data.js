export const Rarity = {
  Common: "Common",
  Uncommon: "Uncommon",
  Rare: "Rare",
  Legendary: "Legendary",
};

export const AlchemicalTypes = {
  Chemical: "Chemical",
  Flora: "Flora",
  Fauna: "Fauna",
  Mineral: "Mineral",
};

class ReagentProperty {
  code;
  name;
  colour;

  constructor(code, name, colour) {
    this.code = code;
    this.name = name;
    this.colour = colour;
  }
  get info() {
    return { code: this.code, name: this.name, colour: this.colour };
  }
}

export const ReagentProperties = {
  For: new ReagentProperty("For", "Fortify", "#888").info,
  The: new ReagentProperty("The", "Thermality", "#e69138").info,
  Hyd: new ReagentProperty("Hyd", "Hydrant", "#3c78d8").info,
  Vig: new ReagentProperty("Vig", "Vigour", "#6aa84f").info,
  Soo: new ReagentProperty("Soo", "Soothe", "#a64d79").info,
  Exc: new ReagentProperty("Exc", "Excite", "#f1c232").info,
  Con: new ReagentProperty("Con", "Confusion", "#674ea7").info,
  Cor: new ReagentProperty("Cor", "Corrode", "#b6d7a8").info,
  Poi: new ReagentProperty("Poi", "Poison", "#cc0000").info,
  Oil: new ReagentProperty("Oil", "Oil", "#111").info,
  Sce: new ReagentProperty("Sce", "Scent", "#e2a2de").info,
  Wil: new ReagentProperty("Wil", "Wild", "#111").info,
};