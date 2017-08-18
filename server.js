const express = require('express'),
      bodyParser = require('body-parser'),
      uc = require('./usersCtrl'),
      app = express(),
      port = 3000;

// ========= Top-Level Middleware ========= //
app.use(bodyParser.json());

// ========= Endpoints ========= //
app.get('/api/users', uc.getUsers);
app.get('/api/users/:id', uc.getUsers);
app.get('/api/admins', uc.getAdmins);
app.get('/api/nonadmins', uc.getNonAdmins);
app.get('/api/user_type/:user_type', uc.getUsersByType);

app.put('/api/users/:id', uc.updateUser);

app.post('/api/users', uc.addUser);

app.delete('/api/users/:id', uc.deleteUser);

// ========= Server Listening ========= //
app.listen(port, () => `I'm listening on port ` + port);