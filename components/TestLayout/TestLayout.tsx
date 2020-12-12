import styles from './TestLayout.module.scss';
import Button from 'react-bootstrap/Button'
import React from 'react';

export default class TestLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {url: null};
    }
    componentDidMount() {
        globalThis.addEventListener('message', (event) => this.onMessage(event));
    }
    onMessage(event){
        if(event.origin === this.state.url?.origin)
            console.log(`Links: ${event.data}`);
    }
    render(){
        let checkLinks = () => {
            if(this.state.url)
                globalThis.pageViewer.contentWindow.postMessage('links', this.state.url);
        }
        
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
                    <iframe className={styles.htmlViewer} id="pageViewer" src={this.state.url}></iframe>
                </div>
            </div>
        )
    }
}