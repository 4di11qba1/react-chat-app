import { useState } from "react";
import axios from "axios";

const SignInSignUpForm = () => {
    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [error, setError] = useState('');
    
    // Define the project ID
    const projectID = '139732b8-91ce-43d3-b2dd-5b82ab7f39b8';
    const privateKey = '7a5da4dd-3bf4-47d2-a210-200a85e19f98';
    const chatID = '230329';

    const handleSignIn = async (e) => {
        e.preventDefault();
        const authObject = {
            'Project-ID': projectID,
            'User-Name': signInUsername,
            'User-Secret': signInPassword
        }

        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });
            
            localStorage.setItem('username', signInUsername);
            localStorage.setItem('password', signInPassword);

            window.location.reload();
        } catch (error) {
            setError("Incorrect Credentials! Please check your username and password.");
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        try {
            // Call ChatEngine API to create a new user
            await axios.post(
                "https://api.chatengine.io/users/",
                {
                    "username": signUpUsername,
                    "secret": signUpPassword
                },
                {
                    'headers': {
                        'Private-Key': privateKey
                    }
                }
            ).then(async () => {
                // After successfully creating the user, add them to the default chatroom
                await axios.post(
                    `https://api.chatengine.io/chats/${chatID}/people/`,
                    {
                        'username': signUpUsername
                    },
                    {
                        'headers': {
                            'Project-ID': projectID,
                            'User-Name': 'Adil',
                            'User-Secret': '102000'
                        }
                    }
                );
    
                // Automatically log in the newly created user
                localStorage.setItem('username', signUpUsername);
                localStorage.setItem('password', signUpPassword);
    
                window.location.reload(); // Reload the page to reflect the logged-in state
            });
        } catch (error) {
            if (error.response) {
                console.log(error.response.data); // Log the error response for debugging
                setError("Failed to create user or add to chat. Please try again later.");
            } else {
                console.log(error.message); // Log the error message for debugging
                setError("An error occurred. Please try again later.");
            }
        }
    }
    
    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSignIn}>
                    <input id="signInUsername" name="signInUsername" type="text" value={signInUsername} onChange={(e) => setSignInUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input id="signInPassword" name="signInPassword" type="password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <div className="error">{error}</div>
                </form>
                <form onSubmit={handleSignUp}>
                    <input id="signUpUsername" name="signUpUsername" type="text" value={signUpUsername} onChange={(e) => setSignUpUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input id="signUpPassword" name="signUpPassword" type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Sign Up</span>
                        </button>
                    </div>
                    <div className="error">{error}</div>
                </form>
            </div>
        </div>
    );
}

export default SignInSignUpForm;
