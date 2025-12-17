import { Inngest } from 'inngest';
import { User } from '../models/userModel.js';
import connectDB from './database.js';


export const inngest = new Inngest({ id: 'ecom' })

export const syncUser = inngest.createFunction(
    { id: 'sync-user' },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        await connectDB();
        console.log(event.data)
        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}` || "User",
            imageUrl: image_url,
            addresses: [],
            wishList: []
        }
        await User.create(newUser);
    }
)

export const deleteUser = inngest.createFunction(
    { id: 'delete-user' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {
        await connectDB();
        const { id } = event.data;
        await User.deleteOne({ clerkId: id });
    }
)

export const updateUser = inngest.createFunction(
    { id: 'update-user' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        await connectDB();
        const { id, email_addresses, first_name, last_name, image_url } = event.data;
        await User.updateOne({ clerkId: id }, {
            $set: {
                email: email_addresses[0].email_address,
                name: `${first_name} ${last_name}` || "User",
                imageUrl: image_url,
            }
        })
    }
)
export const functions = [syncUser, deleteUser, updateUser]