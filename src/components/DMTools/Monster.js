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

	let image;
	try {
		image = require(`../../assets/images/monsters/${monster.image}`);
	} catch (e) {
		image = '';
	}

	const getSpecialClass = (move, monster) => {
		if (move.specialCost && monster.current_charge >= move.specialCost) return ' ' + st.enabledCharge;
		else if (move.specialCost) return ' ' + st.disabledCharge;
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

	const staggerUp = () => {
		const value = monster.current_stagger;
		const newMonster = { ...monster, current_stagger: value + 1 };
		modifyMonster(newMonster);
	}

	const staggerDown = () => {
		const value = monster.current_stagger;
		const newMonster = { ...monster, current_stagger: value - 1 };
		modifyMonster(newMonster);
	}

	const [statusVisible, setStatusVisible] = useState(false);
	const showMonsterStatusAdd = () => {
		setStatusVisible(true);
	}

	const [imageLarge, setImageLarge] = useState(false);
	const toggleImageLarge = () => setImageLarge(!imageLarge);

	const [descShowing, setDescShowing] = useState(false);
	const toggleDesc = () => setDescShowing(!descShowing);

	/**
	 * CJSX
	 * */
	return (
		<React.Fragment>
			<div className={[st.monster, viewMode && st.viewModeOnly || '', minimalMode && st.minimalMode || ''].join(' ')}>
				<div className={[st.monsterDesc, descShowing ? st.on : ''].join(' ')} dangerouslySetInnerHTML={{ __html:monster.description?.replace(/\n/g, "<br>") }} onClick={toggleDesc}></div>
				<StatusPopup visible={statusVisible} closePopup={() => setStatusVisible(false)} />
				{addClick && (
					<button className={st.addMonster} onClick={() => addClick(monster)}>+</button>
				)}
				{removeClick && (
					<button className={st.addMonster} onClick={() => removeClick(monster)}>-</button>
				)}
				<div className={st.titleBar}>
					<h1 className={st.title}>{monster.name} {monster.description?.length && <span onClick={toggleDesc}>ⓘ</span>}</h1>
					<div className={st.subtitle}>
						{monster.type}, DC {monster.dc}, {monster.size}
						<span className={[st.identifier, st.hideWhenViewMode].join(' ')}><input className={st.subtleInput} value={monster.base} onChange={modifyBase} /></span>
					</div>
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
					<div className={[st.charge, (monster.current_charge && monster.current_charge >= monster.max_charge) ? st.charged : ''].join(' ')}>
						<h2>Stagger:</h2>
						<span className={st.hideWhenViewMode}>{monster.current_stagger} /</span>{monster.max_stagger}
						<button className={st.hideWhenViewMode} onClick={() => staggerUp()}>+</button>
						<button className={st.hideWhenViewMode} onClick={() => staggerDown()}>-</button>
					</div>
				</div>
				<div className={[st.imageContainer, imageLarge && st.imageLarge || ''].join(' ')} onClick={toggleImageLarge}><img src={image} alt="Monster" /></div>
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
					<div className={st.attributes}>
						<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>STR</div><div className={st.attributeValue}>{monster.strength}</div></div>
						<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>DEX</div><div className={st.attributeValue}>{monster.dexterity}</div></div>
						<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>CON</div><div className={st.attributeValue}>{monster.constitution}</div></div>
						<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>INT</div><div className={st.attributeValue}>{monster.intelligence}</div></div>
						<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>WIS</div><div className={st.attributeValue}>{monster.wisdom}</div></div>
						<div className={st.attribute}><div className={st.attributeName + ' ' + st.fonted}>CHA</div><div className={st.attributeValue}>{monster.charisma}</div></div>
					</div>
				</div>
				<div className={st.moves}>
					{monster.properties?.length && (
						<div className={[st.propertyList, st.paddedInnerSection, st.fonted].join(' ')}>
							{monster.properties?.map((prop, index) => (
								<div key={`move-${index}`} className={st.property}>{prop}</div>
							))}
						</div>
					)}
					{(monster.resistances || monster.weaknesses) && (<div className={[st.paddedInnerSection, st.resistancesAndWeaknesses].join(' ')}>
						{monster.resistances && (<div><span className={st.fonted}>Resistances:</span> {monster.resistances}</div>) || <></>}
						{monster.weaknesses && (<div><span className={st.fonted}>Weaknesses:</span> {monster.weaknesses}</div>) || <></>}
					</div>)}
					<div className={st.paddedInnerSection}>
						{monster.combatmoves.map((move, index) => (
							<div key={`combat-move-${index}`} className={st.move + getSpecialClass(move, monster)}>
								<div className={st.moveTitle + ' ' + st.fonted}>
									{move.specialCost && <span><img className={st.icoSpecial} src={icoSpecial} alt="" /> {move.specialCost}</span> || <></>}
									{move.name} ({move.moveRange})
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
									{move.save && <span><span className={st.fonted}>Save:</span> {move.save}</span>}
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