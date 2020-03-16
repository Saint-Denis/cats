const express = require("express");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("././../../config/default").jwtSecret;
const { check, validationResult } = require("express-validator");
const router = express.Router();

const User = require("../../models/UserSchema");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).send("Server error");
  }
});

//Authenticate User
router.post(
  "/",
  [
    check("email", "Пожалуйста введите корректный email").isEmail(),
    check("password", "Пароль обязателен для заполнения").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(422).json({ errors: [{ msg: "Неверные данные" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(422).json({ errors: [{ msg: "Неверные данные" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (e) {
      console.log(e.message);
      res.status(400).send("Ошибка сервера");
    }
  }
);

module.exports = router;
