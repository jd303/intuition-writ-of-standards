import { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from './firebaseconfig.json';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
/*const analytics = */ getAnalytics(app);

// Remember auth
export const AuthContext = createContext();
export const AuthContextProvider = props => {
	const [user, setUser] = useState(undefined);
	const [error, setError] = useState(undefined);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(getAuth(app), 
		(user) => {
			setUser(user);
		}, (error) => {
			setError(error);
		})
		return () => unsubscribe()
	}, [])
	
	return <AuthContext.Provider value={{ user, error }} {...props} />
}

export const useAuthState = () => {
	const auth = useContext(AuthContext);
	
	if (!auth) return false;
	else {
		let isAuthenticated;
		if (auth.user === undefined) isAuthenticated = undefined;
		else if (auth.user === null) isAuthenticated = false;
		else isAuthenticated = true;
		return { ...auth, isAuthenticated: isAuthenticated }
	}
}