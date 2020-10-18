import React, { Component } from 'react';

class Preview extends Component {
    render() {
        return (
            <div className='preview'>
                <p>Preview</p>
                <img src={this.props.gif} alt="Upload Preview"/>
                <button onClick={this.props.upload}>Upload</button>
            </div>
        );
    }
}

export default Preview;