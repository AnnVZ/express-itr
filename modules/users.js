const { Model } = require('objection');
var knex = require('knex')({
    client: 'mysql',
    connection: {
        database: 'User'
    }
});
Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'User';
    }
}

exports.getUser = async function (username) {
    let user = await User.query().findOne({
        name: username
    });
    return user;
}

exports.findUser = async function (id) {
    let user = await User.query().findById(id);
    return user;
}

exports.updateUserLoginDate = async function (username) {
    await User.query()
        .patch({ logindate: new Date() })
        .where('name', username);
}

exports.insertUser = async function (username, password, email) {
    await User.query().insert({
        name: username,
        password: password,
        email: email,
        regdate: new Date(),
        logindate: new Date()
    });
}

exports.getAllUsers = async function () {
    let users = await User.query();
    return users;
}

exports.blockUser = async function (id, block) {
    await User.query()
        .patch({ blocked: (block ? 1 : 0) })
        .where('id', id);
}

exports.deleteUser = async function (id) {
    await User.query()
        .deleteById(id);
}