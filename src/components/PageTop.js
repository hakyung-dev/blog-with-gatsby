import React from 'react';

const PageTop = (props) => {
  const { title, bg } = props;

  return (
    <section className={`bg-grey`}>
      <div className={`bg-${bg} page-top`}>
        <h1 className={`page-top-title`}>{title}</h1>
      </div>
    </section>
  );
};

export default PageTop;
