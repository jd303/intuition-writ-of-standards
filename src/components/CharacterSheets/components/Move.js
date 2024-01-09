import React, { useState } from "react";
import PropTypes from "prop-types";

import icoDice from '../../../assets/images/icons/ico.dice.svg';
import st from './Move.module.scss';
import { InputBox } from "./InputBox";
import { PurchaseablePointGroup } from "./PurchaseablePointGroup";
import { Mod } from "./Mod";
import { SubMove } from "./SubMove";

export function Move( { move, toggleRollPopup, printableModsCount = 4, purchaseDetails, clickCallback }) {

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
		setPurchasedVisible(!purchasedVisible);
	}

	const modIsPurchased = (mod) => {
		const modID = mod.id;
		return (purchaseDetails && purchaseDetails.mods && purchaseDetails.mods.includes(modID)) ? true : false;
	}
	const modIsNotPurchased = (mod) => {
		const modID = mod.id;
		if (!purchaseDetails || !purchaseDetails.mods) return true;
		return !purchaseDetails.mods.includes(modID);
	}

	const purchasedMods = move.mods.filter(modIsPurchased);
	const unpurchasedMods = move.mods.filter(modIsNotPurchased);

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
				<div className={st.pointTrack}><PurchaseablePointGroup count={12} columns={12} purchased={purchaseDetails?.points || 0} clickCallback={clickCallback} purchaseKey={`move.${move.id}`} /></div>
				<div className={st.bonuses + ' forPrint'}><InputBox value={`+${purchaseDetails?.points}`} /></div>
				<div className={st.buttons + ' notForPrint'}><button className={st.diceRoll} onClick={toggleRollPopup.bind(null, move.name, purchaseDetails?.points)}><img src={icoDice} alt="Roll this Move" /></button></div>
				<div className={st.description}>{ move.type !== "Move" && <span className={st.type}>{move.type}</span>} {move.description}</div>
			</div>
			<div className={st.subMoves}>
				{move.subMoves?.map((move, index) => (
					<SubMove key={index} move={move}></SubMove>
				))}
			</div>
			<div className={st.modContainer}>
				<div className={st.headingMedium} onClick={togglePurchasedVisible}>Mods</div>
				<div className='forPrint'>
					{ generateInputBoxes() }
				</div>
				<div className={st.allMods + ' ' +(purchasedVisible && st.visible || '')}>
					{purchasedMods.length > 0 && ( <>
						<div className={st.mods + ' notForPrint'}>
							{purchasedMods.map((mod, index) => (
								<Mod key={index} mod={mod} moveID={move.id} clickCallback={clickCallback} purchased={true} />
							))}
						</div>
					</> )}
					{unpurchasedMods.length > 0 && ( <>
						<div className={st.headingMedium + ' ' + st.unpurchasedExpander} onClick={toggleUnpurchasedVisible}>Unpurchased Mods</div>
						<div className={st.unpurchasedMods + ' notForPrint ' + (unpurchasedVisible && st.visible || '')}>
							{unpurchasedMods.map((mod, index) => (
								<Mod key={index} mod={mod} moveID={move.id} clickCallback={clickCallback} purchased={false} />
							))}
						</div>
					</> )}
				</div>
			</div>
		</div>
	);
}

Move.propTypes = {
	move: PropTypes.object.isRequired,
	toggleRollPopup: PropTypes.func,
	printableModsCount: PropTypes.number,
	purchaseDetails: PropTypes.object,
	clickCallback: PropTypes.func.isRequired
};