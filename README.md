# ExpressJS-OAuth2

NodeJS | ExpressJS | Passport | JWT | OAuth2
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------:
<img align='center' src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" width=100>  |  <img align='center' src="https://expressjs.com/images/express-facebook-share.png" width=150> | <img align='center' src="https://projecthydro.org/wp-content/uploads/2019/01/passportJS.png" width=100> | <img align='center' src="https://miro.medium.com/max/3200/1*t9d16DIcJg_-dEg0X_qTWg.png" width=150> | <img align='center' src="https://cdn.auth0.com/website/assets/pages/homepage/img/std_cert/oauth2-360e300bd3.svg" width=100>

## Prerequisites

* Obtain credentials from [Google Cloud Platform](https://console.developers.google.com) - Create project, enable Google+ API, generate OAuth2 credentials

* Edit google credentials in ```config/config.js``` file to match yours.

## How it works

* Start the server ```node index.js```

* Open http://YOUR-SITE:3000

* You can Login with google account and data about logged used will be displayed.

## Logic

* When you click login, it will call ```/auth/google``` route which use passport middleware to authorize your request using Google. After you enter correct password, it will return user data to callback route ```/auth/google/callback```

* On callback route we use ```req.user``` taht Google returned, and sign that with ```authService.issueToken``` method from services.

* After we have signed JWT, we redirect user to ```/redirect.html``` with two parameters ```token``` and ```user```. On that page, we will set parameters in browser's local storage and redirect user to ```index.html```

## Middleware Logic

On backed, I created one simple route ```/secret``` that you can use for testing. This route require ```Authorization``` header to contain our JWT. You can use JWT from local storage and put it in Postman (example below):
![](https://i.imgur.com/vmONGQo.png)