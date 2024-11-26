import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  overflow-y: auto; /* Adiciona rolagem vertical se necessário */
  min-height: 100vh;
  background-color: #138496;
  background-image: linear-gradient(315deg, #138496 0%, #102a6e 74%);
`;


const Header = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
`;


const Title = styled.h1`
  font-size: 2rem;
  color: white;
  position: absolute;
  margin-left: 50px;
  margin-top: 0px;
`;

const Subtitle = styled.h2`
  font-size: 0.8rem;
  color: #666;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutButton = styled(Button)`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const CreateTicketButton = styled(Button)`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #17a2b8;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    background-color: #138496;
  }
`;

const ViewProfileButton = styled(Button)`
  background-color: #17a2b8;
  margin-right: 20px;

  &:hover {
    background-color: #138496;
  }
`;

const TicketList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  list-style-type: none;
  margin-left: 150px;
  margin-bottom 20px;
  margin-right: 150px;
  padding: 20px;
`;

const TicketItem = styled.div`
  background: 'transparent';
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 15px;
`;

const TicketTitle = styled.h3`
  color: #333;
`;

const TicketDetails = styled.p`
  margin: 5px 0;
  color: #666;
`;

// Componentes estilizados
const TicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 500px;
  margin: 20px auto;
  margin-top: 200px;
`;

const TicketInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const TicketTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;
`;

const TicketSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const PopupOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1000;
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
`;

const PopupDetails = styled.p` 
  
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-top: 60px;
  margin-left: 400px;
  margin-right: 400px;
`;

const FilterInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const FilterCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const FilterCheckbox = styled.input`
  margin-right: 10px;
`;

const FilterLabel = styled.label`
  font-size: 16px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #6c757d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;

  &:hover {
    background-color: #5a6268;
  }
`;

export {
  Container,
  Header,
  Title,
  Subtitle,
  Button,
  LogoutButton,
  CreateTicketButton,
  TicketList,
  TicketItem,
  TicketTitle,
  TicketDetails,
  PopupOverlay,
  PopupContent,
  PopupDetails,
  CloseButton,
  ViewProfileButton,
  FilterContainer,
  FilterInput,
  FilterCheckboxContainer,
  FilterCheckbox,
  FilterLabel,
  TicketContainer,
  TicketInput,
  TicketTextarea,
  TicketSelect,
  SaveButton, 
  BackButton
};