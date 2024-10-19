import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const ProfileTitle = styled.h2`
  margin-bottom: 20px;
`;

const ProfileDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }

  strong {
    font-weight: bold;
    color: #333;
  }

  span {
    color: #555;
  }
`;

const EditButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
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
  margin-top: 20px;

  &:hover {
    background-color: #5a6268;
  }
`;

// container style
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
  max-width: 400px;
  margin: 20px auto;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user; // Recupera as informações do usuário
  
  const [profile, setProfile] = useState(user || null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    id_department: user?.id_department || ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/api/profile?id=${user.id}`);
        setProfile(response.data);
        setFormData({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
          id_department: response.data.id_department
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/profile', formData);
      setProfile(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileTitle>Profile</ProfileTitle>
        {isEditing ? (
          <FormContainer>
            <p>Name:</p>
            <FormInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <p>Email:</p>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <p>Password:</p>
            <FormInput
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <p>Department ID:</p>
            <FormInput
              type="text"
              name="id_department"
              value={formData.id_department}
              onChange={handleInputChange}
              placeholder="Department ID"
            />
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </FormContainer>
        ) : (
          <div>
            <ProfileDetail><strong>Name:</strong> {profile.name}</ProfileDetail>
            <ProfileDetail><strong>Email:</strong> {profile.email}</ProfileDetail>
            <ProfileDetail><strong>Password:</strong> {profile.password}</ProfileDetail>
            <ProfileDetail><strong>Department ID:</strong> {profile.id_department}</ProfileDetail>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
          </div>
        )}
      </ProfileCard>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
    </ProfileContainer>
  );
};

export default Profile;