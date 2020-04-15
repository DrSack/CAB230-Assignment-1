import React from "react";
import {InputStuff} from './Contact-Component/Input';
import {UploadFile} from './Contact-Component/Upload';

export const Contact = function() {
  return (
      <div className="App">
        <h1>SEND</h1>
        <p> Yo mum a hoe</p>
        <InputStuff/>
        <UploadFile/>
    </div>
  );
}