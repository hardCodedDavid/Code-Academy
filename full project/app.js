var express = require('express');
var multer = require('multer'),
  bodyParser = require('body-parser'),
  path = require('path');
var mongoose = require('mongoose');
var Detail = require('./module/detail');
var fs = require('fs');
var dir = './uploads';
/*var upload = multer({ dest: 'uploads/' });*/
mongoose.connect('mongodb+srv://Smart:smartboy@cluster0.quoin.mongodb.net/node-app?retryWrites=true&w=majority',   { useNewUrlParser: true,  useUnifiedTopology: true } );


var upload = multer({
  storage: multer.diskStorage({

    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, './uploads');
    },
    filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }

  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(/*res.end('Only images are allowed')*/ null, false)
    }
    callback(null, true)
  }
});

var app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('uploads'));


// routes

app.get('/', (req, res) => {
  Detail.find().sort({ added_date: -1 })
.then((result) => {
  res.render('index', { data: result });
})
.catch((err) =>{
  console.log(err);
})
});
app.get('/create', (req, res) => {
    res.render('create')
});

app.get('/all', (req, res) => {
  Detail.find().sort({ added_date: -1 })
.then((result) => {
  res.render('all', { data: result });
})
.catch((err) =>{
  console.log(err);
})
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  Detail.findById(id)
  .then((result) => {
    res.render('edit',  { data: result })
  })
  .catch((err) => {
    console.log(err)
  })
})


// post request
app.post('/', upload.any(), (req, res) => {

  if (!req.body && !req.files) {
    res.json({ success: false });
  } else {
    var c;
    Detail.findOne({}, (err, data) => {
      // console.log("into detail");

      if (data) {
        c = data.unique_id + 1;
      } else {
        c = 1;
      }

      var detail = new Detail({

        unique_id: c,
        Title: req.body.name,
        Description: req.body.description,
        Price: req.body.price,
        img: req.files[0] && req.files[0].filename ? req.files[0].filename : '',
      });

      detail.save((err, Person) => {
        if (err)
          console.log(err);
        else
          res.redirect('/');

      });

    }).sort({ _id: -1 }).limit(1);

  }
});



// update request
app.post('/edit/:id', upload.any(), (req, res) => {

  if (!req.body && !req.files) {
    res.json({ success: false });
  } else {
    var c;
    Detail.findOne({}, (err, data) => {
      // console.log("into detail");

      if (data) {
        c = data.unique_id + 1;
      } else {
        c = 1;
      }

      var detail = {}({

        unique_id: c,
        Title: req.body.name,
        Description: req.body.description,
        Price: req.body.price,
        img: req.files[0] && req.files[0].filename ? req.files[0].filename : '',
      });

      Detail.update((err, Person) => {
        if (err)
          console.log(err);
        else
          res.redirect('/');

      });

    })

  }
});


// delete request

app.post('/delete', (req, res) => {

  Detail.findByIdAndRemove(req.body.prodId, (err, data) => {

    console.log(data);

  })
  res.redirect('/');
});
// pakages Detail
app.get('/package/:id', (req, res) => {
  const id = req.params.id;
  Detail.findById(id)
  .then((result) => {
    res.render('package',  { data: result })
  })
  .catch((err) => {
    console.log(err)
  })
})






var port = 2000;
app.listen(port, () => { console.log('listening on port ' + port);});
