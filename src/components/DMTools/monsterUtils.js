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
	newMonster.current_stagger = newMonster.stagger;
	newMonster.max_daze = newMonster.daze;
	newMonster.current_daze = newMonster.daze;
	newMonster.max_exhaust = newMonster.exhaust;
	newMonster.current_exhaust = newMonster.exhaust;
	return newMonster;
}

export const prepareCombatMoves = (moves) => {
	moves = moves.map(move => {
		const moveSplit = move.split("|");
		return {
			name: moveSplit[0]?.trim(),
			ranged: JSON.parse(moveSplit[1]?.trim()),
			special: JSON.parse(moveSplit[2]?.trim()),
			type: moveSplit[3]?.trim(),
			description: moveSplit[4]?.trim(),
			verve_loss: Number(moveSplit[5]?.trim()) || "",
			block_percentage: Number(moveSplit[6]) || "-",
			dodge_percentage: Number(moveSplit[7]) || "-"
		}
	});
	return moves;
}