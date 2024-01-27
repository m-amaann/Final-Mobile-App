import React from "react";
import { Toaster } from "react-hot-toast";
import "../CSS/custom.css";

const Popup = () => {
  return (
    <>      
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: 'custom-toast', 
        }}
      />
    </>
  );
};

export default Popup;