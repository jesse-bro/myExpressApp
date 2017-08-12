//var express = require('express');
//var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//var session = require('express-session');
//var formidable = require('formidable');
//var fortune = require('./lib/fortune.js');
//var credentials = require('./credentials.js');
//var RequireWaiver = require('./lib/tourRequiresWaiver.js');
//var cartValidation = require('./lib/cartValidation.js');
//var connect = require('connect');
//var nodemailer = require('nodemailer');


//var app = express();
//var handlebars = require('express3-handlebars').create({
//    defaultLayout: 'main',
//    helpers: {
//        section: function (name, options) {
//            if (!this._sections) this._sections = {};
//            this._sections[name] = options.fn(this);
//            return null;
//        }
//    }
//});

//var mailTransport = nodemailer.createTransport({
//    service: 'Gmail',
//    auth: {
//        user: credentials.gmail.user,
//        pass: credentials.gmail.password,
//    }
//});

////mailTransport.sendMail({
////    from: '"Jesse Example" <info@meadowlarktravel.com>',
////    to: 'super569042@gmail.com',
////    subject: 'Test',
////    html: '<h1>WUD UP</h1>\n <p>Whats up my friend, dont give up...<b> I\'m more ready than petty nowadays</b>',
////    generateTextFromHtml: true,
////}, function (err) {
////    if (err) console.error('Unable to send email: ' + error);
////}
////);

//app.engine('handlebars', handlebars.engine);
//app.set('view engine', 'handlebars');

//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
////app.set('view engine', 'jade');

//// uncomment after placing your favicon in /public
////app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));


//function getWeatherData() {
//    return {
//        locations: [
//            {
//                name: 'Portland',
//                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
//                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
//                weather: 'Overcast',
//                temp: '54.1 F (12.3 C)',
//            },
//            {
//                name: 'Bend',
//                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
//                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
//                weather: 'Partly Cloudy',
//                temp: '55.0 F (12.8 C)',
//            },
//            {
//                name: 'Manzanita',
//                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
//                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
//                weather: 'Light Rain',
//                temp: '55.0 F (12.8 C)',
//            },
//        ],
//    };
//}

/////////////////////////////////////////////////////////////////////////////////////////
///// SETS UP COOKIE Password and Session key
////////////////////////////////////////////////////////////////////////////////////////
//app.use(cookieParser(credentials.cookieSecret));
//app.use(session({
//    secret: credentials.cookieSecret,
//    resave: true,
//    saveUninitialized: true,
//    })
//);
////////////////////////////////////////////////////////////////////////////////////////
/////NOTE: APP.USE used to insert middleware
////////////////////////////////////////////////////////////////////////////////////////
//app.use(function (req, res, next) {
//    if (!res.locals.partials) res.locals.partials = {};
//    res.locals.partials.weather = getWeatherData();
//    next();
//});

//app.use(function (req, res, next) {
//    res.locals.showTests = app.get('env') !== 'production' &&
//        req.query.test === '1';
//    next();
//});

//app.use(function (req, res, next) {
//    res.locals.flash = req.session.flash;
//    delete req.session.flash;
//    next();
//    //if there's a flash message, transfer it to the context, then clear it
//});

//app.use(RequireWaiver);

//app.use(cartValidation.checkWaivers);
//app.use(cartValidation.checkGuestCounts);



/////TESTING function of next()
/////////////////////////////////////////////////////////////////////////
////app.use(function (req, res, next){
////    console.log('processing request for "' + req.url + '"......');
////    next();
////});

////app.use(function (req, res, next) {
////    console.log('Terminating request');
////    res.send('thanks for playing!');
////    //NOTE: did NOT call next() here...
////    //Terminates the request
////});

////app.use(function (req, res, next) {
////    console.log('whoops, i\'ll never get called!');
////    console.log('jk');
////});
//////////////////////////////////////////////////////////////////////////

//var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

///////////////////////////////////////////////////////////////////////////
/////NOTE: Routes and FORM POST
///////////////////////////////////////////////////////////////////////////

