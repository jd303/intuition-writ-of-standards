import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Header from "../Components/Header/Header";
import { PageTitle } from "../Components/PageTitle/PageTitle";
import { Footer } from "../../components/Components/Footer/Footer";

import styles from "./AccountPage.module.scss";

function AccountPage() {
	const [loggedIn, setLoggedIn] = useState(null);
	const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
	const [emailInput, setEmailInput] = useState('joelmdawson@gmail.com');
	const [passwordInput, setPasswordInput] = useState('3@Antis@Err@Tango');
	const onChangeEmail = (event) => { setEmailInput(event.target.value); }
	const onChangePassword = (event) => { setPasswordInput(event.target.value); }

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
		const auth = getAuth();
		setPersistence(auth, browserLocalPersistence)
		.then(() => {
			signInWithEmailAndPassword(auth, emailInput, passwordInput)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				console.log("LOGGED IN", user);
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log("ERRROR DURING LOGGED IN", error);
			});
		});
	}

	const logout = () => {
		const auth = getAuth();
		auth.signOut().then(() => {
		})
		.catch((error) => {
			console.log("Sign out Error", error);
		});
	}

	const createAccount = () => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, emailInput, passwordInput)
		.then((userCredential) => {
			// Signed up 
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
	}


	return (
		<React.Fragment>
			<Header colour='silver' />
			<PageTitle colour='silver'>Account</PageTitle>
			<div className={styles.accountLayout + " mainContent"}>
				{ loggedIn && (
					<>
						<h1>Account</h1>
						<div>You are logged in as <em>{loggedInUserEmail}</em>, and can create and load your character sheets.</div>
						<button onClick={logout}>Logout</button>
					</>
				) }

				{ !loggedIn && (
					<div>
						<input type="text" name="email" value={emailInput} onChange={onChangeEmail} /><br />
						<input type="password" name="password" value={passwordInput} onChange={onChangePassword} />
						<button type="button" onClick={login}>Submit</button>
					</div>
				) }
			</div>
			<Footer />
		</React.Fragment>
	);
}

export default AccountPage;
