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
  console.log(toggledata)
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
        <div className="flex justify-between  p-2">
          <div>

<h1 className="w-1/2 text-orange-500 text-3xl">TweetX</h1>
          </div>  
        
          <div className="w-1/2 flex justify-around">
            <button onClick={() => {
              dispatch(togglefeed())
          }}>
            <h1 className="text-gray-400 font-bold ">Feed</h1>
          </button>
          <button onClick={() => {
              dispatch(toggleusers())
          }}>
            <h1 className="text-gray-400 font-bold ">Users</h1>
          </button>
          <button onClick={() => {
              dispatch(toggleprofile())
          }}>
            <h1 className="text-gray-400 font-bold ">Profile</h1>
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
