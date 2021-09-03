// import packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const Room = require('./module/Room');
const Subject = require('./module/Subject');

// database
const dbURI = 'mongodb+srv://Smart:smartboy@cluster0.quoin.mongodb.net/Sandiv?retryWrites=true&w=majority';
mongoose.connect(dbURI,  { useNewUrlParser: true,  useUnifiedTopology: true } );

// views
app.set('view engine', 'ejs');

// public
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ======   ROUTES   ======= //

// ======   GET   ======= //
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  Room.find().sort({ added_date: -1 })
  .then((result) => {
  res.render('dashboard', { data: result });
  })
  .catch((err) => {
    console.log(err)
  })
});


app.get('/create-room', (req, res) => {
  res.render('create-room')
})

// app.get('/room/:id/add-subject', (req, res) => {
//   const id = req.params.id
//   Room.findById(id)
//   .then((result) => {
//   res.render('add-subject', { datas: result });
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// })

app.get('/room/:id', (req, res) => {
  const id = req.params.id
  Room.findById(id)
  .then((result) => {
    res.render('room', { datas: result })
  })
  .catch((err) => {
    console.log(err)
  })
})



// ======   POST   ======= //

app.post('/dashboard', (req, res) => {
  const room = new Room(req.body);
  room.save()
  .then((result) => {
    res.redirect('/dashboard');
    console.log(req.body + "Created Successfully");
  })
  .catch((err) => {
    console.log(err);
  })
});




 app.post('/room/comment/:id', (req, res) => {
   const comment = new Room(req.body);
   var id = req.param('id');
   comment.save()
   .then((result) => {
     res.redirect('/room/' + id);
     console.log(req.body + "Created Successfully");
   })
   .catch((err) => {
     console.log(err);
   })
});






// app.post('/room/:id', (req, res) => {
//    const subject = new Subject(req.body);
//    subject.save()
//    .then((result) => {
//     res.redirect('/dashboard');
//      console.log(req.body);
//    })
//    .catch((err) => {
//      console.log(err)
//    })
// })


// delete request

app.post('/delete', (req, res) => {

  Room.findByIdAndRemove(req.body.prodId, (err, data) => {

    console.log(data + "" + "Deleted Successfuly");

  })
  res.redirect('/dashboard');
});



























































































































































var port = 4040;
app.listen(port, () => { console.log('listening on port ' + port);});
