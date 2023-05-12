import express from 'express'
import cors from 'cors'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import session from 'express-session'
import bcrypt from 'bcrypt'
import routes from '#routes'

const app = express()

app.use((req, res, next) => {
    console.log('->', req.method, req.url)
    next()
})

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}))  

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy({
    usernameField: 'username',
    emailField: 'email',
    passwordField: 'password',
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await getById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

app.use(cors())
app.use(express.json())
app.use(routes)

export default app