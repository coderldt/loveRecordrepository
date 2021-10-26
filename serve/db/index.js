const mongoose = require('mongoose');
mongoose.connect('mongodb://180.76.173.85/loveRecords');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('连接成功');
})
