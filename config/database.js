if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURI: 'mongodb://konstantinast:1234@ds125368.mlab.com:25368/vidjot-prod'
    };
} else {
    module.exports = {
        mongoURI: 'mongodb://localhost/vidjot-dev'
    };    
}