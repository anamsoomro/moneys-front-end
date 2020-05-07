
import React from "react"
import { usePromiseTracker } from "react-promise-tracker";


const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",

}

const PreLoader = () => {

  const { promiseInProgress } = usePromiseTracker(); // will return t or f 

  return (
    promiseInProgress && 
    <div style={style}>
    {/* <h1>hol on wait a min </h1> */}
    <h1 className="title">LOADING </h1>



    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>


    </div>
    
  );
}

export default PreLoader


