import styles from './TestLayout.module.scss';
import React from 'react';
import InputBoard from '../InputBoard/InputBoard';
import ResultBoard from '../ResultBoard/ResultBoard';

interface TestLayoutState{
    htmlFile: File;
    htmlUrl: URL;
    docUrl: URL;
}

export default class TestLayout extends React.Component<{}, TestLayoutState> {
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
    onHtmlFileChange(file: File) {
        this.setState({ htmlFile: file,
            htmlUrl: new URL(URL.createObjectURL(file))
        });
    }
    onDocUrlChange(uri: URL) {
        this.setState({ docUrl: uri });
    }

    render() {

        return (
            <div className={styles.container}>
                <div className={styles.fixed}>
                    <div className={styles.testInfo}>
                        <InputBoard file={this.state.htmlFile}
                            docUrl={this.state.docUrl}
                            onDocUrlChange={this.onDocUrlChange}
                            onHtmlFileChange={this.onHtmlFileChange}></InputBoard>
                        <ResultBoard docUrl={this.state.docUrl} htmlOrigin={this.state.htmlUrl?.origin}/>
                    </div>
                </div>
                <div className={styles.stretched}>
                    <iframe className={styles.htmlViewer} id="pageViewer" src={this.state.htmlUrl?.toString()}></iframe>
                </div>
            </div>
        );
    }
}