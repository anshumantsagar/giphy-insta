import React, { Component } from 'react';

//components
import Pagination from './Pagination';

class Trending extends Component {
    state = {
        trendingList : [],
        loading: false
    }

    componentDidMount() {
        this._fetchMyData();
    }
    
    _fetchMyData = () => {
        this.setState({loading:true})
        return fetch('https://api.giphy.com/v1/gifs/trending?api_key=erHTMVKCvGzTkCx6yo6h43UmT4W9Vx0W&limit=39&rating=g')
                .then(response => response.json())
                .then(data => {
                    this.setState({trendingList: data.data}, () => {console.log(this.state.trendingList)});
                    this.setState({loading:false});
                })
                .catch(error => console.log(error));
    }

    render() {        
        
        return (
            <div>
                <Pagination loading={this.state.loading} posts={this.state.trendingList}/>
            </div>
        );
    }
}

export default Trending;