import { useSelector } from "react-redux";
import Onefeed from "./Onefeed";

const Feeds = () => {
    let data = useSelector(store => store.posts.userPosts)
    let myandposts = [];
    const userState = JSON.parse(localStorage.getItem("userState"));
    let currentUserId = userState ? userState.currentUser?.uid : null;
    let allfollwersids = useSelector(store => store.relation.followedUsers)
    // console.log(allfollwersdata[currentUserId])
    allfollwersids = allfollwersids[currentUserId]
    console.log(allfollwersids)
    allfollwersids?.forEach((id) => {
        let posts = data?.filter(post => post.userId === id);
        if (posts.length > 0) {
            myandposts.push(...posts);
        }
    })
    
    console.log(myandposts)
    myandposts.sort((a, b) => a.timestamp - b.timestamp);

    return (<div>
        {
            myandposts.length>0 ?   myandposts?.map(tweets => (
                <Onefeed key={tweets.userId} name={tweets.userName} content={tweets.content} time={ tweets.timestamp} />
               
           )) :"Your followers dont have any tweets this will be full when the people you followed have tweeted something"
        }
    </div>)
}
export default Feeds;