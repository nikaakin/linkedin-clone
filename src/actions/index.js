import { auth, provider, storage } from "../firebase";
import db from "../firebase";
import {
  SET_USER,
  GOOGLE_AUTH_ERROR,
  SET_LOADING_STATUS,
  GET_ARTICLES,
} from "./actionTypes";

export const setUser = (type, payload) => {
  return { type, payload };
};

export const getArticles = (payload) => {
  return { type: GET_ARTICLES, payload };
};

export const setLoading = (status) => {
  return { type: SET_LOADING_STATUS, status };
};

export const signInAPI = () => (dispatch) => {
  auth
    .signInWithPopup(provider)
    .then((payload) => dispatch(setUser(SET_USER, payload.user)))
    .catch((err) => {
      dispatch(setUser(GOOGLE_AUTH_ERROR, err));
    });
};

export const signOutAPI = () => (dispatch) =>
  auth
    .signOut()
    .then(() => dispatch(setUser(SET_USER, null)))
    .catch((err) => dispatch(setUser(GOOGLE_AUTH_ERROR, err.message)));

export const getUserAuth = () => (dispatch) => {
  //  idk why async here
  auth.onAuthStateChanged(async (user) => {
    if (user) dispatch(setUser(SET_USER, user));
  });
};

export const postArticleAPI = (payload) => (dispatch) => {
  dispatch(setLoading(true));
  if (payload.image != "") {
    const upload = storage
      .ref(`images/${payload.image.name}`)
      .put(payload.image);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log(`Progress: ${progress}%`);

        if (snapshot.state === "RUNNING") {
          console.log(`Progress: ${progress}%`);
        }
      },
      (err) => console.log(`${err.code}: ${err.message}`),
      async () => {
        const downloadURL = await upload.snapshot.ref.getDownloadURL();
        db.collection("articles").add({
          actor: {
            description: payload.user.email,
            title: payload.user.displayName,
            date: payload.timestamp,
            image: payload.user.photoURL,
          },
          video: payload.video,
          sharedImg: downloadURL,
          comment: 0,
          description: payload.description,
        });
        dispatch(setLoading(false));
      }
    );
  } else if (payload.video) {
    db.collection("articles").add({
      actor: {
        description: payload.user.email,
        title: payload.user.displayName,
        date: payload.timestamp,
        image: payload.user.photoURL,
      },
      video: payload.video,
      sharedImg: "",
      comment: 0,
      description: payload.description,
    });
    dispatch(setLoading(false));
  }
  dispatch(setLoading(false));
};

export const getArticlesAPI = () => (dispatch) => {
  let payload;
  db.collection("articles")
    .orderBy("actor.date", "desc")
    .onSnapshot((snapshot) => {
      payload = snapshot.docs.map((doc) => doc.data());
      dispatch(getArticles(payload));
    });
};
