import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export const writeDataForCurrentUser = (data) => {
	const auth= getAuth();
	const db = getDatabase();
	set(ref(db, `characters/${auth.currentUser.uid}`), data);
}