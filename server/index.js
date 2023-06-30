import express from 'express'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorMiddleware.js'
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
import connectDB from './config/db.js'
import cp from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import bodyParser from 'body-parser'
import user from './src/routes/user.js'
import cookieSession from 'cookie-session';


dotenv.config()
connectDB()
const app = express()


// app.use(cors({origin:"https://pro-shop-ecommerce.onrender.com",credentials:true}))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(cp())


app.use('/api', user)
app.use(cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 1000 }))
app.use(passport.initialize());
app.use(passport.session());

// app.get('/api/config/paypal', (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// )
// app.get('/api/config/exchange', (req, res) =>
//   res.send(process.env.EXCHANGE_API_KEY)
// )

  app.get('/', (req, res) => {
    res.send('API is running....')
  })

app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(`Server running on port ${PORT} `)
)