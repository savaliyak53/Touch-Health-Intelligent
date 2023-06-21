import React from 'react'
import ErrorModal from '../Modal/ErrorModal';

class ErrorBoundary extends React.Component<any> {
      state = {
        hasError: false,
        error: null,
        errorType: '',
        open: true
      };
  
    static getDerivedStateFromError(error: any) {
      return { hasError: true, error };
    }
  
    componentDidCatch(error: any, errorInfo: any) {
      // Custom error handling logic
      if(error.code >= 400 && error.code < 500) {
        this.setState({
            ...this.state,
            errorType: 'type1'
        })
      } else if (error.code >= 500) {
        this.setState({
            ...this.state,
            errorType: 'type2'
        })        
      }
      console.error('Error caught by error boundary:', error);
      console.error('Error info:', errorInfo);
      // You can also log the error or send it to an error tracking service
    }

    componentDidUpdate(previousProps: any, previousState: any) {
      if (previousState.open!==this.state.open)
          this.setState({...this.state, hasError: false});
  }

    handleCancel = () => {
      this.setState({...this.state, open: false})
    }
  
    render() {
      if (this.state.hasError) {
        // Render different error messages based on error type
        if (this.state.errorType === 'type1') {
          return (
            <ErrorModal 
                open={this.state.open}
                title='Error'
                errorType='type1'
                error={this.state.error}
                handleCancel={this.handleCancel}
            />
          );
        } else if (this.state.errorType === 'type2') {
          return (
            <ErrorModal 
                open={this.state.open}
                title='Error'
                errorType='type2'
                handleCancel={this.handleCancel}
            />
          );
        } else {
          // Default error message if error type is not recognized
          return (
            <ErrorModal 
                open={this.state.open}
                title='Error'
                errorType='default'
                handleCancel={this.handleCancel}
            />
          );
        }
      }
  
      // Render the child components if there is no error
      return this.props.children;
    }
  }

  export default ErrorBoundary