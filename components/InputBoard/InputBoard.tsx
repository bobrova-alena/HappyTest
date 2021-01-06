import React from 'react';
import Form from 'react-bootstrap/Form';
import { getCookie } from '../../src/utils';
import styles from './InputBoard.module.scss';

type TestLayoutProps = {
    file: File,
    docUrl: URL,
    onHtmlFileChange(file: File),
    onDocUrlChange(uri: URL),
}
type TestLayoutState = {
    selectSheetStr: string,
}

export default class InputBoard extends React.Component<TestLayoutProps, TestLayoutState> {
    storageKeys = {
        sheet: 'sheet'
    };
    selectSheetHolderStr = 'Set a google spreadsheet url';

    constructor(props:TestLayoutProps) {
        super(props);
        this.handleDocUrlChange = this.handleDocUrlChange.bind(this);
        this.handleHtmlFileChange = this.handleHtmlFileChange.bind(this);
        this.state = {
            selectSheetStr: this.selectSheetHolderStr,
        };
    }
    handleHtmlFileChange(e) {
        this.props.onHtmlFileChange(e.target.files[0]);
    }
    handleDocUrlChange(e) {
        //todo validate a url
        let uri = e.target.value;
        let date = (new Date(Date.now() + 86400e3*7)).toUTCString();
        globalThis.document.cookie = encodeURIComponent(this.storageKeys.sheet) + '=' + encodeURIComponent(uri) + '; expires=' + date;
        this.setState({
            selectSheetStr: uri
        });
        if(uri) {
            this.props.onDocUrlChange(new URL(uri));
        }
    }
    componentDidMount() {
        this.setState({
            selectSheetStr: getCookie(this.storageKeys.sheet)
        });
    }
    render() {
        let selectFileStr = 'Select a html file';

        return (
            <Form>
                <Form.Group>
                    <Form.File id="file" className={styles.customInput} label={this.props.file? this.props.file.name: selectFileStr} custom onChange={this.handleHtmlFileChange}/>
                    <Form.Control type='url' placeholder={this.selectSheetHolderStr} value={this.state.selectSheetStr} onChange={this.handleDocUrlChange} />
                </Form.Group>
            </Form>
        );
    }
}

