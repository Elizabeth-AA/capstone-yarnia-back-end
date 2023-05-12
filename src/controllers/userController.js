import UserService from '#services/users.js'

class UserController {
    async getById(req, res) {
        try {
            const data = await UserService.getById(req.params.id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async getStash(req, res) {
        try {
            const data = await UserService.getStash(req.params.id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async addUser(req, res) {
        try {
            await UserService.addUser(req.body)
            res.sendStatus(201)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async addStashItem(req, res) {
        try {
            await UserService.addStashItem(req.params.id, req.body)
            res.sendStatus(201)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    // add username and check if unique?
    async userAuth(email, password, done) {
        try {
          const user = await getByEmail({ email });
          if (!user) {
            return done(null, false, { message: 'Incorrect email.' });
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
    }

    async requireAuth(req, res, next) {
        if (req.isAuthenticated()) {
            res.render('/', { user: req.user });
            return next();
        }
        res.redirect('/login');
    }
}

export default new UserController()