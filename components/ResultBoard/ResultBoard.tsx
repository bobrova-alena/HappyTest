import React from 'react';
import Button from 'react-bootstrap/Button';
import { authorize, getLinksFromSheet } from '../../services/api-service';
import styles from './ResultBoard.module.scss';

type ResultBoardProps = {
    docUrl: URL,
    htmlOrigin?: string,
}

export default class ResultBoard extends React.Component<ResultBoardProps, {}> {
    constructor(props: ResultBoardProps) {
        super(props);
        this.handleCheckBtnClick = this.handleCheckBtnClick.bind(this);
        this.handleAuthorizeBntClick = this.handleAuthorizeBntClick.bind(this);
        this.onMessage = this.onMessage.bind(this);
    }
    componentDidMount() {
        globalThis.addEventListener('message', (event) => this.onMessage(event));
    }
    onMessage(event) {
        if(event.origin !== this.props.htmlOrigin)
            return;

        try {
            let hrefs = JSON.parse(event.data).hrefs;
            if(hrefs) {
                getLinksFromSheet()
                    .then(data => {
                        this.compareLinks(data.links.filter(value=>value&&value.indexOf('http')!=-1), hrefs);
                    });
            }
        } catch{

        }
    }

    handleCheckBtnClick() {
        globalThis.pageViewer.contentWindow.postMessage('links', this.props.htmlOrigin);
    }
    handleAuthorizeBntClick() {
        this.authorize();
    }
    authorize() {
        authorize()
            .then(data => {
                globalThis.location.href = decodeURI(data.authUrl);
            });
    }
    getLinksFromSheet() {
        getLinksFromSheet()
            .then(data => {
                alert(data.links);
            });
    }
    compareLinks(expected: Array<string>, result: Array<string>) {
        if(result.length!=expected.length)
            console.log(`Different length. Expected ${expected.length}. Result: ${result.length}`);

        let hasError=false;
        result.forEach((value, index)=>{
            if(value.trim()!=expected[index].trim()) {
                console.log(`Expected: ${expected[index].trim()}. Result: ${value.trim()}`);
                hasError=true;
            }
        });
        if(!hasError)
            console.log('Success!');
    }
    render() {
        let checkStr='Check links';
        let authorizeStr='Authorize';

        return (
            <>
                <Button variant="outline-success" className={styles.authButton}
                    onClick={this.handleAuthorizeBntClick} >{authorizeStr}</Button>
                <Button variant="outline-success"
                    onClick={this.handleCheckBtnClick}
                    disabled={!this.props.htmlOrigin || !this.props.docUrl}>{checkStr}</Button>
            </>
        );
    }
}