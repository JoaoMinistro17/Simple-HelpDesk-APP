import React, { useEffect, useState }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { useAuth } from '../Components/Auth/AuthContext';
import { 
  Container,
  Header,
  Title,
  Button,
  TicketList,
  TicketItem,
  TicketTitle,
  TicketDetails,
  PopupOverlay,
  PopupContent,
  PopupDetails,
  CloseButton,
  LogoutButton,
  CreateTicketButton,
  ViewProfileButton,
  FilterContainer,
  FilterInput,
  FilterCheckboxContainer,
  FilterCheckbox,
  FilterLabel,
} from './StyledComponents';

const Home = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd \'at\' HH:mm:ss');
  };

  const navigate = useNavigate();
  const location = useLocation();

  const [tickets, setTickets] = useState([]);
  const [states, setStates] = useState([]);
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [hoveredTicket, setHoveredTicket] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [selectedStates, setSelectedStates] = useState([]);
  const [textFilter, setTextFilter] = useState('');

  const { user, login } = useAuth(); // Use the useAuth hook to get the user

  // Update the user data if available in location state
  useEffect(() => {
    if (location.state?.user) {
      login(location.state.user);
    }
  }, [location.state, login]);


  useEffect(() => {
    // Fetch data from APIs
    const fetchData = async () => {
      try {
        const [ticketsRes, statesRes, usersRes, departmentsRes] = await Promise.all([
          axios.get('/api/tickets'),
          axios.get('/api/states'),
          axios.get('/user'),
          axios.get('/api/departments')
        ]);
        setTickets(ticketsRes.data);
        setStates(statesRes.data);
        setUsers(usersRes.data);
        setDepartments(departmentsRes.data);

        // Atualiza o estado do user com os dados obtidos
        if (location.state?.user) {
          const updatedUser = usersRes.data.find(u => u.id === location.state.user.id);
          login(updatedUser);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.state?.user, login]);

  const openPopup = (ticket) => {
    setSelectedTicket(ticket);
  };
  const closePopup = () => {
    setSelectedTicket(null);
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleLogoutClick = () => {
    navigate('/login', { state: { user: null } });
  };
  const handleCreateTicketClick = () => {
    navigate('/create-ticket', { state: { user } });
  };
  const handleViewProfileClick = () => {
    navigate('/profile', { state: { user } });
  };
  const handleEditClick = () => {
    navigate('/edit-ticket', { state: { ticket: selectedTicket, user } });
  };

  // get the state title with the id
  const stateTitle = states.reduce((acc, state) => {
    acc[state.id] = state.title;
    return acc;
  }, {});

  // get the department title with the id
  const departmentTitle = departments.reduce((acc, department) => {
    acc[department.id] = department.title;
    return acc;
  }, {});

  // Filtrar por departamento, se é ou não admin e se o ticket foi criado pelo user
  const filteredTickets = tickets.filter(
    ticket => ticket.id_department === user?.id_department ||  // se o user for do mesmo departamento
    user?.admin ||                                             // ou se for admin
    ticket.created_by === user?.id                             // ou se o próprio user criou o ticket
  );

  const handleStateFilterChange = (stateId) => {
    setSelectedStates((prevSelectedStates) =>
      prevSelectedStates.includes(stateId)
        ? prevSelectedStates.filter((id) => id !== stateId)
        : [...prevSelectedStates, stateId]
    );
  };

  const handleTextFilterChange = (e) => {
    setTextFilter(e.target.value);
  };

  const finalFilteredTickets = filteredTickets.filter((ticket) => {
    const matchesState = selectedStates.length === 0 || selectedStates.includes(ticket.id_state);
    const matchesText = textFilter === '' || ticket.title.toLowerCase().includes(textFilter.toLowerCase());
    return matchesState && matchesText;
  });

  return (
    <Container>
    {/* Header com botões de View Profile, Create Ticket e Logout */}
    <Header>
      <ViewProfileButton onClick={handleViewProfileClick}>View Profile</ViewProfileButton>   
      <CreateTicketButton onClick={handleCreateTicketClick}>Create Ticket</CreateTicketButton>       
      {user ? (
        <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
      ) : (
        <Button onClick={handleLoginClick}>Login</Button>
      )}
    </Header>

    <Title>Hi, {user ? user.name : 'you are not logged in!'}
      {/* Subtitle pode ser removido, mostra apenas todas as informações do user para facilitar os testes
      <Subtitle>
        {user && (
          <div>
            <p>User ID: {user.id}</p>
            <p>Is Admin: {user.admin ? 'True' : 'False'}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>Department ID: {user.id_department}</p>
          </div>
        )}
      </Subtitle>
        */}
    </Title>
    {/* Filtro */}
    <FilterContainer>
        <FilterInput 
          type="text" 
          placeholder="Ticket Name" 
          value={textFilter} 
          onChange={handleTextFilterChange} 
        />
        {states.map((state) => (
          <FilterCheckboxContainer key={state.id}>
            <FilterCheckbox
              type="checkbox"
              checked={selectedStates.includes(state.id)}
              onChange={() => handleStateFilterChange(state.id)}
            />
            <FilterLabel>{state.title}</FilterLabel>
          </FilterCheckboxContainer>
        ))}
      </FilterContainer>

    {/* Lista de tickets */}
    <TicketList>
      {finalFilteredTickets.map((ticket) => (
        <TicketItem 
          key={ticket.id}
          onMouseEnter={() => setHoveredTicket(ticket.id)}
          onMouseLeave={() => setHoveredTicket(null)}
          onClick={() => openPopup(ticket)}
          style={{ 
            color: 'white',
            backgroundColor: hoveredTicket === ticket.id ? '#d0f0f5' : 'white',
          }}
        >
          <TicketTitle>{ticket.title}</TicketTitle>
          <TicketDetails><strong>Created in:</strong> {new Date(ticket.createdAt).toLocaleDateString()}</TicketDetails>
          <TicketDetails><strong>Last update:</strong> {new Date(ticket.updatedAt).toLocaleDateString()}</TicketDetails>
          <TicketDetails><strong>Department:</strong> {ticket.id_department} ({departmentTitle[ticket.id_department]}) </TicketDetails>
          <TicketDetails><strong>State:</strong> {stateTitle[ticket.id_state]}</TicketDetails>
        </TicketItem>
      ))}
    </TicketList>

    {/* Popup com detalhes do ticket e com botão de editar */}
    {selectedTicket && (
      <PopupOverlay>
        <PopupContent>
          <CloseButton onClick={closePopup}>&times;</CloseButton>
          <h2>{selectedTicket.title}</h2>
          <PopupDetails><strong>Description:</strong> {selectedTicket.description}</PopupDetails>
          <PopupDetails><strong>Created by:</strong> {users.find(user => user.id === selectedTicket.created_by)?.name}</PopupDetails>
          <PopupDetails><strong>Last Updated by:</strong> {users.find(user => user.id === selectedTicket.updated_by)?.name}</PopupDetails>
          <PopupDetails><strong>Department:</strong> {selectedTicket.id_department} ({departmentTitle[selectedTicket.id_department]})</PopupDetails>
          <PopupDetails><strong>Created Date:</strong> {formatDate(selectedTicket.createdAt)}</PopupDetails>
          <PopupDetails><strong>Last Updated Date:</strong> {formatDate(selectedTicket.updatedAt)}</PopupDetails>
          <PopupDetails><strong>State:</strong> {stateTitle[selectedTicket.id_state]}</PopupDetails>
          
          {/* Caso o estado seja recusado mostra o parametro observações */}
          {selectedTicket.id_state === states[1].id && (
            <PopupDetails><strong>Observations:</strong> {selectedTicket.observations}</PopupDetails>
          )}

          {/* Caso o estado não seja recusado ou finalizado, nem criado pelo mesmo user a não ser que seja admin, não permite editar */}
          {(selectedTicket.id_state !== states[1].id && 
            selectedTicket.id_state !== states[3].id &&
            (selectedTicket.created_by !== user.id || user.admin)) && (
                <Button onClick={handleEditClick}>Edit</Button>
          )}
        </PopupContent>
      </PopupOverlay>
    )}
  </Container>
  );
};

export default Home;