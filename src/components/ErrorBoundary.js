import React from 'react'

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  width: "80%",

}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error);
    console.log(errorInfo)
  }

  

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1 style={style}>Something went wrong, please refresh the page</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary