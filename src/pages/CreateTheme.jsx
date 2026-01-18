import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "../engine/firebaseUtils.js";

function CreateTheme() {
  const navigate = useNavigate();
  const [themeName, setThemeName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (themeName) {
      createTheme(themeName);
      setError(false);
      navigate("/edit-themes");
    } else {
      setError(true);
    }
  };
  console.log(error);
  return (
    <div>
      <div className="mt-44">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            className="bg-black basicShadow"
            onChange={(e) => setThemeName(e.target.value)}
          />
          <button className="basicShadow fixed bottom-10 right-0 left-0 z-10 bg-black">
            Create
          </button>
        </form>
      </div>
      {error ? <div className="text-red-500">Name field is required!</div> : ""}
    </div>
  );
}

export default CreateTheme;
