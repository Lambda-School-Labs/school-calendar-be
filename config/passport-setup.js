require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../model/User');

// Refactor Google Strategy
const strategyConfig = {
	clientID: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	callbackURL: '/api/auth/google/redirect'
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
      done(null, user);
  });
});


passport.use(
	new GoogleStrategy(
		strategyConfig,
		// 		async
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(currentUser => {
				if (currentUser) {
					// already have this user
					console.log('user is: ', currentUser);
					done(null, currentUser);
				} else {
					// if not, create user in our db
					new User({
						name: profile.displayName,
						googleId: profile.id,
						email: profile.emails[0].value,
						photoUrl: profile.photos[0].value
					})
						.save()
						.then(newUser => {
							console.log('created new user: ', newUser);
							done(null, newUser);
						});
				}
			});
		}
	)
);

// 			try {
// 				// Should get full user profile
// 				console.log('profile', profile);
// 				console.log('accessToken', accessToken);
// 				console.log('refreshToken', refreshToken);
// 				// Find user by data from token
// 				const existingUser = await User.findOne({ 'google.id': profile.id });
// 				if (existingUser) {
// 					return done(null, existingUser);
// 				}

// 				const newUser = new User({
// 					name: profile.displayName,
// 					googleId: profile.id,
// 					email: profile.emails[0].value,
// 					photoUrl: profile.photos[0].value
// 				});

// 				await newUser.save();
// 				done(null, newUser);
// 			} catch (error) {
// 				done(error, false, error.message);
// 			}
// 		}
// 	)
// );
