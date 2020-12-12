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
        let loadHTML = (event)=> {
            let url = new URL(URL.createObjectURL(event.target.files[0]));
            this.setState({url: url});
            globalThis.pageViewer.src = url;
        }
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
                        <input type="file" id="fileInput" className={styles.fileSelector} onChange={(e) => loadHTML(e)}></input>
                        <Button variant="outline-success" onClick={checkLinks} >{checkStr}</Button>{' '}
                        <div></div>
                    </div>
                </div>
                <div className={styles.stretched}>
                    <iframe className={styles.htmlViewer} id="pageViewer"></iframe>
                </div>
            </div>
        )
    }
}