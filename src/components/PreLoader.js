
import React from "react"
import { usePromiseTracker } from "react-promise-tracker";

const PreLoader = () => {

  const { promiseInProgress } = usePromiseTracker(); // will return t or f 

  return (
    promiseInProgress && 
    <div>
    <h1>hol on wait a min </h1>
    {/*  I have no idea how to use scss */}
    {/* https://codepen.io/kevinjannis/pen/KwJvpa */}
    <section class="wrapper">
      <div class="spinner">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </section>

    <section class="wrapper dark">
      <div class="spinner">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </section>
    </div>


  );
}

export default PreLoader


