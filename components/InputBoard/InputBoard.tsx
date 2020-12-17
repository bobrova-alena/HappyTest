import React from 'react';
import Form from 'react-bootstrap/Form'
import styles from './InputBoard.module.scss'

type TestLayoutProps = {
    file: File,
    docUrl: URL,
    onHtmlFileChange(file: File),
    onDocUrlChange(uri: URL)
}

export default class InputBoard extends React.Component<TestLayoutProps, {}> {
    constructor(props:TestLayoutProps) {
        super(props);
        this.handleDocUrlChange = this.handleDocUrlChange.bind(this);
        this.handleHtmlFileChange = this.handleHtmlFileChange.bind(this);
    }
    handleHtmlFileChange(e){
        this.props.onHtmlFileChange(e.target.files[0]);
    }
    handleDocUrlChange(e){
        //todo validate a url
        this.props.onDocUrlChange(new URL(e.target.value));
    }
    render(){
        let selectFileStr = 'Select a html file';
        let selectSheetStr= 'Set a google spreadsheet url';

        return (
            <Form>
                <Form.Group>
                    <Form.File id="file" className={styles.customInput} label={this.props.file? this.props.file.name: selectFileStr} custom onChange={this.handleHtmlFileChange}/>
                    <Form.Control type='url' placeholder={selectSheetStr} onChange={this.handleDocUrlChange} />
                </Form.Group>
            </Form>
        );
    }
};

