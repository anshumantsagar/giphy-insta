import React, { Component } from 'react';

//images
import defaultAvatar from '../assets/logo.png'

//component
import Card from './Gif-Card';

class UploadedPreview extends Component {
    state = {
        gifData: {},
        send: false,
        error: false,
        errorData:''
    }
    componentDidMount () {
        console.log(this.props.match.params.id);
        fetch(`https://api.giphy.com/v1/gifs/${this.props.match.params.id}?api_key=erHTMVKCvGzTkCx6yo6h43UmT4W9Vx0W`)
        .then(response => response.json())
        .then(data => this._setGifData(data.data))
        .catch(error => this.setState({error:true,errorData:String(error)}, () => console.log(error)))
    }

    _setGifData = (data) => {
            this.setState({gifData:data}, () => console.log(this.state.gifData, "new fun"));
            this.setState({send:true});    
    }

    render () {
        return (
            <div>
                {this.state.send && this.state.gifData.images ?
                <Card 
                    title={this.state.gifData.title ? this.state.gifData.title : 'notitle'} 
                    time={this.state.gifData.import_datetime} 
                    avatar={this.state.gifData.user ? this.state.gifData.user.avatar_url : defaultAvatar } 
                    username={this.state.gifData.username ? this.state.gifData.username : 'Anonymous'} 
                    gif={this.state.gifData.images.original.url}    
                    />
                :  <p style={{color:'red'}}>{'invalid id'}</p> }
            </div>
        );
    }
}
export default UploadedPreview;
