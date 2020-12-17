import styles from './TestLayout.module.scss';
import Button from 'react-bootstrap/Button'
import React from 'react';
import InputBoard from '../InputBoard/InputBoard';

interface TestLayoutState{
    htmlFile: File,
    htmlUrl: URL,
    docUrl: URL
}

export default class TestLayout extends React.Component<{},TestLayoutState> {
    constructor(props) {
        super(props);
        this.onHtmlFileChange = this.onHtmlFileChange.bind(this);
        this.onDocUrlChange = this.onDocUrlChange.bind(this);
        this.state = {
            htmlFile: null,
            htmlUrl: null,
            docUrl: null
        };
    }
    componentDidMount() {
        globalThis.addEventListener('message', (event) => this.onMessage(event));
    }
    onMessage(event){
        if(event.origin === this.state.htmlUrl?.origin) {
            console.log(`Links: ${event.data}`);
        }
    }
    onHtmlFileChange(file: File){
        this.setState({htmlFile: file,
                    htmlUrl: new URL(URL.createObjectURL(file))
        });
    }
    onDocUrlChange(uri: URL){
        this.setState({docUrl:uri});
    }

    render(){
        let requestLinks = () => {
            if(this.state.htmlFile)
                globalThis.pageViewer.contentWindow.postMessage('links', this.state.htmlFile);
        };
        
        let checkStr='Check links';

        return (
            <div className={styles.container}>
                <div className={styles.fixed}>
                    <div className={styles.testInfo}>
                        <InputBoard file={this.state.htmlFile} 
                                    docUrl={this.state.docUrl}
                                    onDocUrlChange={this.onDocUrlChange}
                                    onHtmlFileChange={this.onHtmlFileChange}></InputBoard>
                        <Button variant="outline-success" onClick={requestLinks} >{checkStr}</Button>{' '}
                    </div>
                </div>
                <div className={styles.stretched}>
                    <iframe className={styles.htmlViewer} id="pageViewer" src={this.state.htmlUrl?.toString()}></iframe>
                </div>
            </div>
        )
    }
}