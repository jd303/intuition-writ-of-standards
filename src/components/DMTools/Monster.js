import React, { useState } from "react";
import PropTypes from "prop-types";
import StatusPopup from "./Combat/StatusPopup";

// Styles
import st from './Monster.module.scss';
import icoSpecial from '../../assets/images/icons/ico.stamina.active.svg';

Monster.propTypes = {
  monster: PropTypes.object.isRequired,
  viewMode: PropTypes.bool,
  minimalMode: PropTypes.bool,
  addClick: PropTypes.func,
  removeClick: PropTypes.func,
  modifyMonster: PropTypes.func,
  showMonsterChargeAdjustment: PropTypes.func,
};

function Monster( { monster, viewMode = true, minimalMode = false, addClick, removeClick, modifyMonster, showMonsterChargeAdjustment }) {

	const getSpecialClass = (move, monster) => {
		if (move.special && monster.current_charge >= move.special) return ' ' + st.enabledCharge;
		else if (move.special) return ' ' + st.disabledCharge;
		return '';
	}

	const modifyBase = (event) => {
		const value = event.target.value;
		const newMonster = { ...monster, base: value };
		modifyMonster(newMonster);
	}

	const modifyNotes = (event) => {
		const value = event.target.value;
		const newMonster = { ...monster, notes: value };
		modifyMonster(newMonster);
	}

	const verveUp = () => {
		const value = monster.current_verve;
		const newMonster = { ...monster, current_verve: value + 1 };
		modifyMonster(newMonster);
	}

	const verveDown = () => {
		const value = monster.current_verve;
		const newMonster = { ...monster, current_verve: value - 1 };
		modifyMonster(newMonster);
	}

	const chargeUp = () => {
		const value = monster.current_charge;
		const newMonster = { ...monster, current_charge: value + 1 };
		modifyMonster(newMonster);
	}

	const chargeDown = () => {
		const value = monster.current_charge;
		const newMonster = { ...monster, current_charge: value - 1 };
		modifyMonster(newMonster);
	}

	const [statusVisible, setStatusVisible] = useState(false);
	const showMonsterStatusAdd = () => {
		console.log("SET VISIBLE");
		setStatusVisible(true);
	}

	/**
	 * CJSX
	 * */
	return (
		<React.Fragment>
			<div className={[st.monster, viewMode && st.viewModeOnly || '', minimalMode && st.minimalMode || ''].join(' ')}>
				<StatusPopup visible={statusVisible} closePopup={() => setStatusVisible(false)} />
				{addClick && (
					<button className={st.addMonster} onClick={() => addClick(monster)}>+</button>
				)}
				{removeClick && (
					<button className={st.addMonster} onClick={() => removeClick(monster)}>-</button>
				)}
				<div className={st.titleBar}>
					<h1 className={st.title}>{monster.name}</h1>
					<div className={[st.identifier, st.hideWhenViewMode].join(' ')}><input className={st.subtleInput} value={monster.base} onChange={modifyBase} /></div>
				</div>
				<div className={st.metaBar}>
					<div className={st.verve}>
						<div className={st.verveValues}>
							<h2>Verve:</h2>
							<span className={st.hideWhenViewMode}>{monster.current_verve} /</span>{monster.max_verve}
							<button className={st.hideWhenViewMode} onClick={() => verveUp()}>+</button>
							<button className={st.hideWhenViewMode} onClick={() => verveDown()}>-</button>
						</div>
					</div>
					<div className={[st.charge, (monster.current_charge && monster.current_charge >= monster.max_charge) ? st.charged : ''].join(' ')}>
						<h2>Charge:</h2>
						<span className={st.hideWhenViewMode}>{monster.current_charge} /</span>{monster.max_charge}
						<button className={st.hideWhenViewMode} onClick={() => chargeUp()}>+</button>
						<button className={st.hideWhenViewMode} onClick={() => chargeDown()}>-</button>
					</div>
				</div>
				<div className={st.imageContainer}><img src={require(`../../assets/images/monsters/${monster.image}`)} alt="Monster" /></div>
				<div className={[st.statuses, st.paddedInnerSection, st.hideWhenViewMode].join(' ')}>
					<div className={st.column}>
						<h2>Statuses <button className='slimButton' onClick={() => showMonsterStatusAdd(monster)}>Add +</button></h2>
						<div className={st.statusList}>
							<button className={[st.status, 'slimButton'].join(' ')}>Cautious: 3</button>
							<button className={[st.status, 'slimButton'].join(' ')}>Paralysed: 3</button>
						</div>
					</div>
					<div className={st.column}>
						<h2>Notes</h2>
						<textarea value={monster.notes} onChange={modifyNotes}></textarea>
					</div>
				</div>
				<div className={st.core + ' ' + st.paddedInnerSection}>
					<h2>Core</h2>
					<div className={st.attributes}>
						<div className={st.column}>
							<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>STR</div><div className={st.attributeValue}>1</div></div>
							<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>DEX</div><div className={st.attributeValue}>1</div></div>
							<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>CON</div><div className={st.attributeValue}>2</div></div>
						</div>
						<div className={st.column}>
							<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>INT</div><div className={st.attributeValue}>2</div></div>
							<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>WIS</div><div className={st.attributeValue}>3</div></div>
							<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>CHA</div><div className={st.attributeValue}>0</div></div>
						</div>
					</div>
				</div>
				<div className={st.monsterStatuses + ' ' + st.paddedInnerSection}>
					<h2>Monster Stats</h2>
					<div className={st.fonted}>Stagger</div><div>{monster.current_stagger} / {monster.max_stagger}</div>
					<div className={st.fonted}>Daze</div><div>{monster.current_daze} / {monster.max_daze}</div>
					<div className={st.fonted}>Exhaust</div><div>{monster.current_exhaust} / {monster.max_exhaust}</div>
				</div>
				<div className={st.moves}>
					{monster.properties?.length && (
						<div className={[st.propertyList, st.paddedInnerSection, st.fonted].join(' ')}>
							{monster.properties?.map((prop, index) => (
								<div key={`move-${index}`} className={st.property}>{prop}</div>
							))}
						</div>
					)}
					<div className={st.paddedInnerSection}>
						{monster.combatmoves.map((move, index) => (
							<div key={`combat-move-${index}`} className={st.move + getSpecialClass(move, monster)}>
								<div className={st.moveTitle + ' ' + st.fonted}>
									{move.special && <span><img className={st.icoSpecial} src={icoSpecial} alt="" /> {move.special}</span> || <></>}
									{move.name} ({move.ranged && 'Ranged' || 'Melee'})
									<div className={st.type}>{move.type}</div>
								</div>
								<div className={st.moveVerve}>
									{move.verve_loss}
								</div>
								<div className={st.moveDescription}>
									{move.description}
								</div>
								<div className={st.moveDefences}>
									<span className={st.fonted}>Block:</span> {move.block_percentage}
									<span className={st.fonted}>Dodge:</span> {move.dodge_percentage}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Monster;