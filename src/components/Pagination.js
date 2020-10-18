import React, { Component } from 'react';

//components
import Card from './Gif-Card';
import Loading from './Loading';

//images
import defaultAvatar from '../assets/logo.png';

class Pagination extends Component {
    state = {
        starting: 0,
        ending: 10,
        page: 1,
        totalPage: 1
    }
    
    _incrementDecrementPages = (instruction) => {
        
        if ( instruction === '+') {
            if (this.state.ending > this.props.posts.length) {
                return false
            } else {
                this.setState({
                    starting:this.state.starting + 10,
                    ending:this.state.ending + 10,
                    page: this.state.page  +  1
                });
            }
        }
        else if ( instruction === '-') {
            if (this.state.starting === 0) {
                return false
            } else {
                this.setState({
                    starting:this.state.starting - 10,
                    ending:this.state.ending - 10,
                    page: this.state.page  -  1
                });
            }
        }
    }

    render() {
        const pages = Math.ceil(this.props.posts.length/10);
        let displayList = ''
        if(this.props.loading) {
            displayList = <Loading/>
        } else {
            if (this.props.posts.length >= 0) {
                displayList = this.props.posts.slice(this.state.starting,this.state.ending).map(post => {
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
                {displayList}
                {this.props.loading ? null :
                <div>
                    <div className='pagination'>
                        <button onClick={() => this.props.pagePlus ? this.props.pagePlus('+') : this._incrementDecrementPages('-')}>-</button>
                        <p>{this.state.page}</p>
                        <button onClick={() => this._incrementDecrementPages('+')}>+</button>
                    </div>
                    <p>Total Pages: <strong>{pages}</strong></p>
                </div>}
            </div>
        );
    }
}

export default Pagination;
