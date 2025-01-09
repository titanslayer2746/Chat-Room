import User from "../models/user.model.js";
import Notification from "../models/notification.model.js"

const getUserProfile = async (req,res) => {
    const {username} = req.params;

    try {
        const user = await User.findOne({username}).select("-password")

        if(!user) return res.status(404).json({message: "User not found"});

        res.status(200).json(user);
        
    } catch (error) {
        console.log("Error in getUserProfile controller : ", error)
        return res.status(500).json({error : error.message})
    }
}

const followUnfollowUser = async (req, res) => {

   try {
     const {id} = req.params;

     if(id==req.user._id) {
        res.status(404).json({message: "You cannot follow unfollow yourself"})
     }

     const userToFollowUnfollow = await User.findById(id)
     const currentUser = await User.findById(req.user._id)

     if(!userToFollowUnfollow || !currentUser){
        return res.status(404).json({message: "User not found"})
     }

     const isFollowing = currentUser.following.includes(id)

     if(isFollowing){
        //unfollow
        //remove the value of userToFollowUnfollow id from the following array of current user

        //Method 1
        await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
		await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

		res.status(200).json({ message: "User unfollowed successfully" });

        // Method 2
        // currentUser.following = currentUser.following.filter(follower => follower!=id)
        // userToFollowUnfollow.followers = userToFollowUnfollow.followers.filter(follower => follower!=req.user._id)
        // await currentUser.save()
        // await userToFollowUnfollow.save()
     }
     else{
        //follow
        //add the value of userToFollowUnfollow id to the following array of current user

        await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
        await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

        const newNotification = new Notification({
            type: "follow",
            from: req.user._id,
            to: userToModify._id,
        });

        await newNotification.save();

        res.status(200).json({ message: "User followed successfully" });
     }
     
   } catch (error) {
    console.log("Error in follow Unfollow user", error)
    return res.status(500).json({error: "Internal Server Error"})
   }
}


export {getUserProfile, followUnfollowUser}