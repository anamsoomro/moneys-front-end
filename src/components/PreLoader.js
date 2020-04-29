
import React from "react"
import { usePromiseTracker } from "react-promise-tracker";

const PreLoader = () => {

  const { promiseInProgress } = usePromiseTracker(); // will return t or f 

  return (
    promiseInProgress && 
    <h1>hol on wait a min </h1>
  );
}

export default PreLoader


