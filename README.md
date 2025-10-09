# Wanderlust

Wanderlust is a Node.js/Express web application for listing and reviewing travel destinations. Users can create, view, and review listings, with authentication and error handling.

## Features

- User authentication (Passport.js & passport-local-mongoose)
- Create, edit, delete, and view travel listings
- Add and delete reviews for listings
- Flash messages for success and error feedback
- Server-side validation with Joi
- MongoDB/Mongoose for data storage
- EJS templating with layouts (ejs-mate)
- RESTful routing and error handling

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017/wanderlust`
   - Or update the `MONGO_URL` in `app.js` to your MongoDB URI

4. **Seed the database (optional):**
   ```bash
   node init/index.js
   ```

5. **Start the server:**
   ```bash
   npm start
   ```
   or
   ```bash
   nodemon app.js
   ```

6. **Visit in your browser:**
   ```
   http://localhost:8080
   ```

## Project Structure

```
majorprojects/
├── app.js
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/
│   ├── listing.js
│   └── review.js
├── views/
│   ├── listings/
│   ├── layouts/
│   └── error.ejs
├── public/
├── schema.js
├── utils/
│   ├── ExpressErrors.js
│   └── wrapAsync.js
└── init/
    ├── index.js
    └── data.js
```

## Troubleshooting

- **Validation errors:**  
  Make sure your forms use the correct field names (e.g., `listing[title]`, `review[comment]`).
- **Flash messages not showing:**  
  Ensure you use `return res.redirect(...)` after setting a flash message.
- **Cannot set headers after they are sent:**  
  Always return after a redirect or response.
- **"review" or "listing" is required:**  
  Confirm your form structure matches what Joi expects.

## License

MIT

---

**Happy coding!**