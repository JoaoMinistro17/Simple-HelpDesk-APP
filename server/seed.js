/**
 * Ficheiro que insere dados na base de dados para demonstração
 * 
 *  Admin user : email - john@doe.com, password - password
 *  Normal user: email - jane@doe.com, password - password
 * 
 */

const { sequelize, User, Department, Ticket, State } = require('./Models');

async function seedDatabase() {
    try {
        // Aguarda a sincronização da base de dados
        await sequelize.sync({ force: true });

        // Create States
        const states = await State.bulkCreate([
            { title: 'Pending' },
            { title: 'Rejected' },
            { title: 'Undergoing treatment' },
            { title: 'Finished' }
        ]);

        // Create Departments
        const departments = await Department.bulkCreate([
            { title: 'IT' },
            { title: 'HR' },
            { title: 'Finance' },
            { title: 'Marketing' },
            { title: 'Sales' },
            { title: 'Customer Support' }
        ]);

        // Create Users
        const users = await User.bulkCreate([
            {
                name: 'John Doe',
                email: 'john@doe.com',
                password: 'password',
                id_department: departments[0].id, // IT
                admin: 1
            },
            {
                name: 'Jane Doe',
                email: 'jane@doe.com',
                password: 'password',
                id_department: departments[1].id, // HR
                admin: 0
            },
            {
                name: 'Alice Smith',
                email: 'alice@smith.com',
                password: 'password',
                id_department: departments[2].id, // Finance
                admin: 0
            },
            {
                name: 'Bob Johnson',
                email: 'bob@johnson.com',
                password: 'password',
                id_department: departments[3].id, // Marketing
                admin: 0
            },
            {
                name: 'Charlie Brown',
                email: 'charlie@brown.com',
                password: 'password',
                id_department: departments[4].id, // Sales
                admin: 0
            },
            {
                name: 'David Wilson',
                email: 'david@wilson.com',
                password: 'password',
                id_department: departments[5].id, // Customer Support
                admin: 0
            }
        ]);

        // Create Tickets
        const tickets = await Ticket.bulkCreate([
            {
                title: 'Issue with computer',
                description: 'The computer is not turning on.',
                id_state: states[0].id, // Pendente
                id_department: departments[0].id, // IT
                created_by: users[0].id,
                updated_by: null
            },
            {
                title: 'Payroll issue',
                description: 'Salary not credited.',
                id_state: states[2].id, // Em tratamento
                id_department: departments[1].id, // Finance
                created_by: users[1].id,
                updated_by: null
            },
            {
                title: 'Marketing campaign',
                description: 'Need approval for the new campaign.',
                id_state: states[1].id, // Recusado
                id_department: departments[2].id, // Marketing
                created_by: users[1].id,
                updated_by: null,
                observations: 'Budget exceeded'
            },
            {
                title: 'Sales report',
                description: 'Monthly sales report is missing.',
                id_state: states[0].id, // Pendente
                id_department: departments[3].id, 
                created_by: users[0].id,
                updated_by: null
            },
            {
                title: 'Customer complaint',
                description: 'Customer is unhappy with the service.',
                id_state: states[0].id, // Pendente
                id_department: departments[4].id, // Sales
                created_by: users[0].id,
                updated_by: null,
            },
            {
                title: 'System upgrade',
                description: 'Upgrade the system to the latest version',
                created_by: users[0].id,
                updated_by: users[0].id,
                id_department: departments[0].id, // IT
                id_state: states[3].id, // Finalizado
            },
            {
                title: 'HR policy update',
                description: 'Update the HR policies for the new year',
                created_by: users[1].id,
                updated_by: users[1].id,
                id_department: departments[1].id, // HR
                id_state: states[2].id, // Em tratamento
            },
            {
                title: 'Sales report',
                description: 'Generate the sales report for Q1',
                created_by: users[2].id,
                updated_by: users[2].id,
                id_department: departments[4].id, // Sales
                id_state: states[3].id, // Finalizado
            },
            {
                title: 'New hire onboarding',
                description: 'Onboard new hires for the IT department',
                created_by: users[0].id,
                updated_by: users[0].id,
                id_department: departments[1].id, // HR
                id_state: states[0].id, // Pendente
            },
            {
                title: 'Budget planning',
                description: 'Plan the budget for the next fiscal year',
                created_by: users[1].id,
                updated_by: users[1].id,
                id_department: departments[2].id, // Finance
                id_state: states[1].id, // Recusado
                observations: 'Awaiting approval'
            },
            {
                title: 'Product feedback',
                description: 'Collect feedback from customers on the new product',
                created_by: users[3].id,
                updated_by: users[3].id,
                id_department: departments[3].id, // Marketing
                id_state: states[2].id, // Em tratamento    
            }
        ]);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

module.exports = { seedDatabase };