import { useEffect, useState } from 'react';
import SinglePost from './SinglePost';
import Error from './Error'

const url = import.meta.env.VITE_API_URL

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${url}/auth/posts`, {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts(data);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    
    return (
        <>
            {posts.length===0 ? <Error /> :
                posts.map((post) => (
                    <SinglePost key={post.id} post={post} />
                ))
            }
        </>
    );
}