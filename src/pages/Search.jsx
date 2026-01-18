import { useState } from "react";
import { getWordByEng } from "../engine/firebaseUtils";

export default function Search() {
  const [searchWord, setSearchWord] = useState("");
  const [word, setWord] = useState([]);

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    let data = await getWordByEng(searchWord);
    if (data) {
      setWord(data);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        {word &&
          word.length > 0 &&
          word.map((w) => (
            <div
              key={w.id}
              className="flex mt-10 justify-center mx-auto w-10/12 rounded-md border-solid border-2 border-cyan-900 p-2 text-left"
            >
              <div className="pr-5 w-44">
                <p>ukr:</p>
                <p>eng:</p>
                <p>pronounce:</p>
                <p>Sentence:</p>
              </div>
              <div>
                <p>{w.hun}</p>
                <p>{w.eng}</p>
                <p>{w.pronounce}</p>
                <p>{w.sentence}</p>
              </div>
            </div>
          ))}
      </div>
      {error ? <div className="text-red-500">Nothing found</div> : ""}
      <div className="h-60"></div>
      <form
      className="fixed space-y-4 bottom-0 pb-10 pt-5 right-0 left-0 z-10 bg-black"
      onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className="bg-black basicShadow"
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button className="basicShadow">
          Search
        </button>
      </form>
    </div>
  );
}
