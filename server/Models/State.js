/**
 * State 
 * 
 *      id      int     (primary key)
 *      title   String
 */

module.exports = (sequelize, DataTypes) => {
    const State = sequelize.define('State', {
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
    })

    State.associate = (models) => {
        State.hasMany(models.Ticket, { foreignKey: 'id_state' });
    }

    return State;
};