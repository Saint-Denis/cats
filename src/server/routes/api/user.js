const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("././../../config/default").jwtSecret;
const { check, validationResult } = require("express-validator");

const User = require("../../models/UserSchema");

//Register User
router.post(
  "/",
  [
    check("name", "Имя обязательно для заполнения")
      .not()
      .isEmpty(),
    check("email", "Пожалуйста введите корректный email").isEmail(),
    check("password", "Пожалуйста введите 6 или более символов").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Юзер уже существует" }] });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

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
      res.status(500).send("Ошибка сервера");
    }
  }
);

//Add to favourite
router.put("/like/:id", auth, async (req, res) => {
  try {
    let user = await User.findOne({ email });
    const isLiked = user.favouritesIds.filter(favourite => favourite.catsId === req.params.id)

    if (isLiked) {
      return res.json(400).json({msg: "Котик уже добавлен в избранное"})
    }

    user.favouritesIds.push({ catsId: req.params.id })

    await user.save()

    res.jsom(user.favouritesIds)
  } catch (error) {
    res.status(500).send("Ошибка сервера")
  }
})

module.exports = router;
