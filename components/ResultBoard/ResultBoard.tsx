import React from 'react';
import Button from 'react-bootstrap/Button';
import { authorize, getSheetData } from '../../services/api-service';
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

        console.log(`Links: ${event.data}`);
        this.getSheetData();
    }

    handleCheckBtnClick() {
        globalThis.pageViewer.contentWindow.postMessage('links', this.props.htmlOrigin);
    }
    handleAuthorizeBntClick() {
        this.authorize();
    }
    getSheetData = () => {
        getSheetData(this.props.docUrl)
            .then(data => {
                console.log('!!!');
                console.log(data);
            });
    }
    authorize = () => {
        authorize()
            .then(data => {
                alert(data.links);
            });
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