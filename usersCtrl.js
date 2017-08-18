let users = require('./userData.json');
let id = users.length + 1;

module.exports = {
    getUsers: (req, res, next) => {
        let filteredUsers = users.slice(0);

        if(req.query.age) {
            filteredUsers = filteredUsers.filter((e) => {
                if (e.age < +req.query.age) return e;
            })
        } else if (req.query.lastname) {
            filteredUsers = filteredUsers.filter((e) => {
                if (e.last_name.toLowerCase() === req.query.lastname.toLowerCase()) return e;
            })
        } else if (req.query.email) {
            filteredUsers = filteredUsers.filter((e) => {
                if (e.email === req.query.email) return e;
            })
        } else if (req.query.favorites) {
            filteredUsers = filteredUsers.filter((e) => {
                if (e.favorites.includes(req.query.favorites)) return e;
            })
        }

        if(req.params.id) {
            
            let selectedUser = filteredUsers.findIndex( user => user.id === +req.params.id);
            
            if (selectedUser !== -1 ) {
                res.status(200).send(filteredUsers[selectedUser]);
            } else {
                res.status(404).json(null);
            }
        } else {
            res.status(200).send(filteredUsers)
        }
   
    },
    getAdmins: (req, res, next) => {
        let admins = users.slice(0);
        admins = admins.filter((e) => {
            if (e.type === "admin") return e;
        });
        res.status(200).send(admins)
    },
    getNonAdmins: (req, res, next) => {
        let nonAdmins = users.slice(0);
        nonAdmins = nonAdmins.filter((e) => {
            if (e.type !== "admin") return e;
        });
        res.status(200).send(nonAdmins)
    },
    getUsersByType: (req, res, next) => {
        let usersOfType = users.slice(0);
        if(req.params.user_type)
        usersOfType = usersOfType.filter((e) => {
            if (e.type === req.params.user_type) return e;
        });
        res.status(200).send(usersOfType)
    },
    updateUser: (req, res, next) => {
        let selectedUser = users.findIndex( user => user.id === +req.params.id);
        users[selectedUser] = Object.assign(users[selectedUser], req.body)
        res.status(200).send(users);
    },
    addUser: (req, res, next) => {
        users.push(Object.assign(req.body, {id}));
        id++;
        res.status(200).send(users);
    },
    deleteUser: (req, res, next) => {
        users = users.filter((e) => {
            if (e.id !== +req.params.id) return e;
        });
        res.status(200).send(users);
    }
}