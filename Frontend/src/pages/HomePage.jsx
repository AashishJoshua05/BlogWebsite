import { useEffect, useState } from "react"
import Post from "../components/Post"

function HomePage() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/post').then(response => {
            response.json().then(posts => {
                setPosts(posts)
            });
        });
    }, []);

    return (
    <div className="flex flex-col space-y-8">
        {
            posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))
        }
    </div>
  )
}

export default HomePage