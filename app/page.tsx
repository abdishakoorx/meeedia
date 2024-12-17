"use client"
import { useContext } from 'react';
import { UserDetails } from './_context/UserDetails';
import Header from './_components/NavHeader';

export default function Home() {
  const { userDetails } = useContext(UserDetails);
  
  return (
    <div>
      <Header/>
      <div>
        {userDetails ? (
          <div>
            <pre>{JSON.stringify(userDetails, null, 2)}</pre>
            <p>Full User Details:</p>
            <p>ID: {userDetails.id}</p>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
            <p>Credits: {userDetails.credits}</p>
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
}