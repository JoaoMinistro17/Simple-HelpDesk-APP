const express = require('express');
const bodyParser = require('body-parser');
const { seedDatabase } = require('./seed');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const { User, Department, Ticket, State } = require('./Models'); // Import the User model

const userController = require('./Controllers/userController');

const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Import seed function from seed.js and seed the database with demo data
seedDatabase();

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);

// Authentication route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (password !== user.password) { 
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    //Retrieving all user data
    res.json({ 
      success: true, 
      user: { 
          id: user.id,
          admin: user.admin,
          name: user.name, 
          email: user.email, 
          password: user.password, 
          id_department: user.id_department,   
      }
    });
});

// get user
app.get('/user/:id', userController.getUser);

// update user
app.put('/user/:id', userController.updateUser);

// return all users
app.get('/user', userController.getAllUsers);

// Return models from models/index.js
app.get('/api', async (req, res) => {
    const users = await User.findAll();
    const departments = await Department.findAll();
    const tickets = await Ticket.findAll();
    const states = await State.findAll();

    res.json({ users, departments, tickets, states });
});

// get ticket
app.get('/api/ticket', async (req, res) => {
  const ticketId = req.query.id;

  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// update ticket
app.put('/api/ticket', async (req, res) => { 
  const { id, title, description, created_by, updated_by, id_department, id_state, observations } = req.body;
  const ticket = await Ticket.findByPk(id);

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  // Atualizar os campos do ticket
  ticket.title = title;
  ticket.description = description;
  ticket.created_by = created_by;
  ticket.updated_by = updated_by;
  ticket.id_department = id_department;
  ticket.id_state = id_state;
  ticket.observations = observations;

  await ticket.save();

  // Retornar os dados do ticket atualizados
  res.json(ticket);

});

// Create a new ticket
app.post('/api/tickets', async (req, res) => {
  try{
    const { title, description, id_department, created_by, updated_by, id_state } = req.body;

    const newTicket = await Ticket.create({ 
      title, 
      description,
      id_department, 
      created_by,
      updated_by,
      id_state,   
    });

    res.json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Return all tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Return all states
app.get('/api/states', async (req, res) => {
    try {
      const states = await State.findAll();
      res.json(states);
    } catch (error) {
      console.error('Error fetching states:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Return all departments
app.get('/api/departments', async (req, res) => {
    try {
      const departments = await Department.findAll();
      res.json(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});