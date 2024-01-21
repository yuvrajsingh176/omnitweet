import { useDispatch, useSelector } from "react-redux";
import { followUser } from "../utils/relationSlice";
import { useState } from "react";
import { allFollowersFunc } from "../utils/functions";

const OneUser = ({ name, userId }) => {
    const userState = JSON.parse(localStorage.getItem("userState"));
    const currentUserId = userState ? userState.currentUser?.uid : null;
    
    const dispatch = useDispatch();
    const followedusers = useSelector(store => store.relation.followedUsers)
    let followed = followedusers[currentUserId]?.includes(userId);
    console.log(followed)
    let allfollowed=allFollowersFunc(userId)
    return (
        <div className="shadow-lg rounded-lg bg-gray-100 p-2 mt-6 flex w-full">
        <div className=" w-3/12  ">

<img className="rounded-full bg-white p-6 h-10 w-10 "  src="data:image/jpeg;base64,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" alt="img" />
</div>
            <div className="w-7/12 h-36 ">
            <div className="head flex justify-between">
                <div className="flex-row  justify-between w-1/2">
                   
                        <h1>{name}</h1>
                        <h1>Following: {allfollowed?.length} </h1>
                </div>
           
                 {  !followed? <button className="bg-orange-500 text-white p-2 px-5   m-2 rounded-lg"
                        onClick={() => {
                            dispatch(followUser({ currentUserId:currentUserId , followedUserId: userId }));

                            // setDim()
                    }}
                    >Follow</button>:"Followed"}
            </div>
            
            </div>
             
        </div>
    )

}
export default OneUser;