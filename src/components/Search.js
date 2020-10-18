import React, { Component } from 'react';

//images
import defaultAvatar from '../assets/logo.png';

//components
import Card from './Gif-Card';
import Loading from './Loading';

class Search extends Component {
    state = {
        searchParams: '',
        searchResult : [],
        loading: false,
        offset: 0,
        limit:10,
        page:1
    }

    _incrementDecrementPages = (instruction) => {
        if ( instruction === '+') {
            if (this.state.searchResult.length < 10) {
                return false;
            } else {
                this.setState({
                    offset:this.state.offset + 10,
                    page: this.state.page + 1
                });
                this._fetchSearchedData()
            }
        }
        else if ( instruction === '-') {
            if (this.state.page === 1) {
                return false
            } else {
                this.setState({
                    offset:this.state.offset - 10,
                    page: this.state.page  -  1
                });
                this._fetchSearchedData()
            }
        }
    }

    _fetchSearchedData = (value) => {
        if(value === 'search') {
            this.setState({page:1})
        }
        this.setState({loading:true});
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=erHTMVKCvGzTkCx6yo6h43UmT4W9Vx0W&q=${this.state.searchParams}&limit=${this.state.limit}&offset=${this.state.offset}&rating=g&lang=en`)
            .then(response => response.json())
            .then(data => {
                this.setState({searchResult:data.data}, () => console.log(this.state.searchResult));
                this.setState({loading:false})
            })
            .catch(error => console.log(error));
    }



    render () {
        let displayList = ''
        if(this.state.loading) {
            displayList = <Loading/>
        } else {
            if (this.state.searchResult.length >= 0) {
                displayList = this.state.searchResult.map(post => {
                    return <Card 
                        key={post.id} 
                        title={post.title} 
                        time={post.import_datetime} 
                        avatar={post.user ? post.user.avatar_url : defaultAvatar } 
                        username={post.username ? post.username : 'Anonymous'} 
                        gif={post.images.original.url}/>
                });
            } 
        }
                
        return (
            <div>
                <input 
                    className='searchInput' 
                    placeholder='Enter some text to search' 
                    onChange={(event) => {this.setState({searchParams:event.target.value})}}
                    value={this.state.searchParams}/>
                <button className='searchButton' onClick={() => this._fetchSearchedData('search')}>Search</button>
                {displayList}
                {
                this.state.searchResult.length ?
                <div className='pagination'>
                    <button onClick={() => this._incrementDecrementPages('-')}>-</button>
                    <p>{this.state.page}</p>
                    <button onClick={() => this._incrementDecrementPages('+')}>+</button>
                </div>
                :null    
                }
            </div>
        );
    }
}

export default Search;