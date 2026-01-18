import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getThemes } from "../engine/firebaseUtils.js";

function NewTheme() {
  const [themes, setThemes] = useState([]);
  useEffect(() => {
    const getThemesList = async () => {
      const themes = await getThemes();
      setThemes(themes);
    };
    getThemesList();
  }, []);
  return (
    <div className="mt-10 pb-5">
      <div className="mt-4 mb-28 flex flex-col gap-3">
        {themes.map((theme) => {
          return (
            <Link to={`/words/${theme.name}`} key={theme.id} className="basicShadow">
              {theme.name}
            </Link>
          );
        })}
      </div>
      <div className="bg-black h-28 fixed bottom-0 z-10">
        <div className="mt-2 mb-2 border border-solid border-gray0.6"></div>
        <Link
          to={"/create-theme"}
          className={`w-60 mx-auto p-1.5 rounded-md`}
        >
          <div className="basicShadow text-rose-400 fixed bottom-5 left-0 right-0 z-10 bg-black">
            Create Theme
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NewTheme;
