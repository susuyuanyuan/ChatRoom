const users = [];

function addUser(id, name, room) {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const user = { id: id, name: name, room: room };
    console.log("adding user: " + user.id + ", " + user.name + "," + user.room);

    users.push(user);

    return user;
}

function removeUser(id) {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = { addUser, removeUser, getCurrentUser, getRoomUsers };