//// mocking product database
//function Product() {
//}
//Product.find = function (conditions, fields, options, cb) {
//    if (typeof conditions === 'function') {
//        cb = conditions;
//        conditions = {};
//        fields = null;
//        options = {};
//    } else if (typeof fields === 'function') {
//        cb = fields;
//        fields = null;
//        options = {};
//    } else if (typeof options === 'function') {
//        cb = options;
//        options = {};
//    }
//    var products = [
//        {
//            name: 'Hood River Tour',
//            slug: 'hood-river',
//            category: 'tour',
//            maximumGuests: 15,
//            sku: 723,
//        },
//        {
//            name: 'Oregon Coast Tour',
//            slug: 'oregon-coast',
//            category: 'tour',
//            maximumGuests: 10,
//            sku: 446,
//        },
//        {
//            name: 'Rock Climbing in Bend',
//            slug: 'rock-climbing/bend',
//            category: 'adventure',
//            requiresWaiver: true,
//            maximumGuests: 4,
//            sku: 944,
//        }
//    ];
//    cb(null, products.filter(function (p) {
//        if (conditions.category && p.category !== conditions.category) return false;
//        if (conditions.slug && p.slug !== conditions.slug) return false;
//        if (isFinite(conditions.sku) && p.sku !== Number(conditions.sku)) return false;
//        return true;
//    }));
//};
//Product.findOne = function (conditions, fields, options, cb) {
//    if (typeof conditions === 'function') {
//        cb = conditions;
//        conditions = {};
//        fields = null;
//        options = {};
//    } else if (typeof fields === 'function') {
//        cb = fields;
//        fields = null;
//        options = {};
//    } else if (typeof options === 'function') {
//        cb = options;
//        options = {};
//    }
//    Product.find(conditions, fields, options, function (err, products) {
//        cb(err, products && products.length ? products[0] : null);
//    });
//};

//app.get('/cart', function (req, res, next) {
//    var cart = req.session.cart;
//    if (!cart) next();
//    res.render('cart', { cart: cart });
//});

//app.post('/cart/add', function (req, res, next) {
//    var cart = req.session.cart || (req.session.cart = { items: [] });
//    Product.findOne({ sku: req.body.sku }, function (err, product) {
//        if (err) return next(err);
//        if (!product) return next(new Error('Unknown product SKU: ' + req.body.sku));
//        cart.items.push({
//            product: product,
//            guests: req.body.guests || 0,
//        });
//        res.redirect(303, '/cart');
//    });
//});



//app.get('/cart/checkout', function (req, res, next) {
//    var cart = req.session.cart;
//    if (!cart) next();
//    res.render('cart-checkout');
//});

//app.get('/cart/thank-you', function (req, res) {
//    res.render('cart-thank-you', { cart: req.session.cart });
//});

//app.get('/email/cart/thank-you', function (req, res) {
//    res.render('email/cart-thank-you', { cart: req.session.cart, layout: null });
//});

//app.post('/cart/checkout', function (req, res) {
//    var cart = req.session.cart;
//    if (!cart) next(new Error('Cart does not exist.'));
//    var name = req.body.name || '', email = req.body.email || '';
//    //input validation
//    if (!email.match(VALID_EMAIL_REGEX))
//        return res.next(new Error('Invalid email address'));
//    //assign random cart ID
//    cart.number = Math.random().toString().replace(/^0\.0*/, '');
//    cart.billing = {
//        name: name,
//        email: email,
//    };

//    res.render('email/cart-thank-you', {
//        layout: null, cart: cart
//    }, function (err, html) {
//        if (err) console.log('error in email template');
//        mailTransport.sendMail({
//            from: '"JESSE": info@jesse.com',
//            to: cart.billing.email,
//            subject: 'Thanks',
//            html: html,
//            generateTextFromHtml: true
//        }, function (err) {
//            if (err) console.error('Unable to send confirmation: ' + err.stack);
//        });
//    }
//    );
//    res.render('cart-thank-you', { cart: cart });
//});


//app.get('/newsletter', function (req, res) {
//    res.render('newsletter', { csrf: 'CSRF token goes here' });
//});

//app.get('/thank-you', function (req, res) {
//    res.render('thank-you');
//});


