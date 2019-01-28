const env = process.env

// variables that are not marked as "default" require destructuring in the module that imports this module

export const nodeEnv = env.NODE_ENV || "development"

export const logStars = function (message) {
    console.log("********")
    console.log(message)
    console.log("********")
}

export default {
    port: env.PORT || 3000,
    host: env.HOST || '0.0.0.0',
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
    },
    mongodbUri: `mongodb://127.0.0.1:27017/`

}
