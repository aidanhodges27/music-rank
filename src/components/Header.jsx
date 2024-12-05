import { SignIn, SignOut } from './Auth';

export default function header({action, user}){
    return(
        <>
        <header>
            <div onClick={action}>BeatBoxd</div>
            <div>{user ? <SignOut /> : <SignIn />}</div>
        </header>
        <h1>BeatBoxd</h1>
        </>
    )
}