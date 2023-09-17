
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
const routes = require('./controllers/index');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({helpers});

const sess = {
    secret: 'a;sldkfjaoivnaeoi8hpq398ru',
    cookie: {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};


app.use(session(sess));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}. To visit site go to http://localhost:${PORT}`))
})

// This goes after the `app.use(routes);` line
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  