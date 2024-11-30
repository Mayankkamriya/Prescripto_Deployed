// PageTransition.js
import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation, Routes, Route } from 'react-router-dom';
import './PageTransition.css'; // Import the CSS file for transitions

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        classNames="fade"
        timeout={300} // Duration of the animation
        unmountOnExit
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default PageTransition;
