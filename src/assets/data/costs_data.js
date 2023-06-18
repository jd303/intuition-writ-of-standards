// How often you see this in society
export const CostRarity = {
	null: 1,
	common: 2,
	uncommon: 5,
	rare: 10,
	epic: 15
};

// How exotic something is
export const CostExotics = {
	null: 1,
	common: 2,
	uncommon: 5,
	rare: 10,
	epic: 15
};

export const Costs = [
	{
	name: "Wages",
	type: "basic",
	costs: [
		{
		name: "Manual Labour, Farming, etc",
		cost: CostRarity.common * CostExotics.null,
		},
		{
		name: "Skilled Labour",
		cost: CostRarity.uncommon * CostExotics.common,
		},
		{
		name: "Expert Labour",
		cost: CostRarity.rare * CostExotics.common,
		},
		{
		name: "Expert Labour + Danger Pay",
		cost: CostRarity.rare * CostExotics.common,
		},
	],
	},
	{
	name: "Accommodation",
	type: "basic",
	costs: [
		{
		name: "Simple",
		cost: CostRarity.common * CostExotics.common,
		},
		{
		name: "Comfortable",
		cost: CostRarity.uncommon * CostExotics.common,
		},
		{
		name: "Lavish",
		cost: CostRarity.rare * CostExotics.common,
		},
	],
	},
  {
    name: "Food",
    type: "basic",
    costs: [
      {
        name: "Rations",
        cost: CostRarity.common * CostExotics.common,
      },
      {
        name: "Meal (basic) / Ale / Wine (cheap)",
        cost: CostRarity.common * CostExotics.common,
      },
      {
        name: "Meal (lavish) / Stout / Wine (quality)",
        cost: CostRarity.common * CostExotics.uncommon,
      },
    ],
  },
  {
    name: "Weapons",
    type: "basic",
    costs: [
		{
			name: "1-Arm Metal Weapons",
			cost: CostRarity.uncommon * CostExotics.uncommon,
		},
		{
			name: "1-Arm Wood and Leather Weapons",
			cost: CostRarity.uncommon * CostExotics.common,
		},
		{
			name: "2-Arm Metal Weapons",
			cost: CostRarity.rare * CostExotics.uncommon,
		},
		{
			name: "2-Arm Wood and Leather Weapons",
			cost: CostRarity.rare * CostExotics.common,
		},
		{
			name: "Small Wooden Shields",
			cost: CostRarity.common * CostExotics.common,
		},
		{
			name: "Small Metal Shields",
			cost: CostRarity.common * CostExotics.uncommon,
		},
		{
			name: "Large Wooden Shields",
			cost: CostRarity.rare * CostExotics.common,
		},
		{
			name: "Large Metal Shields",
			cost: CostRarity.rare * CostExotics.uncommon,
		},
    ],
  },
  {
    name: "Gems",
    type: "luxury",
    costs: [
      {
        name: "Amethyst, Agate, Citrine, Garnet, Onyx, Peridot, Rose Quartz",
        cost: CostRarity.uncommon * CostExotics.uncommon,
      },
      {
        name: "Sapphire, Topaz",
        cost: CostRarity.rare * CostExotics.rare,
      },
      {
        name: "Emerald, Ruby, Diamond",
        cost: CostRarity.epic * CostExotics.rare,
      },
    ],
  },
  {
    name: "Materials (per kg)",
    type: "luxury",
    costs: [
      {
        name: "Harriden Hardstone",
        cost: CostRarity.expensive * 50,
      },
    ],
  },
];
