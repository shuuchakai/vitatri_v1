import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

export const signup = async (req, res) => {
    const { firstName, lastName, username, email, password, weight, height } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ firstName, lastName, username, email, password: hashedPassword, weight, height });

        res.status(201).json({ result });

    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
        console.log(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "El usuario no existe" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Credenciales inválidas" });

        res.status(200).json({ result: existingUser });

    } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
}