import React from 'react';
import styles from './PostDetail.module.css';
import { Link } from 'react-router-dom';

export default function PostDetail({post}) {
    return (
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={styles.createdby}>{post.createdBy}</p>
            <div className={styles.tags}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                ))}
            </div>
            <Link className="btn btn-outline" to={`/posts/${post.id}`}>Ler</Link>
        </div>
    )
}
