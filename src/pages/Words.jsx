import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getWords } from "../engine/firebaseUtils";

function Words() {
  const { themeName } = useParams();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getWordsList = async () => {
      const words = await getWords([themeName]);
      setWords(words);
      setLoading(true);
    };
    getWordsList();
  }, []);

  if (!loading) {
    return "Loading...";
  }
  return (
    <div className="mt-10">
      <Link to={`/rename-theme/${themeName}`}>
        <div className="bg-black top-0 left-0 w-full h-26 fixed">
          <h1 className="h-24 text-3xl text-slate-400 flex justify-center items-center">
            {themeName} - {words.length}
          </h1>
          <div className="border border-gray-400"></div>
        </div>
      </Link>
      {loading ? (
        <div>
          <div className="mt-4 mb-36 flex flex-col gap-5">
            {words.map((word) => {
              return (
                <Link to={`/edit-word/${word.id}`} key={word.id}>
                  <div className="basicShadow">{word.eng}</div>
                </Link>
              );
            })}
          </div>
          <div className="bg-black h-28 fixed bottom-0 z-10">
            <div className="mt-2 mb-2 border border-solid border-gray0.6"></div>
            <Link
              to={`/create-word/${themeName}`}
              className={`w-60 mx-auto p-1.5 rounded-md`}
            >
              <div className="basicShadow text-rose-400 fixed bottom-5 left-0 right-0 z-10 bg-black">
                New word
              </div>
            </Link>
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default Words;
