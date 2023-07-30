var expressforrouter = require("express");
const router = expressforrouter.Router();
const usercontroller = require("../controller/usercontroller");
const auth = require("../middleware/auth");
// user cotroller
router.get("/getAllUser", usercontroller.getAllUser);
router.post("/registerUser", usercontroller.registerUser);
router.post("/loginUser", usercontroller.loginUser);
router.get('/secret-route',auth, (req, res, next) => {
    console.log(req.id);
    res.send('This is the secret content. Only logged in users can see this!');
  });
module.exports = router;