/////NOTE: Flash Messages for Newsletter Sign Up
//app.post('/newsletter', function (req, res) {
//    var name = req.body.name || '', email = req.body.email || '';
//    //input validation
//    if (!email.match(VALID_EMAIL_REGEX)) {
//        if (req.xhr) return res.json({ error: 'Invalid name email address' });
//        req.session.flash = {
//            type: 'danger',
//            intro: 'Validation error!',
//            message: 'The email address you entered was not valid.',
//        };
//        return res.redirect(303, '/newsletter/archive');
//    }
//    new NewsletterSignup({ name: name, email: email }).save(function (err) {
//        if (err) {
//            if (req.xhr) return res.json({ error: 'Database Error.' });
//            req.session.flash = {
//                type: 'danger',
//                intro: 'Database Error!',
//                message: 'There was a database error; please try again later.',
//            };
//            return res.redirect(303, '/newsletter/archieve');
//        }
//        if (req.xhr) return res.json({ success: true });
//        req.session.flash = {
//            type: 'success',
//            intro: 'thank you',
//            message: 'You have now been signed up for the newsletter.',
//        };
//        return res.redirect(303, '/newsletter/archieve');
//    });
//});

//app.post('/process', function (req, res) {
//    if (req.xhr || req.accepts('json,html') === 'json') {
//        res.send({ success: true });
//    } else {
//        res.redirect(303, '/thank-you');
//    }
//});

//////////////////////////////////////////////////////////////////////////////////////////////////////
///// TESTING FILE UPLOADING
/////////////////////////////////////////////////////////////////////////////////////////////////////
//app.get('/contest/vacation-photo', function (req, res) {
//    var now = new Date();
//    res.render('contest/vacation-photo', {
//        year: now.getFullYear(), month: now.getMonth()
//    });
//});

//app.post('/contest/vacation-photo/:year/:month', function (req, res) {
//    var form = new formidable.IncomingForm();
//    form.parse(req, function (err, fields, files) {
//        if (err) return res.redirect(303, '/error');
//        console.log('recieved fields:');
//        console.log(fields);
//        console.log('recieved files:');
//        console.log(files);
//        res.redirect(303, '/thank-you');
//    });
//});
///////////////////////////////////////////////////////////////////////////////////////////////////////


//app.get('/headers', function (req, res) {
//    res.set('Content-Type', 'text/plain');
//    var s = '';
//    for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
//    res.send(s);
//});

//app.get('/j-test', function (req, res) {
//    res.render('j-test');
//});

//app.get('/nursery-rhyme', function (req, res) {
//    res.render('nursery-rhyme');
//});
//app.get('/data/nursery-rhyme', function (req, res) {
//    res.json({
//        animal: 'squirrel',
//        bodyPart: 'tail',
//        adjective: 'bushy',
//        noun: 'heck',
//    });
//});

//app.get('/', function (req, res) {
//    res.render('home');
//    //res.cookie('monster', 'nom nom');
//    //NOTE: Must have different name
//    //res.cookie('signed_monster', 'nom nom', { signed: true });

//    //NOTE: returns Cookie that was place beforehand
//   // var monster = req.cookies.monster;
//    //console.log(monster);
//    //res.clearCookie('monster');

//});
//app.get('/about', function (req, res) {
//    res.render('about', {
//        fortune: fortune.getFortune(),
//        pageTestScript: '/qa/tests-about.js'
//    });
//});

//app.get('/tours/hood-river', function (req, res) {
//    res.render('tours/hood-river');
//});
//app.get('/tours/request-group-rate', function (req, res) {
//    res.render('tours/request-group-rate');
//});
//app.get('/tours/oregon-coast', function (req, res) {
//    res.render('tours/oregon-coast');
//});

//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  //var err = new Error('Not Found');
//  //err.status = 404;
//  //next(err);
//    res.status(404);
//    res.render('404');
//});

//app.use(function (err, req, res, next) {
//    console.error(err.stack);
//    res.status(500);
//    res.render('500');
//});

//// error handler
//app.use(function(err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};

//  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
//});


//app.listen(3000, function () {
//    console.log("express has started on port 3000");
//});

//module.exports = app;
var http = require('http'),
    express = require('express'),
    fortune = require('./lib/fortune.js'),
    formidable = require('formidable');

var app = express();

var credentials = require('./credentials.js');

