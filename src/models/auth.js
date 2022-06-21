const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})
// Password Hash Generating
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next();
        const hash = await bcrypt.hash(this.password, 12);
        this.password = hash;
        return next();
    } catch (error) {
        return next(error);
    }
});
const User = new mongoose.model("User", userSchema);
module.exports = User;