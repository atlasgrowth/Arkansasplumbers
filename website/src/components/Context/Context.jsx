import React from 'react';
import './Context.css';

const Context = () => {
  return (
    <section className="context-section" id="context">
      <div className="context-container">
        <h2 className="context-title">Context Section</h2>
        <p className="context-description">
          This is the context section. Here you can provide background, data insights, or additional content
          that frames the overall experience. On desktop you might see model "03-mini-high" details, and on mobile "04" – 
          this ensures the correct context is provided for each device.
        </p>
      </div>
    </section>
  );
};

export default Context;