var emailService = require('./lib/email.js')(credentials);

// set up handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// use domains for better error handling
app.use(function (req, res, next) {
    // create a domain for this request
    var domain = require('domain').create();
    // handle errors on this domain
    domain.on('error', function (err) {
        console.error('DOMAIN ERROR CAUGHT\n', err.stack);
        try {
            // failsafe shutdown in 5 seconds
            setTimeout(function () {
                console.error('Failsafe shutdown.');
                process.exit(1);
            }, 5000);

            // disconnect from the cluster
            var worker = require('cluster').worker;
            if (worker) worker.disconnect();

            // stop taking new requests
            server.close();

            try {
                // attempt to use Express error route
                next(err);
            } catch (error) {
                // if Express error route failed, try
                // plain Node response
                console.error('Express error mechanism failed.\n', error.stack);
                res.statusCode = 500;
                res.setHeader('content-type', 'text/plain');
                res.end('Server error.');
            }
        } catch (error) {
            console.error('Unable to send 500 response.\n', error.stack);
        }
    });

    // add the request and response objects to the domain
    domain.add(req);
    domain.add(res);

    // execute the rest of the request chain in the domain
    domain.run(next);
});

// logging
switch (app.get('env')) {
    case 'development':
        // compact, colorful dev logging
        app.use(require('morgan')('dev'));
        break;
    case 'production':
        // module 'express-logger' supports daily log rotation
        app.use(require('express-logger')({ path: __dirname + '/log/requests.log' }));
        break;
}

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
}));
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

// flash message middleware
app.use(function (req, res, next) {
    // if there's a flash message, transfer
    // it to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// set 'showTests' context property if the querystring contains test=1
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

// mocked weather data
function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)',
            },
        ],
    };
}

// middleware to add weather data to context
app.use(function (req, res, next) {
    if (!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weatherContext = getWeatherData();
    next();
});

app.get('/', function (req, res) {
    res.render('home');
});
app.get('/about', function (req, res) {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript: '/qa/tests-about.js'
    });
});
app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});
app.get('/jquery-test', function (req, res) {
    res.render('jquery-test');
});
app.get('/nursery-rhyme', function (req, res) {
    res.render('nursery-rhyme');
});
app.get('/data/nursery-rhyme', function (req, res) {
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
    });
});
app.get('/thank-you', function (req, res) {
    res.render('thank-you');
});
app.get('/newsletter', function (req, res) {
    res.render('newsletter');
});

// for now, we're mocking NewsletterSignup:
function NewsletterSignup() {
}
NewsletterSignup.prototype.save = function (cb) {
    cb();
};

// mocking product database
function Product() {
}
Product.find = function (conditions, fields, options, cb) {
    if (typeof conditions === 'function') {
        cb = conditions;
        conditions = {};
        fields = null;
        options = {};
    } else if (typeof fields === 'function') {
        cb = fields;
        fields = null;
        options = {};
    } else if (typeof options === 'function') {
        cb = options;
        options = {};
    }
    var products = [
        {
            name: 'Hood River Tour',
            slug: 'hood-river',
            category: 'tour',
            maximumGuests: 15,
            sku: 723,
        },
        {
            name: 'Oregon Coast Tour',
            slug: 'oregon-coast',
            category: 'tour',
            maximumGuests: 10,
            sku: 446,
        },
        {
            name: 'Rock Climbing in Bend',
            slug: 'rock-climbing/bend',
            category: 'adventure',
            requiresWaiver: true,
            maximumGuests: 4,
            sku: 944,
        }
    ];
    cb(null, products.filter(function (p) {
        if (conditions.category && p.category !== conditions.category) return false;
        if (conditions.slug && p.slug !== conditions.slug) return false;
        if (isFinite(conditions.sku) && p.sku !== Number(conditions.sku)) return false;
        return true;
    }));
};
Product.findOne = function (conditions, fields, options, cb) {
    if (typeof conditions === 'function') {
        cb = conditions;
        conditions = {};
        fields = null;
        options = {};
    } else if (typeof fields === 'function') {
        cb = fields;
        fields = null;
        options = {};
    } else if (typeof options === 'function') {
        cb = options;
        options = {};
    }
    Product.find(conditions, fields, options, function (err, products) {
        cb(err, products && products.length ? products[0] : null);
    });
};

