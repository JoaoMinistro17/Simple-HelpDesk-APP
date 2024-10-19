/**
 * Utilizador 
 * 
 *      id              int     (primary key)
 *      name            String
 *      email           String
 *      password        String
 *      id_department   int     (foreign key)
 *      admin           int
 */

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_department: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Departments',
                key: 'id'
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false // Disable timestamps
    })

    User.associate = function(models) {
        User.belongsTo(models.Department, { foreignKey: 'id_department' })
        User.hasMany(models.Ticket, { foreignKey: 'created_by' });
        User.hasMany(models.Ticket, { foreignKey: 'updated_by' });
        
    }

    return User
};