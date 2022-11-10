const mongoose = require('mongoose')

exports.database = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/decode_blog_db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }).then(() => {
        console.log('MongoDB connected')
    }).catch((err) => {
        console.log('MongoDBError', err)
    })
}
