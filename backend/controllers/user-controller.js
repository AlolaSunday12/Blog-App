import User from '../model/User.js';
import bcrypt from 'bcrypt';


    export const getAllUser = async (req, res, next) => {
    let users;
    try{
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "NO Users Found" });
    }
    return res.status(200).json({ users });
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email address is already in use.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            blogs: []
        });

        // Save the new user to the database
        const user = await newUser.save();

        // Return the newly created user
        return res.status(201).json({ user });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
            const temp = {
                email : user.email                
            }
            return res.status(200).json({message: "Login successful"});
        }
        } else {
            return res.status(400).json({ message: 'Login failed' });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
};