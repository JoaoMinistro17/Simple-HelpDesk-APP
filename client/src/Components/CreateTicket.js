import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Container, 
    TicketContainer, 
    TicketTitle, 
    TicketInput, 
    TicketTextarea, 
    TicketSelect, 
    SaveButton, 
    BackButton} 
from './StyledComponents';

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id_department, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || '';


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/tickets', {
        title,
        description,
        id_department,
        created_by: user.id,
        updated_by: null,
        id_state: 1,
      });
      console.log('Ticket added:', response.data);
      navigate(-1); // Redireciona para a página anterior (Home)
    } catch (error) {
      console.error('Error adding ticket:', error);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }
  , []);

  return (
    <Container>
      <TicketContainer>
        <TicketTitle>Create Ticket</TicketTitle>
          <TicketInput
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TicketTextarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TicketSelect
            name="id_department"
            value={id_department}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                  {department.title}
              </option>
            ))}
          </TicketSelect>
          <SaveButton onClick={handleSubmit}>Create Ticket</SaveButton>
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      </TicketContainer>
    </Container>
  );
};

export default CreateTicket;