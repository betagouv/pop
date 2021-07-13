const express = require("express");
const { getToken } = require("./utils/mapboxRotatingToken");
const router = express.Router();

router.get("/token", async (req, res) => {
    try {
        const token = await getToken();
        return res.status(200).send({ success: true, token });
    } catch (error) {
        return res.status(500).send({ success: false, error });
    }
});

module.exports = router;