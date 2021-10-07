import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYJUbNp_N5kx4_vQBvjMguH7_NqqxqfLw",
  authDomain: "qiriperuecommerce.firebaseapp.com",
  projectId: "qiriperuecommerce",
  storageBucket: "qiriperuecommerce.appspot.com",
  messagingSenderId: "506280945184",
  appId: "1:506280945184:web:6d77a95472fd0f964c3e45",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export const uploadImage = (file) => {
  return new Promise((resolve, eject) => {
    const uploadProcess = storage
      .ref(`images/${file.name}-${file.lastModified}`)
      .put(file);

    uploadProcess.on(
      "state_changed",
      (snapshot) => console.log("la imagen se esta subiendo", snapshot),
      eject,
      () => {
        console.log("enter", file);
        storage
          .ref("images")
          .child(`${file.name}-${file.lastModified}`)
          .getDownloadURL()
          .then(resolve);
      }
    );
  });
};
