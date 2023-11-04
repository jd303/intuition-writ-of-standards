const AnimalCompanionMoveTypes = {
	basic: "Basic",
	advanced: "Advanced",
};

class Gadget {
	name;
	dc;
	material;
	standards;
	description;

	constructor({ name, dc, material, standards, description }) {
		this.name = name;
		this.dc = dc;
		this.material = material;
		this.standards = standards;
		this.description = description;
	}
}

export const Materials = {
	Iron: "Iron",
	Orraquartz: "Orraquartz",
  };

/**
 * Gadgets
 * */
export const gadgets = [
	new Gadget({
		name: "Caltrop Spreader",
		dc: 2,
		material: Materials.Iron,
		standards: 5,
		description: "While using any Move that changes your position, you can Activate this to have it let off Caltrops.  Enemies and allies travelling through Caltrops have their speed halved for squares containing or adjacent to Caltrops."
	}),
	new Gadget({
		name: "Noisy Peeper",
		dc: 2,
		material: Materials.Orraquartz,
		standards: 15,
		description: "This gadget can be Activated to make an obnoxious noise.  The noise can be delayed by up to 5 minutes.  It can be heard from 20m away."
	}),
];
