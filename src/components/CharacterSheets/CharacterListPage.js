import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";
import { useAuthState } from "../../firebase";
import { Link, Navigate } from "react-router-dom";
import { selectCharactersData } from "../../features/firebase/charactersDataSlice";
import { prepareCharacterName } from '../../utils/prepareCharacterName';

function CharacterListPage() {
	const { isAuthenticated } = useAuthState();
	if (isAuthenticated === false) return <Navigate to="/account" />

	const characters = useSelector(selectCharactersData);
	console.log("CHARS", characters);


	// New Character Fields
	const [newCharacterNameInput, setNewCharacterNameInput] = useState('');
	const createNewCharacter = () => {
		console.log("CLICKY");
	}

	// JSX
	return (
		<React.Fragment>
			<Header colour="silver" />
			<PageTitle colour="silver">Characters</PageTitle>
			<div className={"mainContent"}>
				<h1>Character List</h1>
				{characters.map((char, index) => (
					<Link to={`/characters/${prepareCharacterName(char.name)}`} key={index}>{char.name}</Link>
				))}
				<h1>Create a new Character</h1>
				<input value={newCharacterNameInput} onChange={(event) => setNewCharacterNameInput(event.target.value)} type="text" />
				<button onClick={createNewCharacter}>Create</button>
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default CharacterListPage;
