import { useEffect, useState } from "react";
import { getWords, updateWord } from "../engine/firebaseUtils.js";
import {
  CloseIcon,
  ListIcon,
  PhotoImageIconBlack,
  PhotoImageIconWhite,
} from "../component/icon.jsx";
import Word from "../component/Word.jsx";
import {
  addLastWork,
  disableLastWork
} from "../state/selected/selectedSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Start() {
  const dispatch = useDispatch();
  const { selected, lastWork } = useSelector((state) => state.selected);
  const [words, setWords] = useState([]);
  const [start, setStart] = useState(false);
  const [randomWord, setRandomWord] = useState([]);
  let [isNext, setIsNext] = useState(true);
  let [selectedList, setSelectedList] = useState([]);
  const [isKnow, setIsKnow] = useState();
  const [counter, setCounter] = useState(1);
  const [max, setMax] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [isList, setIsList] = useState(false);
  const [first, setFirst] = useState("mix");
  const [isActive, setIsActive] = useState("both");
  const [lastWorkCheck, setLastWorkCheck] = useState(selected.indexOf(lastWork[0]) !== -1);

  useEffect(() => {
    const getData = async () => {
      const words = await getWords(selected, isActive);
      setWords(words);
    };
    getData();
  }, []);

  useEffect(() => {
    renderWord(words);
  }, [words]);

  useEffect(() => {
    setCounter(selectedList.length);
  }, [selectedList]);

  useEffect(() => {
    setSelectedList([]);
    renderWord()
  }, [isActive]);


  const handleIsKnow = (ev) => {
    const checked = ev.target.checked;
    setIsKnow(checked);
    const formData = {
      eng: randomWord[4],
      pronounce: randomWord[5],
      hun: randomWord[3],
      sentence: randomWord[6],
      isKnow: checked,
      id: randomWord[2],
    };
    updateWord(formData);
    const i = words.findIndex((word) => word.id === randomWord[2]);
    if (isActive !== "both") {
      words.splice(i, 1)
      const newSelectedList = selectedList.filter((index) => index !== i);
      setSelectedList(newSelectedList)
      isNext = true
      renderWord()
    } else {
      words[i].isKnow = checked;
    }
  };


  const renderWord = () => {
    setMax(words.length);
    setStart(true);
    if (isNext && words.length !== 0) {
      let randomNum = Math.floor(Math.random() * words.length);

      if (selectedList.length === words.length) {
        selectedList = [];
        setSelectedList([]);
      }
      while (selectedList.indexOf(randomNum) !== -1) {
        randomNum = Math.floor(Math.random() * words.length);
      }
      setSelectedList((precSelectedList) => [...precSelectedList, randomNum]);

      const randomL = Math.floor(Math.random() * 2);

      const id = words[randomNum].id;
      const hun = words[randomNum].hun;
      const eng = words[randomNum].eng;
      const pronounce = words[randomNum].pronounce;
      const sentence = words[randomNum].sentence;
      const isKnow = words[randomNum].isKnow;

      const wordMix = words[randomNum].mix

      const firstMix = wordMix && (wordMix === "eng" ? hun : eng)
      const firstRandomWord =
        (first === "ukr" && hun) ||
        (first === "eng" && eng) ||
        (first === "mix" && firstMix || (randomL === 1 ? hun : eng));

      const secondMix = wordMix && (wordMix === "eng" ? eng : hun)
      const secondRandomWord =
        (first === "ukr" && eng) ||
        (first === "eng" && hun) ||
        (first === "mix" && secondMix || (randomL === 1 ? eng : hun));

      if (!wordMix) {
        words[randomNum].mix = randomL === 1 ? "ukr" : "eng"
      } else {

        words[randomNum].mix = wordMix === "eng" ? "ukr" : "eng"
      }

      setRandomWord([
        firstRandomWord,
        secondRandomWord,
        id,
        hun,
        eng,
        pronounce,
        sentence,
        isKnow,
      ]);
      setIsKnow(isKnow);
      setIsNext(false);
    } else {
      setIsNext(true);
    }
  };

  const imageSrc = "https://topszotar.hu/inc/image/entry/EN/";

  const handleImage = () => {
    setIsImage((perv) => !perv);
  };

  const handleList = () => {
    setIsList((perv) => !perv);
  };

  const handleFirst = (e) => {
    setFirst(e.target.value);
  };

  const handleIsActive = async (e) => {
    setIsActive(e.target.value)
    const words = await getWords(selected, e.target.value);
    setWords(words);
    selectedList = []
  }
  const handleCheckbox = () => {
    if (lastWorkCheck) {
      dispatch(disableLastWork());
    } else {
      dispatch(addLastWork(selected));
    }
    setLastWorkCheck(prev => !prev)
  }

  return (
    <div className="mt-1 text-lg">
      <div className="fixed bg-black h-28 flex items-center">
        <div className="absolute top-0 left-0 w-32">
          {max} / {counter} - {isActive}
        </div>
        <div className="absolute top-10 left-4 w-4 items-center" onClick={handleList}>
          {isList ? <CloseIcon /> : <ListIcon />}
        </div>
        <div className="absolute top-7 left-16">
          <input
            type="checkbox"
            checked={lastWorkCheck}
            onChange={() => handleCheckbox()}
          />
        </div>
        <div className="absolute top-11 left-36 w-8" onClick={handleImage}>
          {isImage ? <PhotoImageIconBlack /> : <PhotoImageIconWhite />}
        </div>

        <div
          className="absolute top-10 right-24 w-16 bg-black"
          onChange={handleFirst}
        >
          <select
            defaultValue={first}
            className="border rounded-lg bg-black text-white p-1 w-16"
          >
            <option value="ukr">ukr</option>
            <option value="eng">eng</option>
            <option value="mix">mix</option>
          </select>
        </div>
        <div className="absolute top-10 right-4 w-16 rounded-xl">
          <select
            defaultValue={isActive}
            className="border rounded-lg bg-black text-white p-1"
            onChange={(e) => handleIsActive(e)}
          >
            <option value="active">active</option>
            <option value="inActive">inActive</option>
            <option value="both">both</option>
          </select>
        </div>
        <div className="h-20 border-b border-slate-500"></div>
      </div>
        <div className="h-20"></div>
        {start && !isList ? (
        <div>
          <div className="h-6"></div>

          <div className="flex mt-4 mx-auto w-10/12 min-h-full rounded-md border-solid border-2 border-cyan-900 px-6 py-4">
            <div>
              <p className="text-amber-500 font-bold">Your word:</p>
              <p>{randomWord[0]}</p>
            </div>
            <div>
              <p className="text-red-500">select</p>
              <input type="checkbox" checked={isKnow} onChange={handleIsKnow} />
            </div>
          </div>
          {!isNext ? (
            <div className="flex justify-center">
              {isImage && (
                <img
                  src={
                    imageSrc +
                    randomWord[4].substring(0, 1) +
                    "/" +
                    randomWord[4] +
                    "_jelentese.jpg"
                  }
                  alt="No image"
                  className={`h-auto w-80 mt-6`}
                />
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        ""
      )}
      {start && isNext && !isList ? (
        <div className="mt-4 mx-auto w-10/12 min-h-full overflow-y-scroll rounded-md border-solid border-2 border-red-900 px-6 py-4">
          <p className="text-red-500 mt-4">Solution:</p>
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-2 grid-rows-1 gap-2">
              <p className="text-lg text-red-400">Translation: </p>
              <p className="text-lg ">{randomWord[1]}</p>
            </div>
            <div className="border border-solid border-gray0.6 mt-2"></div>
            <div className="flex">
              <p className="text-lg text-red-400">Pronounce: </p>
              <p className="text-lg ">{randomWord[5]}</p>
            </div>
            <div className="border border-solid border-gray0.6"></div>
            <div className="mt-2">
              <p className="text-red-400 text-lg">Example sentence:</p>
              <p
                className={
                  randomWord[6]?.length > 45 ? "text-0.5rem" : "text-lg"
                }
              >
                {randomWord[6]}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
      {!isList && <div className="h-40"></div>}
      {!isList && (
        <div className="bg-black h-32 fixed bottom-0 z-10">
          <div className="mt-2 mb-2 border border-solid border-gray0.6"></div>
          <button onClick={renderWord}>
            <div className="basicShadow text-rose-400 fixed bottom-12 left-0 right-0 z-10 bg-black">
              {isNext ? "Get word" : "Translation"}
            </div>
          </button>
          <div className="fixed bottom-5 right-0 text-sm">
            Selected themes: {selected.join(", ")}
          </div>
        </div>
      )}
      {isList && (
        <div>
          <div>
            {words.map((word) => (
              <Word key={word.id} word={word} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Start;
