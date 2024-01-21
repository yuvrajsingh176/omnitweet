import { useSelector } from "react-redux";

export const allFollowersFunc = (currentUserId) => {
    let allfollwersdata = useSelector(store => store.relation.followedUsers)
    console.log(allfollwersdata[currentUserId])
    allfollwersdata=allfollwersdata[currentUserId]
    let allusers = useSelector(store => store.user.users);
    const allFollowers = [];

    allfollwersdata?.forEach((followerId) => {
  const followerData = allusers?.find((user) => user?.uid === followerId);

  if (followerData) {
    allFollowers.push(followerData);
  }
    });
    return allFollowers;
}