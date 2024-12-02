const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    points: {
        Amazon: { type: Number, default: 150 },
        Flipkart: { type: Number, default: 150 },
        Swiggy: { type: Number, default: 150 },
    },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
    this.password = crypto.createHash('sha256').update(this.password).digest('hex');
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    // return await bcrypt.compare(enteredPassword, this.password);
    const hashedEnteredPassword = crypto.createHash('sha256').update(enteredPassword).digest('hex');
    return hashedEnteredPassword === this.password;
};

module.exports = mongoose.model('User', UserSchema);
