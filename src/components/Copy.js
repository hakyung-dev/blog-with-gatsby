import React, { useState, createRef } from 'react';

const Copy = (props) => {
  const { imgSrc, text, name } = props;
  const [copyMessage, setCopyMessage] = useState(name);

  const copyRef = createRef();

  const copyToClipboard = (e) => {
    const copyArea = document.createElement('textarea');
    copyArea.value = text;
    copyRef.current.appendChild(copyArea);
    copyRef.current.firstChild.select();
    document.execCommand('copy');
    setCopyMessage('복사완료');
    copyRef.current.removeChild(copyArea);
  };

  const handleMouseLeave = () => {
    setCopyMessage(name);
  };

  return (
    <div className="copy">
      <button
        className="copy-visible icon-wrap"
        message-data={copyMessage}
        onClick={copyToClipboard}
        onMouseLeave={handleMouseLeave}
      >
        <img className="icon" src={imgSrc} alt="" />
      </button>
      <div className="copy-invisible" ref={copyRef} />
    </div>
  );
};

export default Copy;
