const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    login: String,
    password: String,
    name: String,
    img: { type: String, default: '/img/static/course-default.svg' },
    
});

userSchema.pre('save', function(next){
    var user = this;

    if( !user.isModified('password') )
        return next();

    bcrypt.genSalt(10, function(err, salt){
        if(err)
            return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err)
                return next(err);

            user.password = hash;
            next();
        });
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        next()
      });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err)
            return cb(err);

        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
