import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

class PostCard extends React.Component{
    render(){
        return (
            <Link to={"/post/" + this.props.tag}>
                <div className={styles['post-card'] + " " + ["col-xl-3", "col-lg-4", "col-md-6", 'col-sm-6', 'col-12'].join(" ")}>
                    <div className={styles['post']}>
                        <img src={this.props.img}></img>
                        {/* <div style={{width: "100%", height: "100px"}}></div> */}
                        <div className={styles['description']}>
                            <h4>{this.props.title}</h4>
                            <span>{this.props.date}</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default PostCard;