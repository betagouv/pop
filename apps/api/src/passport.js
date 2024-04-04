const JwtStrategy = require("passport-jwt").Strategy;
//const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("./config");

// load up the user model
const User = require("./models/user");

// Custom Extractor for JWT from cookie
const cookieExtractor = (req) => {
	if (req.headers.cookie) {
		const cookieName = "token";
		const cookies = req.headers.cookie.split("; ");
		for (let i = 0; i < cookies.length; i++) {
			const [name, value] = cookies[i].split("=");
			if (name === cookieName) {
				return value;
			}
		}
	}
	return null;
};

module.exports = (passport) => {
	const opts = {};
	opts.jwtFromRequest = cookieExtractor;
	opts.secretOrKey = config.secret;
	passport.use(
		new JwtStrategy(opts, (jwtPayload, done) => {
			User.findOne(
				{
					_id: jwtPayload._id,
				},
				(err, user) => {
					if (err) {
						return done(err, false);
					}
					if (user) {
						done(null, user);
					} else {
						done(null, false);
					}
				},
			);
		}),
	);
};

// Passport authorization header strategy
// module.exports = function(passport) {
//   const opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
//   opts.secretOrKey = config.secret;
//   passport.use(
//     new JwtStrategy(opts, function(jwtPayload, done) {
//       User.findOne(
//         {
//           _id: jwtPayload._id
//         },
//         function(err, user) {
//           if (err) {
//             return done(err, false);
//           }
//           if (user) {
//             done(null, user);
//           } else {
//             done(null, false);
//           }
//         }
//       );
//     })
//   );
// };
