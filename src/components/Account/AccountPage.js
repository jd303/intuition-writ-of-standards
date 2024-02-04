import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import styles from "./AccountPage.module.scss";

function AccountPage() {
	const navigate = useNavigate();
	const navigateToCharacters = () => navigate('/characters');

	const [loginError, setLoginError] = useState(null);
	const [registerError, setRegisterError] = useState(null);
	const [loggedIn, setLoggedIn] = useState(null);
	const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
	const [loginEmailInput, setLoginEmailInput] = useState('');
	const [loginPasswordInput, setLoginPasswordInput] = useState('');
	const onChangeLoginEmail = (event) => { setLoginEmailInput(event.target.value); }
	const onChangeLoginPassword = (event) => { setLoginPasswordInput(event.target.value); }
	const [registerEmailInput, setRegisterEmailInput] = useState('');
	const [registerPasswordInput, setRegisterPasswordInput] = useState('');
	const onChangeRegisterEmail = (event) => { setRegisterEmailInput(event.target.value); }
	const onChangeRegisterPassword = (event) => { setRegisterPasswordInput(event.target.value); }

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setLoggedIn(true);
				setLoggedInUserEmail(user.email);
			} else {
				setLoggedIn(false);
				setLoggedInUserEmail('');
			}
		});
	}, []);

	const login = () => {
		setLoginError('');
		const auth = getAuth();

		signInWithEmailAndPassword(auth, loginEmailInput, loginPasswordInput)
		.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			console.log("LOGGED IN", user);
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			setLoginError(errorMessage);
		});
	}

	const logout = () => {
		const auth = getAuth();
		auth.signOut().then(() => {
		})
		.catch((error) => {});
	}

	const createUser = () => {
		setRegisterError('');
		const auth = getAuth();
        createUserWithEmailAndPassword(auth, registerEmailInput, registerPasswordInput)
        .then((userCredential) => {
			const user = userCredential.user;
			const uid = user.uid;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorMessage);
			setRegisterError(errorMessage);
		});
    }

	// JSX
	return (
		<React.Fragment>
			<Header colour='silver' />
			<PageTitle colour='silver'>Account</PageTitle>
			<div className={styles.accountLayout + " mainContent"}>
				{ loggedIn && (
					<>
						<h1>Account</h1>
						<div>You are logged in as <em>{loggedInUserEmail}</em>, and can create and load your character sheets.</div>
						<button className="slimButton" onClick={logout}>Logout</button> <button onClick={navigateToCharacters}>View Character List</button>
					</>
				) }

				{ !loggedIn && (
					<div>
						<h2>Login</h2>
						<input type="text" name="email" placeholder="Email" value={loginEmailInput} onChange={onChangeLoginEmail} />
						<input type="password" name="password" placeholder="Password" value={loginPasswordInput} onChange={onChangeLoginPassword} />
						<button  className="slimButton"type="button" onClick={login}>Login</button>
						<div className={styles.error}>{loginError}</div>
						<h2>Register</h2>
						<input type="text" name="email" placeholder="Email" value={registerEmailInput} onChange={onChangeRegisterEmail} />
						<input type="password" name="password" placeholder="Password" value={registerPasswordInput} onChange={onChangeRegisterPassword} />
						<button className="slimButton" type="button" onClick={createUser}>Register</button>
						<div className={styles.error}>{registerError}</div>
					</div>
				) }
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default AccountPage;
