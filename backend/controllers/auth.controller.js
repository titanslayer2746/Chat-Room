import { generateTokenAndSetCookie } from "../lib/generateToken";
import User from "../models/user.model";
import bcrypt from "bcryptjs"

export const login = async (req, res) => {
	try {
		const { username, password} = req.body
        const user = await User.findOne({username})

        if(!user){
            return res.status(404).json({message : "User not found"})
        }

        const isPasswordCorrect = bcrypt.compare(password, user?.password || "" )

        if(!isPasswordCorrect){
            return res.status(400).json({message : "Incorrect password"})
        }

        generateTokenAndSetCookie(user._id,res)

        res.json({
            _id: user._id,
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			followers: user.followers,
			following: user.following,
			profileImg: user.profileImg,
			coverImg: user.coverImg,
        });
        
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};