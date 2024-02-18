export const prepareMonster = (monster) => {
	const newMonster = { ...monster };
	newMonster.combatmoves = newMonster.combatmoves?.split("--") || [];
	newMonster.combatmoves = prepareCombatMoves(newMonster.combatmoves);
	newMonster.properties = newMonster.properties?.split("--") || [];
	newMonster.max_verve = newMonster.verve;
	newMonster.current_verve = newMonster.verve;
	newMonster.max_charge = newMonster.charge;
	newMonster.current_charge = 0;
	newMonster.max_stagger = newMonster.stagger;
	newMonster.current_stagger = 0;
	newMonster.statuses = [];
	return newMonster;
}

export const prepareCombatMoves = (moves) => {
	moves = moves.map(move => {
		const moveSplit = move.split("|");
		return {
			name: moveSplit[0]?.trim(),
			moveRange: moveSplit[1]?.trim(),
			specialCost: JSON.parse(moveSplit[2] && moveSplit[2].trim() || false),
			type: moveSplit[3]?.trim(),
			description: moveSplit[4]?.trim(),
			verve_loss: Number(moveSplit[5]?.trim()) || "",
			block_percentage: Number(moveSplit[6]) || "-",
			dodge_percentage: Number(moveSplit[7]) || "-",
			save: moveSplit[8]?.trim() || null
		}
	});
	return moves;
}