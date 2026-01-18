import PropTypes from "prop-types";
import { useState } from "react";
import { CloseEyeIcon, OpenEyeIcon } from "./icon";

function Word({word}) {
  const [isSentence, setIsSentence] = useState(false);

  const handleSentece = () => {
    setIsSentence(!isSentence);
  }
  
  return (
    <div
      key={word.id}
      className="mt-4  mx-auto w-10/12 min-h-full rounded-md border-solid border-2 border-red-900 px-6 py-4"
    >
      <div className="flex flex-col justify-center">
        <p className="text-lg ">
          {word.eng} ({word.pronounce})
        </p>
        <p className="mt-5 text-lg ">{word.hun}</p>
        {isSentence ? (
        <div className="mt-4" onClick={handleSentece}>
          <p className="text-red-400 text-lg">Example sentence:</p>
          <p className={word.sentence?.length > 45 ? "text-0.5rem" : "text-lg"}>
            {word.sentence}
          </p>
        </div>

        ) : (
          <div className="mt-4 flex gap-1 items-center justify-center" onClick={handleSentece}>
            Sentence
            <OpenEyeIcon />
          </div>
        )}
      </div>
    </div>
  );
}

Word.propTypes = {
  word: PropTypes.object,
};

export default Word;
