import React from 'react';
import { Redirect } from 'react-router-dom';
// import { uploadFileMultiPart } from '../http/http-service';

//components
import Preview from './Preview';
import Loading from './Loading';

class Upload extends React.Component {
    state = {
        imgSrc:'',
        imageId: '',
        redirect: false,
        loading:false
    }

    _setUploadState_callApi = (event) => {
        this.setState({imgSrc: event.target.files[0]},
            () => console.log(this.state.imgsrc))
        this._uploadMyGif();
    }

    _uploadMyGif = () => {
        if (this.state.imgSrc) {
            const formData = new FormData();
            formData.append('file', this.state.imgSrc);
            console.log(this.state.imgSrc)
            this.setState({loading:true})
            fetch('https://upload.giphy.com/v1/gifs?api_key=erHTMVKCvGzTkCx6yo6h43UmT4W9Vx0W',{
                    method: 'POST', 
                    body: formData
                })
                .then(response => response.json())
                .then(data => data ? this._setRedirectData(data) : null)
                .then(this.setState({redirect:true}))
                .catch(error => console.log(error));
        }
    }

    _setRedirectData = (data) => {
        this.setState({imageId:data.data.id}, () => {console.log(this.state.imageId)});
        this.setState({loading:false});
        this.setState({redirect:true});
    }

    render () {
       return (
            <div>
                <div className='uploadInput'> 
                    <input 
                        type='file' 
                        accept='image/gif' 
                        onChange={(event) => this._setUploadState_callApi(event)}/>
                </div>
                {this.state.loading ? <Loading/> : null}
                {this.state.imgSrc && !this.state.loading ? <Preview upload ={this._uploadMyGif} gif={URL.createObjectURL(this.state.imgSrc)}/> : null}
                {this.state.redirect && !this.state.loading ? <Redirect to={`/preview/${this.state.imageId}`}/> : null}
            </div>
        ); 
    }
}

export default Upload;