var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

app.post('/newsletter', function (req, res) {
    var name = req.body.name || '', email = req.body.email || '';
    // input validation
    if (!email.match(VALID_EMAIL_REGEX)) {
        if (req.xhr) return res.json({ error: 'Invalid name email address.' });
        req.session.flash = {
            type: 'danger',
            intro: 'Validation error!',
            message: 'The email address you entered was  not valid.',
        };
        return res.redirect(303, '/newsletter/archive');
    }
    new NewsletterSignup({ name: name, email: email }).save(function (err) {
        if (err) {
            if (req.xhr) return res.json({ error: 'Database error.' });
            req.session.flash = {
                type: 'danger',
                intro: 'Database error!',
                message: 'There was a database error; please try again later.',
            };
            return res.redirect(303, '/newsletter/archive');
        }
        if (req.xhr) return res.json({ success: true });
        req.session.flash = {
            type: 'success',
            intro: 'Thank you!',
            message: 'You have now been signed up for the newsletter.',
        };
        return res.redirect(303, '/newsletter/archive');
    });
});
app.get('/newsletter/archive', function (req, res) {
    res.render('newsletter/archive');
});
app.get('/contest/vacation-photo', function (req, res) {
    var now = new Date();
    res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() });
});
app.post('/contest/vacation-photo/:year/:month', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});
app.get('/tours/:tour', function (req, res, next) {
    Product.findOne({ category: 'tour', slug: req.params.tour }, function (err, tour) {
        if (err) return next(err);
        if (!tour) return next();
        res.render('tour', { tour: tour });
    });
});
app.get('/adventures/:subcat/:name', function (req, res, next) {
    Product.findOne({ category: 'adventure', slug: req.params.subcat + '/' + req.params.name }, function (err, adventure) {
        if (err) return next(err);
        if (!adventure) return next();
        res.render('adventure', { adventure: adventure });
    });
});

var cartValidation = require('./lib/cartValidation.js');

app.use(cartValidation.checkWaivers);
app.use(cartValidation.checkGuestCounts);

app.post('/cart/add', function (req, res, next) {
    var cart = req.session.cart || (req.session.cart = { items: [] });
    Product.findOne({ sku: req.body.sku }, function (err, product) {
        if (err) return next(err);
        if (!product) return next(new Error('Unknown product SKU: ' + req.body.sku));
        cart.items.push({
            product: product,
            guests: req.body.guests || 0,
        });
        res.redirect(303, '/cart');
    });
});
app.get('/cart', function (req, res, next) {
    var cart = req.session.cart;
    if (!cart) next();
    res.render('cart', { cart: cart });
});
app.get('/cart/checkout', function (req, res, next) {
    var cart = req.session.cart;
    if (!cart) next();
    res.render('cart-checkout');
});
app.get('/cart/thank-you', function (req, res) {
    res.render('cart-thank-you', { cart: req.session.cart });
});
app.get('/email/cart/thank-you', function (req, res) {
    res.render('email/cart-thank-you', { cart: req.session.cart, layout: null });
});
app.post('/cart/checkout', function (req, res) {
    var cart = req.session.cart;
    if (!cart) next(new Error('Cart does not exist.'));
    var name = req.body.name || '', email = req.body.email || '';
    // input validation
    if (!email.match(VALID_EMAIL_REGEX)) return res.next(new Error('Invalid email address.'));
    // assign a random cart ID; normally we would use a database ID here
    cart.number = Math.random().toString().replace(/^0\.0*/, '');
    cart.billing = {
        name: name,
        email: email,
    };
    res.render('email/cart-thank-you',
        { layout: null, cart: cart }, function (err, html) {
            if (err) console.log('error in email template');
            emailService.send(cart.billing.email,
                'Thank you for booking your trip with Meadowlark Travel!',
                html);
        }
    );
    res.render('cart-thank-you', { cart: cart });
});

app.get('/epic-fail', function (req, res) {
    process.nextTick(function () {
        throw new Error('Kaboom!');
    });
});

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(3000, function () {
    console.log("express has started on port 3000");
});

module.exports = app;