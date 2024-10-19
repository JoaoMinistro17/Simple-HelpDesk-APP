/**
 * Department 
 * 
 *      id      int     (primary key)
 *      title   String
 */

module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false // Disable timestamps
    });

    Department.associate = function(models) {
        Department.hasMany(models.User, { foreignKey: 'id_department' });
        Department.hasMany(models.Ticket, { foreignKey: 'id_department' });
    };

    return Department;
};