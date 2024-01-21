import { useDispatch, useSelector } from "react-redux";
import { togglefollower, togglepost } from "../utils/toggleSlice";
import Onefeed from "./Onefeed";
import OneUser from "./OneUser";

const ProfileBody = ({myposts,currentUserId,allFollowers}) => {
    const dispatch = useDispatch();
 
    const post = useSelector(store => store.toggle.post)
    const follower=useSelector(store=>store.toggle.follower)
  
  return (
    <div className="mt-4">
      <div className="flex justify-around">
              <button className="flex " onClick={() => {
                dispatch(togglepost())    
        }}>
          <img
            className="w-6 h-6"
            src="data:image/jpeg;base64,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"
            alt=""
          />
          <h1 className="ml-3">Posts</h1>
        </button>
        <button className="flex " onClick={() => {
                dispatch(togglefollower())    
        }}>
          <img
            className="w-6 h-6"
            src="https://th.bing.com/th?id=OIP.Ph0NwklHGhKWrre8mka4vAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            alt=""
          />
          <h1 className="ml-3">Following</h1>
              </button>
              
          </div>
          <div>
      {post && (myposts.length>0 ? myposts?.map(tweets => (
                <Onefeed key={tweets.userId} name={tweets.userName} content={tweets.content} time={ tweets.timestamp} />
               
      )):"You have not tweeted anything in a while")
    }
              {follower && (allFollowers?.length ? allFollowers?.map(user => (
                    <OneUser key={user?.uid} userId={user?.uid} name={ user?.displayName} />
                    
              )):"You have not followed anyone")
              }
          </div>
    </div>
  );
};
export default ProfileBody;
