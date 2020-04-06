import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {title:'', date:'', content:'', img: '', scrollPercent: 0}
    }

    handleScroll=(e)=>{
        var h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        var percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        console.log(percent)
        this.setState({scrollPercent: percent})
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll)
        const { tag } = this.props.match.params
        fetch(`/blog/posts/${tag}/index.html`)
        .then((content) => {
            return content.text();
        })
        .then((content)=>{
            this.setState({content: content})
        })
        fetch(`/blog/posts.json`)
        .then((content) => {
            return content.json();
        })
        .then((posts)=>{
            for(var x of posts){
                if(x['tag']==tag){
                    this.setState({title: x['title'], date: x['date'], img: x['img']});
                    break;
                }
            }
        })
    }

	share = ()=>{
		if(navigator.share){
			navigator.share({
				title: this.state.title,
				url: window.location
			})
		}
	}

    render(){
        return (
            <div className={styles['post-container']}>
                <div className={styles['progress-bar']} style={{width: this.state.scrollPercent+"%"}}></div>
                <span className={styles["back"]}><Link to="/">&#8592;</Link></span>
                <div className={styles['post']}>
                    <img src={this.state.img}></img>
                    <div className={styles['content']}>
                        <div className={styles['header']}>
                            <h1>{this.state.title}</h1>
                            <div className={styles['social']}>
                                <a target="_blank" className="twitter-share-button" href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.state.title+"\n"+ window.location)}><i className="fab fa-twitter"></i></a>
                                <a target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location + "&t=" + this.state.title}><i className="fab fa-facebook-square"></i></a>
                                { (navigator.share) && (<a onClick={this.share} href="javascript:void(0)" style={{fontSize: "0.9em", display: "block"}}><i className="fa fa-share-alt"></i></a>) }
                            </div>
                        </div>
                        <span>{this.state.date}</span>
                        <br/><br/>
                        <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                        <br/>
                        <div className={styles['footer']}>
                            <div className={styles['name']}>
                                George Thomas Shanti<br/>
                                <span className={styles['designation']}>Now a blogger</span>
                            </div>
                            <img src="/blog/george.jpg"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Post;