import styles from './TestLayout.module.scss';
import Button from 'react-bootstrap/Button'
import React from 'react';

interface ITestLayoutState{
    url: URL
}

export default class TestLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: null};
    }
    componentDidMount() {
        globalThis.addEventListener('message', (event) => this.onMessage(event));
    }
    onMessage(event){
        let state = this.state as ITestLayoutState;
        if(event.origin === state.url?.origin)
            console.log(`Links: ${event.data}`);
    }
    render(){
        let checkLinks = () => {
            let state = this.state as ITestLayoutState;
            if(state.url)
                globalThis.pageViewer.contentWindow.postMessage('links', state.url);
        }
        
        let state = this.state as ITestLayoutState;
        let selectFileStr = 'Select a file';
        let checkStr='Check links';

        return (
            <div className={styles.container}>
                <div className={styles.fixed}>
                    <div className={styles.testInfo}>
                        <Button variant="outline-secondary" onClick={(e)=>{globalThis.fileInput.click();}} >{selectFileStr}</Button>{' '}
                        <input type="file" id="fileInput" className={styles.fileSelector} onChange={(e) => this.setState({url: new URL(URL.createObjectURL(e.target.files[0]))})}></input>
                        <Button variant="outline-success" onClick={checkLinks} >{checkStr}</Button>{' '}
                        <div></div>
                    </div>
                </div>
                <div className={styles.stretched}>
                    <iframe className={styles.htmlViewer} id="pageViewer" src={state.url?.toString()}></iframe>
                </div>
            </div>
        )
    }
}