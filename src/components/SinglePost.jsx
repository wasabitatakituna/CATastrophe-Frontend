export default function SinglePost({ post }) {
    return (
        <div className="post">
            <div className="ear1">
                <div className="earHole"/>
            </div>
            <div className="ear2">
                <div className="earHole"/>
            </div>
            <p className="username">Username: {post.user}</p>
            <img alt="image for post" src={`data:${post.contentType};base64,${post.base64}`}></img>
            <p className="caption">{post.text}</p>
        </div>
    );
}