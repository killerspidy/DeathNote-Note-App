import { database } from "../services/FirebaseConfig";
import { ref, set, get } from "firebase/database";

export const createUser = (uid, userData) => {
  return set(ref(database, `Users/${uid}`), userData);
};

export const getUserData = (uid) => {
  return get(ref(database, `Users/${uid}`));
};
