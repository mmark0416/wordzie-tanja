import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getWord, updateWord } from "../engine/firebaseUtils";

function EditWord() {
  const navigate = useNavigate();
  const { wordId } = useParams();
  const [error, setError] = useState(false);
  

  const [formData, setFormData] = useState({
    eng: "",
    pronounce: "",
    hun: "",
    sentence: "",
    isKnow: false,
  });

  useEffect(() => {
    const getData = async () => {
      const words = await getWord(wordId);
      setFormData(words);
    };

    getData();
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "isKnow") {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
      return;
    }
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.eng && formData.hun && formData.pronounce && formData.sentence) {
      formData.id = wordId;
      await updateWord(formData)
      navigate(`/words/${formData.theme}`)
    }else {
      setError(true)
    }
  };
  return (
    <div>
      {formData && (
      <form
        onSubmit={handleSubmit}
        className="mt-10 flex flex-col justify-center gap-4"
      >
        <input
          className="bg-black smallShadow"
          id="eng"
          type="text"
          placeholder="eng"
          value={formData.eng}
          onChange={e => handleChange(e)}
        />
        <input
          type="text"
          id="pronounce"
          value={formData.pronounce}
          placeholder="pronounce"
          className="bg-black smallShadow"
          onChange={e => handleChange(e)}
        />
        <input
          type="text"
          id="hun"
          value={formData.hun}
          className="bg-black smallShadow"
          placeholder="ukr"
          onChange={e => handleChange(e)}
        />
        <input
          type="text"
          value={formData.sentence}
          id="sentence"
          placeholder="sentence"
          className="bg-black smallShadow"
          onChange={e => handleChange(e)}
        />
        <input
          type="checkbox"
          checked={formData.isKnow}
          id="isKnow"
          className="bg-black smallShadow"
          onChange={e => handleChange(e)}
        />
        <button className="basicShadow fixed right-0 left-0 bottom-8 z-10 bg-black">
          Edit
        </button>
      </form>
      )}
      {error && <p className="text-red-500">Please fill all the fields</p>}
    </div>
  );
}

export default EditWord;
