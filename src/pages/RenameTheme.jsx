import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTheme, getThemeId, updateTheme } from "../engine/firebaseUtils.js";

function CreateTheme() {
  const navigate = useNavigate();
  const { themeName } = useParams();
  const [theme, setTheme] = useState(themeName);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (theme) {
      const themeId = await getThemeId(themeName);
      console.log(themeId);
      await updateTheme(themeId, theme)
      setError(false);
      navigate(`/words/${theme}`);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="mt-44">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            value={theme}
            className="bg-black basicShadow"
            onChange={(e) => setTheme(e.target.value)}
          />
          <button className="basicShadow fixed bottom-10 right-0 left-0 z-10 bg-black">
            Update
          </button>
        </form>
      </div>
      {error ? <div className="text-red-500">Name field is required!</div> : ""}
    </div>
  );
}

export default CreateTheme;
