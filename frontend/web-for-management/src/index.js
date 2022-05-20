import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import BikeCategories from './Modules/Admin/BikeCategory/BikeCategory';
import CategoryDetails from './Modules/Admin/BikeCategory/BikeCategory/CategoryDetails';
import CategoryItem from './Modules/Admin/BikeCategory/BikeCategory/CategoryItem';
import AddLocation from './Modules/Admin/ListStation/AddStation/AddLocation/AddLocation';
import AddStation from './Modules/Admin/ListStation/AddStation/AddStation';
import EditStation from './Modules/Admin/ListStation/EditStation/EditStation';



document.title = "Ecopark Manager"
ReactDOM.render(
  <React.StrictMode>
   <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);

