import React from 'react';

import { ErrorImageContainer,ErrorImageOverlay,ErrorImageText } from './error-boundary.styles'

class ErrorBoundary extends React.Component{
    constructor(props){
        super(props);
        this.state = { hasError: false };
    }


    static getDerivedStateFromError(error){
        //when error update state and show fallback ui
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo){
        console.log(error, errorInfo);
    }

    render(){
        if(this.state.hasError){
            //you can render any custom fallback ui
            return (
                <ErrorImageOverlay>
                        <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png'/>
                        <ErrorImageText>
                            A Dog Ate this Page
                        </ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;