export const CostLevels = {
  basic: 1,
  moderate: 3,
  high: 6,
  expensive: 10,
};

export const Costs = [
  {
    name: "Accommodation",
    type: "basic",
    costs: [
      {
        name: "Simple",
        cost: CostLevels.basic,
      },
      {
        name: "Comfortable",
        cost: CostLevels.moderate,
      },
      {
        name: "Lavish",
        cost: CostLevels.high,
      },
    ],
  },
  {
    name: "Food",
    type: "basic",
    costs: [
      {
        name: "Rations",
        cost: CostLevels.basic * 2,
      },
      {
        name: "Meal (basic) / Ale / Wine (cheap)",
        cost: CostLevels.basic,
      },
      {
        name: "Meal (lavish) / Stout / Wine (quality)",
        cost: CostLevels.moderate,
      },
    ],
  },
  {
    name: "Gems",
    type: "luxury",
    costs: [
      {
        name: "Amethyst, Agate, Citrine, Garnet, Onyx, Peridot, Rose Quartz",
        cost: CostLevels.expensive,
      },
      {
        name: "Sapphire, Topaz",
        cost: CostLevels.expensive * 10,
      },
      {
        name: "Emerald, Ruby, Diamond",
        cost: CostLevels.expensive * 50,
      },
    ],
  },
];
