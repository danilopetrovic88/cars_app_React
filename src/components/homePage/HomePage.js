import React from 'react'
import "./HomePage.css";

const HomePage = ({ activeUser }) => {
  return (
    <div className='home-page'>
        <h1>Wellcome to Cars Application { activeUser && activeUser.first_name }</h1>
        <p>This application is intended to add content about various cars that you like. You have the option to register and log in as a user and add pictures and information about your favorite car, and as a guest you can view car information as well as picture galleries. We hope you enjoy it! :-) </p>
    </div>
  )
}

export default HomePage