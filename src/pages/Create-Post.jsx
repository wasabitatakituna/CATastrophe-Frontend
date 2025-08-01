import { useEffect, useState } from 'react';

function CreatePost({ token }) {
    const [user, setUser] = useState(null);
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);
        
    useEffect(() => {
        fetch('http://localhost:4000/auth/profile', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => setUser(data));
    }, [token]);

    if (!user) return <p>Loading...</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const newPost = {
            text: text,
            user: user.username
        };
        formData.append("post", JSON.stringify(newPost));
        formData.append("file", img);

        const res = await fetch("http://localhost:4000/upload", {
            method: 'POST',
            credentials: 'include',
            body: formData
        });

        const data = await res.json();
        
        if (res.ok) {
            setText('');
            alert("Post Submitted Successfully.");
        }
        else {
            alert(data.error);
        }
    }

    return (
        <div id="create">
            <div className="ear1">
                <div className="earHole"/>
            </div>
            <div className="ear2">
                <div className="earHole"/>
            </div>
            <form id="createPost" encType="multipart/form-data" onSubmit={handleSubmit}>
                <label for="uploadImage">Upload an Image for your Post:</label>
                <input
                    id="uploadImage"
                    type="file"
                    name="upload-image"
                    onChange={(e) => setImg(e.target.files[0])}
                    required
                />
                <br/><br/>
                <label for="postText">Write a Caption for your Post:</label>
                <input
                    id="postText"
                    placeholder="Post Text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <br/><br/><br/>
                <button type="submit" id="sub">Submit</button>
            </form>
        </div>
    );
}

export default CreatePost;