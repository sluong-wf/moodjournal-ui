import React, { createContext, useState, useEffect } from "react";

const FocusContext = createContext();

export const FocusProvider = ({ children }) => {
  const [focusedRow, setFocusedRow] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const rows = document.querySelectorAll('.week-row');
      let closestRowIndex = null;
      let closestDistance = Infinity;
      const middleOfViewport = window.innerHeight * 2 / 5;
      rows.forEach((row, index) => {
        const rect = row.getBoundingClientRect();
        const distanceFromTop = Math.abs(rect.top + rect.height / 2 - middleOfViewport);

        if (distanceFromTop < closestDistance) {
          closestDistance = distanceFromTop;
          closestRowIndex = index;
        }
      });

      if (closestRowIndex !== null) {
        setFocusedRow(closestRowIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();  // Trigger scroll event on mount to check for the initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FocusContext.Provider value={{ focusedRow }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = React.useContext(FocusContext);
  if (!context) {
    throw new Error("useFocus must be used within a FocusProvider");
  }
  return context;
};
