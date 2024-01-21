import { useSelector } from "react-redux";
import Feed from "./Feed";
import Header from "./Header";
import Profile from "./Profile";
import Users from "./Users";
import { useParams } from "react-router";

const Browse = () => {
    const toggledata = useSelector(store => store.toggle)
    const { param } = useParams();

    // Now, you can use the values of param1 and param2 in your component
    console.log(param);
    return (
        <div className="relative">
            <div>
                <Header />            
            </div>
            <div className="  h-screen  mt-2 mx-auto  flex  justify-center  left-1/2  sm:w-1/2 ">
               
            {toggledata.feed ? <Feed /> : null}
            {toggledata.users ? <Users /> : null}
            {!toggledata.feed && !toggledata.users ? <Profile /> : null}

            </div>
           
        </div>
    );
};

export default Browse;
