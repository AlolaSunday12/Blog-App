import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find({}).select('name email');
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

/*
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
*/
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
                // Generate JWT token with email, username, and any other necessary fields
                const token = jwt.sign({ email: user.email, name: user.name }, 'jwt-secret-key', { expiresIn: '1h' });

                // Set token in cookie
                res.cookie('token', token , { secure: true }); // Max age in milliseconds (1 hour)

               //set X-Content-Type-Options header
                res.setHeader('X-Content-Type-Options', 'nosniff');
                
                return res.status(200).json({ message: "Login successful" });
            }
        }
        return res.status(400).json({ message: 'Login failed' });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

export const verifyUser = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json("The token is missing")
        } else {
            jwt.verify(token, "jwt-secret-key", (err, decoded) => {
                if (err) {
                    return res.json("The token is wrong")
                } else {
                    req.email = decoded.email;
                    req.name = decoded.name;
                    next()
                }
            })
        }
};

export const logout = async (req, res) => {
    try {
        // Perform logout actions here, such as clearing session/token
        req.session.destroy(); // Clear session
        res.clearCookie('token'); // Clear cookie
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
/*

export const logout = async (req, res) => {
    res.clearCookie('token');
    return res.json("Success")
};
*/
