import { useEffect, useState } from 'react';
import cat1 from '../assets/cat1.png';
import cat2 from '../assets/cat2.png';

function Profile({ token }) {
    const [user, setUser] = useState(null);
    const [update, setUpdate] = useState(false);
    const [newUsername, setNewUsername] = useState('')
    
    useEffect(() => {
        fetch('http://localhost:4000/auth/profile', {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => setUser(data));
    }, [token]);

    // update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/auth/update", {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newUsername })
        });

        const data = await res.json();
        
        if (res.ok) {
            alert("Username Updated Successfully.");
        }
        else {
            alert(data.error);
        }
    }
    
    // delete
    const handleDelete = async () => {
        const res = await fetch('http://localhost:4000/auth/delete', {
            method: 'DELETE',
            credentials: 'include'
        })

        const data = await res.json();

        if (res.ok) {
            setUser(null);
            alert("Account Deleted Successfully.");
        }
        else {
            alert(data.error);
            alert("Account Deletion Unsuccessful.");
        }
    }

    if (!user) return <p>Loading profile...</p>;

    return (
        <div>
            <h3 className="head">{user.username}'s Profile:</h3>
            <div>
                <p>Username: {user.username}</p>
                <p>Posts:</p>
                <p id="profileText">I was unable to get it to filter properly,
                    so please enjoy these two image of a cat in my backyard instead:</p>
                <img className="cat" alt="cat on railing" src={cat1} />
                <img className="cat" alt="same cat on different railing" src={cat2} />

                {/* update forum */}
                {!update ? (
                    <></>
                ) : (
                    <div id="updateForm">
                        <div className="ear1">
                            <div className="earHole"/>
                        </div>
                        <div className="ear2">
                            <div className="earHole"/>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <label for="newUser">New Username:</label>
                            <input
                                id="newUser"
                                type="text"
                                placeholder="New Username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                            <br/><br/><br/>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                )}

                {/* buttons to update or delete account */}
                <div id="modifyAcc">
                    <button onClick={() => setUpdate(true)}>Update Username</button>
                    <button onClick={handleDelete}>Delete Account</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;