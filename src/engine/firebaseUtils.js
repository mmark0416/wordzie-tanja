import { dynamicSort } from "./objectDynamycSort";
import { db } from "../db/firebase.js";
import {
  getDocs,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const themesRef = collection(db, "themes");

export const getThemes = async () => {
  try {
    const data = await getDocs(themesRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    filteredData.sort(dynamicSort("name"));
    return filteredData;
  } catch (err) {
    console.error(err);
  }
};

export const getThemeId = async (themeName) => {
  const themeQuery = query(themesRef, where("name", "==", themeName));
  const data = await getDocs(themeQuery);
  const filteredData = data.docs.map((doc) => ({
    id: doc.id,
  }));
  return filteredData[0].id;
};

export const createTheme = async (themeName) => {
  try {
    await addDoc(themesRef, {
      name: themeName,
      checked: false
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTheme = async (id, theme) => {
  const wordDoc = doc(db, "themes", id);
  await updateDoc(wordDoc, { name: theme });
};

export const updateThemeChecked = async (id, checked) => {
  const wordDoc = doc(db, "themes", id);
  await updateDoc(wordDoc, { checked: checked });
};

const wordsRef = collection(db, "words");

export const getWords = async (themeName, isActive = "both") => {
  try {
    let wordsQuery;
    if (themeName[0] === "ALL") {
      if (isActive === "both") {
        wordsQuery = query(wordsRef, orderBy("eng", "asc"));
      } else if (isActive === "active") {
        wordsQuery = query(
          wordsRef,
          where("isKnow", "==", true),
          orderBy("eng", "asc")
        );
      } else if (isActive === "inActive") {
        wordsQuery = query(
          wordsRef,
          where("isKnow", "==", false),
          orderBy("eng", "asc")
        );
      }
    } else {
      if (isActive === "both") {
        wordsQuery = query(
          wordsRef,
          where("theme", "in", themeName),
          orderBy("eng", "asc")
        );
      } else if (isActive === "active") {
        wordsQuery = query(
          wordsRef,
          where("isKnow", "==", true),
          where("theme", "in", themeName),
          orderBy("eng", "asc")
        );
      } else if (isActive === "inActive") {
        wordsQuery = query(
          wordsRef,
          where("isKnow", "==", false),
          where("theme", "in", themeName),
          orderBy("eng", "asc")
        );
      }
    }
    const data = await getDocs(wordsQuery);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredData;
  } catch (error) {
    console.log(error);
  }
};

export const getWord = async (wordId) => {
  try {
    const data = await getDoc(doc(db, "words", wordId));
    if (data.exists()) return data.data();
    else
      return Promise.reject(Error(`No such document: ${wordsRef}.${wordId}`));
  } catch (error) {
    console.log(error);
  }
};

export const updateWord = async (formData) => {
  const wordDoc = doc(db, "words", formData.id);
  const { id: pass, ...rest } = formData;
  await updateDoc(wordDoc, rest);
};

export const createWord = async (formData) => {
  try {
    await addDoc(wordsRef, formData);
  } catch (error) {
    console.log(error);
  }
};

export const getWordByEng = async (eng) => {
  const wordQuery = query(wordsRef, where("eng", "==", eng));
  const data = await getDocs(wordQuery);
  const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return filteredData;
};

