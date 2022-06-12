import firebase from "firebase/compat/app"
import "firebase/compat/auth";  
import{createUserWithEmailAndPassword,signInWithEmailAndPassword} from   "firebase/auth";
import {getFirestore,setDoc,doc,serverTimestamp, updateDoc,deleteDoc,collection,getDocs} from "firebase/firestore"


export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  firebase.initializeApp(firebaseConfig)
 export const auth =  firebase.auth()

 const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider); 


export const createUserWithEmailPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
export const signInWithEmailPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => auth.signOut();

const database = getFirestore(firebase.initializeApp(firebaseConfig));

export const addUserInDatabase = async (uid, data) => {
    try {
      return await setDoc(doc(database, "Users", uid), {
        ...data,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  export const  addLinkInDatabase = async(uid,links)=>{
    try {
      return await setDoc(doc(database, `Users/${uid}/links`, `${links.id}`), {
        ...links,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log("Err: ", err);
    }
  }

  export const updateLinkTitleInDatabase = async (uid, linkId, title) => {
    try {
      return await updateDoc(doc(database, `Users/${uid}/links`, `${linkId}`), {
        title,
      });
    } catch (err) {
      console.log("Err: ", err);
    }
  };


  export const getUserLinksFromFirebase = async (uid) => {
    try {
      let userLinks = [];
      await (
        await getDocs(collection(database, `Users/${uid}/links`))
      ).forEach((doc) => {
        userLinks.push({ ...doc.data() });
      });
      return userLinks.reverse();
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  export const deleteALinkInFirebase = async (uid, linkId) => {
    await deleteDoc(doc(database, `Users/${uid}/links`, `${linkId}`));
  };



  export default firebase