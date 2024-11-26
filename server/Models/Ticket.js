/**
 * Ticket 
 * 
 *      id              int     (primary key)
 *      title           String
 *      description     String
 *      created_at      Date
 *      updated_at      Date
 *      created_by      String  (foreign key)    
 *      updated_by      String  (foreign key)
 *      id_state        int     (foreign key)
 *      observations     String
 * 
 */

module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //created_at: DataTypes.DATE,
        //updatedAt: DataTypes.DATE,
        created_by: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },                                                                                  
        updated_by: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        id_state: {
            type: DataTypes.INTEGER,
            references: {
                model: 'States',
                key: 'id'
            }
        }, 
        observations: DataTypes.STRING,

        id_department: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Departments',
                key: 'id'
            }
        }
    });

    Ticket.associate = function(models) {
        Ticket.belongsTo(models.User, { foreignKey: 'created_by' });
        Ticket.belongsTo(models.User, { foreignKey: 'updated_by' });
        Ticket.belongsTo(models.State, { foreignKey: 'id_state' });
        Ticket.belongsTo(models.Department, { foreignKey: 'id_department' });
    };

    return Ticket;
};