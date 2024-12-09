import { SignIn, SignOut } from './Auth';
import '../components/Header.css';

export default function header({action, user}){
    return(
        <>
        <header className="app-header">
            <div onClick={action}>BeatBoxd</div>
            <div>{user ? <SignOut /> : <SignIn />}</div>
        </header>
        <h1>BeatBoxd</h1>
        </>
    )
}