import React, { useState } from "react";
import PropTypes from "prop-types";

import icoDice from '../../../assets/images/ico.dice.svg';
import st from './Move.module.scss';
import { InputBox } from "./InputBox";
import { PurchaseablePointGroup } from "./PurchaseablePointGroup";
import { Mod } from "./Mod";
import { SubMove } from "./SubMove";

export function Move( { move, pointsSpent = 0, statBonus = 0, rollPopupToggle, printableModsCount = 4, purchaseDetails, clickCallback }) {

	const [descriptionVisible, setDescriptionVisible] = useState(false);
	const toggleDescriptionVisible = () => {
		setDescriptionVisible(!descriptionVisible);
	}

	const [unpurchasedVisible, setUnpurchasedVisible] = useState(false);
	const toggleUnpurchasedVisible = () => {
		setUnpurchasedVisible(!unpurchasedVisible);
	}

	const [purchasedVisible, setPurchasedVisible] = useState(false);
	const togglePurchasedVisible = () => {
		console.log('clicky');
		setPurchasedVisible(!purchasedVisible);
	}

	const isPurchased = (item) => {
		return item.purchased && true || false;
	}
	const isNotPurchased = (item) => {
		return !item.purchased && true || false;
	}

	const purchasedMods = move.mods.filter(isPurchased);
	const unpurchasedMods = move.mods.filter(isNotPurchased);

	const generateInputBoxes = () => {
		let response = [];
		for (let x=0; x < printableModsCount; x++) {
			response.push(<InputBox key={x} />);
		}
		return response;
	}

	return (
		<div className={st.el + ' ' + (move.type == "Move" && st.moveCategory || '') + ' ' + (descriptionVisible && st.descriptionVisible || '')}>
			<div className={st.mainBlock}>
				<div className={st.title + ' ' + (move.type == "Move" && st.moveCategory || '')} onClick={toggleDescriptionVisible}>{move.name}</div>
				<div className={st.pointTrack}><PurchaseablePointGroup count={12} columns={12} purchased={purchaseDetails?.points || 0} clickCallback={clickCallback} purchaseKey={`move.${move.name}`} /></div>
				<div className={st.bonuses + ' forPrint'}><InputBox value={`+${pointsSpent+statBonus}`} /></div>
				<div className={st.buttons + ' notForPrint'}><button className={st.diceRoll} onClick={rollPopupToggle.bind(null, pointsSpent+statBonus)}><img src={icoDice} alt="Roll this Move" /></button></div>
				<div className={st.description}>{ move.type !== "Move" && <span className={st.type}>{move.type}</span>} {move.description}</div>
			</div>
			<div className={st.subMoves}>
				{move.subMoves?.map((move, index) => (
					<SubMove key={index} move={move} rollPopupToggle={rollPopupToggle} isSubMove={true}></SubMove>
				))}
			</div>
			{purchasedMods.length > 0 && ( <>
				<div className={st.modContainer}>
					<div className={st.headingMedium} onClick={togglePurchasedVisible}>Mods</div>
					<div className='forPrint'>
						{ generateInputBoxes() }
					</div>
					<div className={st.allMods + ' ' +(purchasedVisible && st.visible || '')}>
						<div className={st.mods + ' notForPrint'}>
							{move.mods.filter(isPurchased).map((mod, index) => (
								<Mod key={index} mod={mod} moveName={move.name} clickCallback={clickCallback} />
							))}
						</div>
						{unpurchasedMods.length > 0 && ( <>
							<div className={st.headingMedium + ' ' + st.unpurchasedExpander} onClick={toggleUnpurchasedVisible}>Unpurchased Mods</div>
							<div className={st.unpurchasedMods + ' notForPrint ' + (unpurchasedVisible && st.visible || '')}>
								{move.mods.filter(isNotPurchased).map((mod, index) => (
									<Mod key={index} mod={mod} moveName={move.name} clickCallback={clickCallback} />
								))}
							</div>
						</> )}
					</div>
				</div>
			</> )}
		</div>
	);
}

Move.propTypes = {
	move: PropTypes.object.isRequired,
	pointsSpent: PropTypes.number,
	statBonus: PropTypes.number,
	rollPopupToggle: PropTypes.func,
	printableModsCount: PropTypes.number,
	purchaseDetails: PropTypes.object,
	clickCallback: PropTypes.func.isRequired
};