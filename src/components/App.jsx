import { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

import { AppContainer } from 'App.styled';

export function App() {
  const [query,setQuery] = useState('');
  
 
  const handleFormSubmit = query => {
    setQuery(query);
  };
    return (
      <AppContainer>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery query={query} />
        <ToastContainer autoClose={3000} theme="colored"/>
      </AppContainer>
    );
  }

