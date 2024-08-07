const handleErrors = (error, req, res, next) => {
    if (error) {
        console.log(error)
        res.status(error.code || 500).send({ error: error.message || "Internal Server Error" })
    }
}

module.exports = { handleErrors }
