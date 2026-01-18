import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getThemes, updateThemeChecked } from "../engine/firebaseUtils.js";
import {
  addSelected,
  removeSelected,
  clearSelected,
} from "../state/selected/selectedSlice.js";

function Themes() {
  const dispatch = useDispatch();
  const { selected, lastWork } = useSelector((state) => state.selected);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const getThemesList = async () => {
      const themes = await getThemes();
      setThemes(themes);
    };
    getThemesList();

    dispatch(clearSelected());
  }, []);


  const handleClick = (e, name) => {
    const theme = e.target.innerText;
    if (theme === "ALL") {
      if (selected.includes("ALL")) {
        dispatch(removeSelected("ALL"));
        return;
      } else {
        dispatch(clearSelected());
        dispatch(addSelected("ALL"));
        return;
      }
    }
    if (selected.includes("ALL")) {
      dispatch(removeSelected("ALL"));
    }
    if (selected.includes(name)) {
      dispatch(removeSelected(name));
    } else {
      dispatch(addSelected(name));
    }
  };


  const handleChecked = (currentChecked, id) => {
    updateThemeChecked(id, !currentChecked);
    const newThemes = themes.map((theme) => {
      if (theme.id === id) {
        theme.checked = !currentChecked;
        return theme;
      }
      return theme;
    });
    setThemes(newThemes)
  };

  return (
    <div className="mt-8 flex flex-col  gap-6 text-xl">
      <div className="mt-4 mb-32 flex flex-col gap-6 text-xl">
        {themes &&
          themes.length > 0 &&
          themes.map((theme) => {
            const isLastWork = theme.name === lastWork[0]
            return (
              <div key={theme.id} className="flex align-middle justify-center">
                <input
                  type="checkbox"
                  checked={theme.checked}
                  onChange={() => handleChecked(theme.checked, theme.id)}
                />
                <div
                  onClick={(e) => handleClick(e, theme.name)}
                  className={`basicShadow cursor-pointer ${
                    selected.includes(theme.name) ? "coloredShadow" : ""
                  } ${ isLastWork ? "bg-slate-500" : ""}`}
                >
                  {theme.name}
                </div>
              </div>
            );
          })}
        <div
          onClick={(e) => handleClick(e)}
          className={`basicShadow cursor-pointer ${
            selected.includes("ALL") ? "coloredShadow" : ""
          }`}
        >
          ALL
        </div>
      </div>
      <div className="bg-black h-28 fixed bottom-0 z-10">
        <div className="mt-2 mb-2 border border-solid border-gray0.6"></div>
        <Link
          to={"/start"}
          className={`w-60 mx-auto p-1.5 rounded-md ${
            selected.length === 0 ? "pointer-events-none" : ""
          }`}
        >
          <div className="basicShadow text-rose-400 fixed bottom-5 left-0 right-0 z-10 bg-black">
            Start
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Themes;
