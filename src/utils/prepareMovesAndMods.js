export const prepareMovesAndMods = (moves_and_mods) => {
	const response = {};
	let lastItemType;
	let lastItemCategory;
	let currentCategory;
	let currentMove;
	
	moves_and_mods.forEach(item => {
		currentCategory = item.category;
		if (!response[currentCategory]) response[currentCategory] = createCategory(item.name);

		switch (item.type) {
			case "Move":
				response[currentCategory].moves.push(createMove(item));
				currentMove = response[currentCategory].moves.find(move => move.name == item.name);
				lastItemType = "move-ish";		
			break;
			case "Primary":
			case "Reaction":
				if (lastItemType == "move-ish" && lastItemCategory == currentCategory) {
					const lastMove = response[currentCategory].moves[response[currentCategory].moves.length - 1];
					lastMove.subMoves.push(createMove(item));
				} else {
					response[currentCategory].moves.push(createMove(item));
					currentMove = response[currentCategory].moves.find(move => move.name == item.name);
				}

				lastItemType = "move-ish";
			break;
			case "Mod":
			case "Passive":
				currentMove?.mods.push(createMod(item));
				lastItemType = "mod";
			break;
		}

		lastItemCategory = currentCategory;
	});

	return response;
}

function createCategory(name) {
	return {
		"category": name,
		"moves": []
	}
}

function createMove(move) {
	return {
		"id": move.id,
		"name": move.name,
		"type": move.type,
		"description": move.description,
		"subMoves": [],
		"mods": []
	}
}

function createMod(mod) {
	return {
		"name": mod.name,
		"type": mod.type,
		"stamina": mod.stamina,
		"quick": mod.quick,
		"description": mod.description
	}
}