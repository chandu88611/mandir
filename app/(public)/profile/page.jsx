"use client"
import React from 'react';
import { Avatar, TextField, Button, List, ListItem, ListItemIcon, ListItemText, Typography, Box, IconButton } from '@mui/material';
import { MdPerson, MdReceipt, MdLocationOn, MdLogout, MdEdit } from 'react-icons/md';
import styled from 'styled-components';

const ProfileMenu = styled.div`
  min-width: 200px;
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileContent = styled.div`
  flex: 1;
  padding: 32px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfilePage = () => {
  return (
    <div className="flex flex-col md:flex-row p-4 md:p-10 space-y-4 md:space-y-0 md:space-x-4 mt-10">
      <ProfileMenu>
        <List>
          <ListItem button selected>
            <ListItemIcon>
              <MdPerson className="text-orange-500" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MdReceipt />
            </ListItemIcon>
            <ListItemText primary="Order Transaction" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MdLocationOn />
            </ListItemIcon>
            <ListItemText primary="Address" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MdLogout className="text-orange-500" />
            </ListItemIcon>
            <ListItemText primary="Log-Out" />
          </ListItem>
        </List>
      </ProfileMenu>
      <ProfileContent>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h6" component="h1">
            Personal Information
          </Typography>
          <IconButton className="text-orange-500">
            <MdEdit />
            <Typography className="ml-1">Edit</Typography>
          </IconButton>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                className="bg-gray-100"
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                className="bg-gray-100"
              />
            </div>
            <TextField
              label="Mobile No"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              className="bg-gray-100"
              defaultValue="8861151876"
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              className="bg-gray-100"
            />
          </div>
        </div>
      </ProfileContent>
    </div>
  );
};

export default ProfilePage;
