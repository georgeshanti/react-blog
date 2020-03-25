import React from 'react';

import styles from './styles.module.scss';

import PostCard from 'components/post-card';

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
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
                <div className={styles['list'] + " col-11"}>
                    {posts}
                </div>
            </div>
        )
    }
}

export default Index;