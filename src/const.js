module.exports = {
    SECRET_KEY: process.env.SECRET_KEY || "xHEKTEmz38h4ZqAz5iNl7pc7YhEfwRN8",
    SECRET_KEY_STRIPE: process.env.SECRET_KEY || "sk_test_UtcUeaAsuGY0twghPpa5EBgs",
    SUBSCRIPTION_TYPES: {
        "GOLD": "plan_E1B01kxWlr35Lt",
        "PREMIUM": "plan_E1B2VFMoiEldgd"
    },
    MONGO_URI: 'mongodb://admin:xQTSZl2Zy6OQreuf@cluster0-shard-00-00-sdkax.mongodb.net:27017,cluster0-shard-00-01-sdkax.mongodb.net:27017,cluster0-shard-00-02-sdkax.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    TEST_MONGO_URI: 'mongodb://admin:coppel123@ds261440.mlab.com:61440/testnetflix'
}
