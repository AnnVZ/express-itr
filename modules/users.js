const { Model } = require('objection');
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'us-cdbr-east-05.cleardb.net',
        user: 'b890026df36bca',
        password: 'b94340b1',
        database: 'heroku_fa70a7707ac7df3'
    }
});
Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'User';
    }
}

exports.createSchema = async function () {
    if (await knex.schema.hasTable('User')) {
        return;
    }
    await knex.schema.createTable('User', table => {
        table.increments('id').primary();
        table.string('name').unique();
        table.string('email');
        table.string('password');
        table.date('regdate');
        table.date('logindate');
        table.string('blocked');
    });
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
        logindate: new Date(),
        blocked: 0
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