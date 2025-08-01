import Posts from '../components/Posts';

export default function Home({ token }) {
    return (
        <div id="feed">
            <Posts token={token} />
        </div>
    );
}