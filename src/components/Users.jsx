import { useSelector } from "react-redux";
import OneUser from "./OneUser";

const Users = () => {
    const loggedUsers = useSelector(store => store.user)
    let users = loggedUsers?.users
    const filterdUsers = users?.filter(u => u?.uid != loggedUsers?.currentUser?.uid);
    console.log(filterdUsers)
    return (
        <div className="w-full">
            {
                filterdUsers.map(user => (
                    <OneUser key={user?.uid} userId={user?.uid} name={ user?.displayName} />
                    
                ))
         }   

        </div>    
    )
}
export default Users;