import React from 'react'

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  width: "80%",

  textTransform: "uppercase",
  letterSpacing: "0.2em",

  fontSize: "50px"
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return(
        <div>
          <div style={style}>
            <h1 style={{textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "50px"}}>Something went wrong, please refresh the page.</h1>
            <i class="medium material-icons" onClick={() => window.location.reload()} style={{color: "#3E3E3E"}}>refresh</i>
          </div>
        </div>
      )
    }

    return this.props.children; 
  }
}

export default ErrorBoundary