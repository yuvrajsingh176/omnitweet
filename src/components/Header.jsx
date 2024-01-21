import { onAuthStateChanged, signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { togglefeed, toggleprofile, toggleusers } from "../utils/toggleSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggledata = useSelector(store => store.toggle)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName,  } = user;
        dispatch(addUser({ uid, email, displayName,  }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
 
  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" z-11 flex flex-col  justify-between  w-screen  px-8 py-2 shadow-xl  ">
      {user ? (
        <div className="flex sm:justify-between space-x-2 p-2">
          <div>

<h1 className="  sm:w-1/2  text-orange-500 text-xl sm:text-3xl mr-3">TweetX</h1>
          </div>  
        
          <div className="sm:w-1/2 flex justify-around sm:justify-between ">
            <button onClick={() => {
              dispatch(togglefeed())
          }}>
            <h1 className="text-gray-400 font-bold mr-3">Feed</h1>
          </button>
          <button onClick={() => {
              dispatch(toggleusers())
          }}>
            <h1 className="text-gray-400 font-bold mr-3">Users</h1>
          </button>
          <button onClick={() => {
              dispatch(toggleprofile())
          }}>
            <h1 className="text-gray-400 font-bold mr-3">Profile</h1>
          </button>
          <button onClick={handleSignout}>
            <h1 className="text-gray-400 font-bold ">Sign out</h1>
          </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Header;
