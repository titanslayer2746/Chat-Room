import { generateTokenAndSetCookie } from "../lib/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

const signup = async (req, res) => {

    try {
        
        const {fullName, username, email, password} = req.body
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message : "Invalid email format"})
        }

        const isUsernameExists = await User.findOne({username})

        if(isUsernameExists) {
            return res.status(400).json({message : "Username already taken"})
        }

        const isEmailExists = await User.findOne({email})

        if(isEmailExists){
            return res.status(400).json({message : "Email already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message : "Password should be at least 6 characters long"})
        }


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,      
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            newUser.save()

            return res.status(201).json({
                _id : newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            })
        }
        else{
            return res.status(400).json({message : "Failed to create user"})
        }

    } catch (error) {
        console.log("Error in signup controller", error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}

const login = async (req, res) => {
	try {
		const { username, password} = req.body
        const user = await User.findOne({username})

        if(!user){
            return res.status(404).json({message : "User not found"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "" )

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

const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "Logged out Successfully"})
    } catch (error) {
        console.log("Error in logout controller", error)
        res.status(500).json({error: "Internal Server Error"});
    }
}

const getMe = async (req,res) =>{
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error)
        res.status(500).json({error: "Internal Server Error"});
    }
}


export { login, logout, signup, getMe }