import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import { 
  Container,
  TicketContainer,
  TicketTitle,
  TicketInput,
  TicketTextarea,
  TicketSelect,
  SaveButton,
  BackButton
} from './StyledComponents';

const EditTicket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialTicket = location.state?.ticket || null;
  const user = location.state?.user || '';

  /* Initial ticket é o ticket antes da edição */
  const [ticket, setTicket] = useState(initialTicket);
  const [formData, setFormData] = useState({
    title: initialTicket?.title || '',
    description: initialTicket?.description || '',
    created_by: initialTicket?.created_by || '',
    updated_by: initialTicket?.updated_by || '',
    id_department: initialTicket?.id_department || '',
    createdAt: initialTicket?.createdAt || '',
    updatedAt: initialTicket?.updatedAt || '',
    id_state: initialTicket?.id_state || '',
    observations: initialTicket?.observations || ''
  });

  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`/api/ticket?id=${initialTicket.id}`);
        setTicket(response.data);
        setFormData({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          created_by: response.data.created_by,
          updated_by: response.data.updated_by,
          id_department: response.data.id_department,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          id_state: response.data.id_state,
          observations: response.data.observations
        });
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await axios.get('/api/states');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    if (initialTicket) {
      fetchTicket();
    }
    fetchStates();
  }, [initialTicket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    // Verificação do estado e das observações
    if (formData.id_state === '2' && (formData.observations || null) === null) {
      alert('Observations are required when rejecting a ticket.');
      return;
    }

    try {
      // ULTIMO EDIT PARA O NOME DO LOGGED IN USER FICAR 
      formData.updated_by = user.id;
      const response = await axios.put(`/api/ticket`, formData);
      setTicket(response.data);
      navigate(-1);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }

  };

  if (!initialTicket) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
    <TicketContainer>
      <TicketTitle>Edit Ticket</TicketTitle>
      <TicketInput
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        readOnly
      />
      <TicketTextarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        rows="5"
        readOnly
      />
      <TicketInput
        type="text"
        name="id_department"
        value={formData.id_department}
        onChange={handleInputChange}
        placeholder="Department ID"
        readOnly
      />
      <TicketSelect
        name="id_state"
        value={formData.id_state}
        onChange={handleInputChange}
      >
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.title}
          </option>
        ))}
      </TicketSelect>
      {formData.id_state === '2' && (
        <TicketTextarea
          name="observations"
          value={formData.observations}
          onChange={handleInputChange}
          placeholder="Observations"
          rows="5"
        />
      )}
      
      <SaveButton onClick={handleSave}>Save</SaveButton>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
    </TicketContainer>
    </Container>
  );
};

export default EditTicket;