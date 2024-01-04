import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { writeDataForCurrentUser } from '../../utils/writeDataForCurrentUser';
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";
import { useAuthState } from "../../firebase";
import { Link, Navigate } from "react-router-dom";
import { selectCharactersData } from "../../features/firebase/charactersDataSlice";
import { CharacterObject } from "./CharacterHandler";
import st from './CharacterListPage.module.scss';

function CharacterListPage() {
	const { isAuthenticated } = useAuthState();
	if (isAuthenticated === false) return <Navigate to="/account" />

	const charactersData = useSelector(selectCharactersData);

	// New Character Fields
	const [newCharacterNameInput, setNewCharacterNameInput] = useState('');
	const createNewCharacter = async () => {
		if (!newCharacterNameInput.length) return;

		const charactersArray = [ ...charactersData];
		const characterData = new CharacterObject();
		characterData.characterData.id = uuidv4();
		characterData.characterData.name = newCharacterNameInput;
		charactersArray.push(characterData.characterData);

		writeDataForCurrentUser(charactersArray);
	}

	const [confirmDelete, setConfirmDelete] = useState(false);
	const confirmDeleteCharacter = () => {
		setConfirmDelete(true);
		setTimeout(() => {
			setConfirmDelete(false);
		}, 2000);
	}

	const deleteCharacter = (cid) => {
		let charactersArray = [ ...charactersData];
		charactersArray = charactersArray.filter(char => char.id !== cid);

		writeDataForCurrentUser(charactersArray);
	}

	

	// JSX
	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Characters</PageTitle>
			<div className={"mainContent " + st.characterListLayout}>
				<div className={st.standardFlex}><h1>Character List</h1><button className="slimButton" onClick={confirmDeleteCharacter}>Delete Mode</button></div>
				{
					charactersData?.length && charactersData.map((char, index) => (
						<div key={index} className={st.characterListItem}><Link to={`/characters/${char.id}`}>{char.name || "Hero"}</Link> <button className={ st.deleteButton + ' ' + (confirmDelete && st.visible || '') } onClick={() => deleteCharacter(char.id) }>Confirm Delete</button></div>
					))
				||
					<div>No characters made yet, why not make one?</div>
				}
				<hr />
				{ charactersData !== null && (
					<>
						<h1>Create a new Character</h1>
						<input className={st.newCharacterNameInput} value={newCharacterNameInput} onChange={(event) => setNewCharacterNameInput(event.target.value)} type="text" placeholder="Name" />
						<button onClick={createNewCharacter}>Create</button>
					</>
				)}
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default CharacterListPage;
