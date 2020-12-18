import React from 'react';
import Button from 'react-bootstrap/Button'

type ResultBoardProps = {
    docUrl: URL,
    htmlOrigin?: string
}

export default class ResultBoard extends React.Component<ResultBoardProps,{}> {
    constructor(props: ResultBoardProps) {
        super(props);
        this.handleCheckButtonClick = this.handleCheckButtonClick.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }
    componentDidMount() {
        globalThis.addEventListener('message', (event) => this.onMessage(event));
    }
    onMessage(event){
        if(event.origin !== this.props.htmlOrigin)
            return;

        console.log(`Links: ${event.data}`);
    }

    handleCheckButtonClick() {
        globalThis.pageViewer.contentWindow.postMessage('links', this.props.htmlOrigin);
    }

    render(){
        let checkStr='Check links';

        return (
            <Button variant="outline-success"
                    onClick={this.handleCheckButtonClick}
                    disabled={!this.props.htmlOrigin || !this.props.docUrl}>{checkStr}</Button>
        );
    }
}