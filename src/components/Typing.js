import React, { useState, useEffect } from 'react';

const Typing = (props) => {
  const { pairs } = props;
  const [text, setText] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    let isWriting = true;
    let typeIndex = 0;
    let index = 0;
    let typingTimer;
    let fullText;

    const changeIndex = () => {
      if (index === pairs.length - 1) {
        index = 0;
      } else {
        index++;
      }
    };

    const writeText = () => {
      setText(fullText.substring(0, typeIndex));
      typeIndex++;
    };

    const deleteText = () => {
      setText(fullText.substring(0, typeIndex));
      typeIndex--;
    };

    const type = () => {
      fullText = pairs[index].text;
      setIcon(pairs[index].icon);

      let speed = 100;

      if (isWriting) {
        writeText();

        if (typeIndex === fullText.length + 1) {
          isWriting = false;
          speed = 2500;
        }

        typingTimer = setTimeout(type, speed);
      } else {
        deleteText();

        if (typeIndex === 0) {
          isWriting = true;
          changeIndex();
        }

        typingTimer = setTimeout(type, speed);
      }
    };

    type();

    return () => {
      clearTimeout(typingTimer);
    };
  }, [pairs]);

  return (
    <>
      <span>{`${text} ${icon}`}</span>
      <span className="curser">_</span>
    </>
  );
};

export default Typing;
