import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createWord } from "../engine/firebaseUtils";

function NewWord() {
  const { themeName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
      isKnow: false,
      theme: themeName,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.eng &&
      formData.pronounce &&
      formData.hun &&
      formData.sentence
    ) {
      createWord(formData);
      navigate(`/words/${themeName}`);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-32 flex flex-col justify-center gap-4"
      >
        <input
          className="bg-black smallShadow"
          id="eng"
          type="text"
          placeholder="eng"
          onChange={handleChange}
        />
        <input
          className="bg-black smallShadow"
          id="pronounce"
          type="text"
          placeholder="pronounce"
          onChange={handleChange}
        />
        <input
          className="bg-black smallShadow"
          id="hun"
          type="text"
          placeholder="ukr"
          onChange={handleChange}
        />
        <input
          className="bg-black smallShadow"
          id="sentence"
          type="text"
          placeholder="sentence"
          onChange={handleChange}
        />
        <button className="basicShadow font-bold fixed right-0 left-0 bottom-8 z-10 bg-black">
          Create
        </button>
      </form>
      {error ? <div className="text-red-500">All field is required!</div> : ""}
    </div>
  );
}

export default NewWord;
