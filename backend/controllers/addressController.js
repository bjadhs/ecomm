import { Address } from "../models/addressModel.js";


export const addAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { label, fullName, streetAddress, city, state, zipcode, phone, isDefault } = req.body;
        const newAddress = await Address.create({ userId, label, fullName, streetAddress, city, state, zipcode, phone, isDefault: isDefault || false });
        res.status(201).json(newAddress);
    } catch (error) {
        console.log("Error adding address", error);
        res.status(500).json({ message: error.message })
    }
}
export const getAddress = async (req, res) => {

    try {
        const userId = req.user.id;
        const address = await Address.find({ userId })
        res.status(200).json(address);
    } catch (error) {
        console.log("Error fetching addresses", error);
        res.status(500).json({ message: error.message });
    }
}
export const updateAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { label, fullName, streetAddress, city, state, zipcode, phone, isDefault } = req.body;
        const updatedAddress = await Address.findOneAndUpdate({ userId, _id: req.params.id }, { label, fullName, streetAddress, city, state, zipcode, phone, isDefault: isDefault || false }, { new: true });
        res.status(200).json(updatedAddress);
    } catch (error) {
        console.log("Error updating address", error);
        res.status(500).json({ message: error.message });
    }
}
export const deleteAddress = async (req, res) => {
}

