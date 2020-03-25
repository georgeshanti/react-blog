import React from 'react';

import styles from './styles.module.scss';

import PostCard from 'components/post-card';

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            quote: {quote: "Ok then", author: "George"}
        }
    }

    componentDidMount(){
        fetch('/blog/quotes.json')
        .then((content)=>{
            return content.json();
        })
        .then((quotes)=>{
            this.setState({
                quote: quotes[Math.floor(Math.random() * quotes.length)]
            })
        })
        fetch('/blog/posts.json')
        .then((content)=>{
            return content.json();
        })
        .then((posts)=>{
            this.setState({
                posts: posts
            })
        })
    }

    render(){
        var posts = this.state.posts.map((x,i)=>(<PostCard key={i} title={x['title']} date={x['date']} img={x['img']} tag={x['tag']}/>))
        return (
            <div className={styles['index']}>
                <h1>George Thomas Shanti - Blog</h1>
                <i><span className={styles['quote']}><q>{this.state.quote.quote}</q> &mdash; {this.state.quote.author}</span></i>
                <div className={styles['list'] + " col-11"}>
                    {posts}
                </div>
            </div>
        )
    }
}

export default Index;