HTTP status codes:
200 -> ok -> Standard success response
201 -> Created -> Success and something was Created
400 -> Bad Request -> Something was wrong with the client’s input. For example, missing fields or user already exists.
500 -> Internal Server Error -> Something went wrong on the server side, like DB errors, unexpected exceptions, etc.


web API's (HTTP methods):
GET    -> read/ fetch data -> GET/ users = get a list of users
POST   -> create something -> POST/ signup = create a new user, can send JSON in req.body
PUT    -> update something completely -> PUT/ users/ 1 = replace user #1 with new data
PATCH  -> update something partially  -> PATCH/ users/ 1 = change only email of user #1
DELETE -> delete something -> DELETE/ users/ 1 = remove user #1 from DB

JWT - Json Web Token
its a string that securely represents some information about a user.
after login, instead of checking email and password everytime, the server sends a JWT to the client.
the client stores it (local storage) and sends it in the header for future requests.
the server verifies the token to know the user is authenticated.
all info is inside the token -> reduce the server load, since server doesnet need to store sessions in memory or DB
Token is signed -> cannot be modifed without the secret key
can also expire.

**** I havent used JWTs for practice easier, so not secured. Please be kind to use JWT. (authentication, getProfile)

next things -> 
Now you’ve got a solid foundation. From here, next steps you could practice (when you’re ready):

JWT authentication → so only logged-in users can access profile/update/delete.
JWT logged in      -> hv to replace the fake loggedin flag with a real JWT token from the backend

Validation library (like express-validator) → cleaner input checks.

Error handling middleware → centralize error responses.

Frontend connection → hook this backend up to a React (or plain HTML/JS) frontend.


// JWT Token handler is done, following the flow of the JWT
[ CLIENT ] 
   |
   | POST /signup {username, email, password}
   v
[ SERVER ]
   - Validate fields
   - Check if user exists
   - Hash password
   - Store user in DB
   - Respond: "User created successfully. Please login."
   |
   v
[ CLIENT ] 
   - Signup successful message
   - User now submits login

   |
   | POST /login {email, password}
   v
[ SERVER ]
   - Find user by email
   - Compare password using bcrypt
   - If valid:
        - Generate JWT: jwt.sign({id: user.id}, SECRET, {expiresIn: '1h'})
        - Respond: {message: "Login successful", token}
   - If invalid: respond with error
   |
   v
[ CLIENT ] 
   - Receives JWT
   - Stores JWT (localStorage, session, memory)
   - Sends JWT in Authorization header for protected routes:
        Authorization: Bearer <JWT_TOKEN>

   |
   | GET /profile OR PUT /update-password OR DELETE /delete-user
   v
[ SERVER - Middleware ]
   - authMiddleware reads header
   - Extract token
   - Verify token with SECRET
   - If valid: attach payload to req.user
   - If invalid/expired: respond 401/403
   |
   v
[ SERVER - Controller ]
   - Use req.user.id to query/update/delete user
   - Respond with appropriate success/error message
   |
   v
[ CLIENT ]
   - Receives requested data or confirmation of action
