import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed';
import SignInSignUpForm from './components/SignInSignUpForm';
import './App.css';

const App = () => {
  if(!localStorage.getItem('username')) return <SignInSignUpForm />

  return (
    <ChatEngine
      height="100vh"
      projectID="139732b8-91ce-43d3-b2dd-5b82ab7f39b8"
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

// infinite scroll, logout, more customizations...

export default App;