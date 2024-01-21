import { Link, useNavigate, useParams } from "react-router-dom";
// import Header from "./Header";
import { useRef, useState } from "react";
import{checkValidateData} from '../utils/validate'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../utils/userSlice";
import Header from "./Header";
const Login = () => {
    const navigate = useNavigate();
    


    const [errmsg, setErrmsg] = useState(null);
const [signinstate,setsigninstate]=useState(true)
    const email = useRef(null);
    const password = useRef(null);
const name=useRef(null)
    const signupHandler = (e) => {
        e.preventDefault();
    setsigninstate(!signinstate)
    }
    const dispatch = useDispatch();
    const handleButtonClick = () => {
        const message = checkValidateData(email.current.value, password.current.value)
        setErrmsg(message)
        if (message) return;

        if (!signinstate) {
            //sign up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredentials) => {
                    const user = userCredentials.user;

                    updateProfile(user, {
                        displayName: name.current.value,
                        // photoURL:{logo}
                    }).then(() => {
                        const { uid, email, displayName,  } = auth.currentUser;
                     console.log(uid, email, displayName, )
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            // photoURL:photoURL
}))
                    })
                        .catch(err => {
                            console.log(err)
                    })
                })
                .catch(e => {
                    const errorCode = e.code;
                    const errmsg = e.message;
                    setErrmsg(errmsg)
navigate('/')

            })
        }
        else {
            //sign uin
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    //we could do the dispatch thing here or in sign up but insted doing mul
                    //multiple times we will do it in root  
                    dispatch(updateUser({
                        uid: user.uid,
                        email:user.email,
                        displayName: user.displayName,
           }))
                })
                .catch(e => {
                    const errorCode = e.code;
                    const errmsg = e.message;
                    setErrmsg(errmsg)
                    console.log(err)

           
                })
        }

    }
    return (
        <div>
            <Header/>
      <div className="absolute  h-full w-full">
        <img className="min-h-full min-w-full  object-contain"
          alt="logo"
          src="data:image/jpeg;base64,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"
                    
        />
      </div>
            <form onSubmit={(e) => {
                e.preventDefault();
      }} className="rounded-lg   relative top-32  md:h-[580px] w-full md:w-4/12 mx-auto bg-[rgba(0,0,0,.75)]" action="">
       
              <div className="flex flex-col items-center pt-8">
              
                    <h4 className="text-white text-4xl font-medium">
                        {
                            signinstate?"Sign In":"Sign Up"
                    }    
                       
                    
                    </h4>
                 
                    {
                        signinstate===false && <div className="pt-8 w-8/12 flex items-center">
                  <input
          type="text"
          placeholder="Name"
          className="pt-4 pr-5 pb-2 pl-5 w-full bg-gray-700  text-white h-[50px] leading-6 outline-none  rounded-sm"
         ref={name}
                      />
                  </div>
                    }
             
                  
                  <div className="pt-8 w-8/12 flex items-center">
                  <input
          type="text"
          placeholder="Email Address"
          className="pt-4 pr-5 pb-2 pl-5 w-full bg-gray-700  text-white h-[50px] leading-6 outline-none  rounded-sm"
         ref={email}
                      />
                  </div>
                  <div className="pt-8 w-8/12 flex items-center">
                  
        <input
          type="password"
          placeholder="Password"
          className="pt-4  pb-2 pl-5 w-full bg-gray-700   text-white h-[50px] leading-6 outline-none  rounded-sm"
ref={password}
                      />
                    </div>   
                  
                    <p className="text-red-600 pt-2 font-bold">{ errmsg}</p>
                  <div className="pt-14 w-8/12">
                      <button onClick={handleButtonClick} className="pt-6 pr-5 pb-6 pl-6  rounded-md bg-[#e50914] w-full flex align-middle justify-center">
                          <h1 className="text-white text-2xl font-medium ">
                          Sign {signinstate?" in ":" up "}    
                          </h1>
                      </button>
                  
                  </div>
    
                  <div className="flex w-8/12 items-stretch text-white pt-4 justify-between">
   
                      <label htmlFor="" >
                          <input type="checkbox" className="h-5 mr-1 w-5 " />
                          Remember me
                      </label>
    <h1 className="ml-auto">Need help?</h1>
</div>

                  <h4 className="text-white w-8/12 pt-6 text-xl">
                      <span className="text-[#737373]"></span>
                      <button >
                            {
                                <p onClick={signupHandler}>
                                    {
                                        signinstate?"New to Tweetx? Sign up now.":"Already registered? Sign in now"

                                    }
                                    
                                </p>
                }
                      </button>
                  </h4>
                  
                  
              </div>
                  
      </form>
    </div>
  );
};

export default Login;
