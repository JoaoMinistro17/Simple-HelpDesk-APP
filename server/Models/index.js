const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // SQLite database file
});

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Department = require('./Department')(sequelize, Sequelize.DataTypes);
const Ticket = require('./Ticket')(sequelize, Sequelize.DataTypes);
const State = require('./State')(sequelize, Sequelize.DataTypes);

// Store models in an object
const models = { User, Department, Ticket, State };

// Configure associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

// Sync database
sequelize.sync({ force: true }) // Recreate the tables
    .then(() => {
        console.log('\n Database & tables created! \n');
    })
    .catch(error => {
        console.error('\n Error creating database: \n', error);
    });


module.exports = { sequelize, ...models };