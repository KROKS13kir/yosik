import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {type: 'string', required: true, unique: true},
        password: {type: 'string', required: true},
        products: [{type: mongoose.Schema.ObjectId, ref: 'products'}],

    },
    {timestamps: true}
)


export default mongoose.model('User', UserSchema)
