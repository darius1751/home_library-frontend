/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { sendBookEmail } from "../../services/email";
import React from 'react';


interface EmailFormProps {
    toggle: () => void;
    id: string;
    setError: (error: string) => void;
  }

  const EmailForm: React.FC<EmailFormProps> = ({ toggle, id, setError }) => {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [name, setName] = useState('');
    const [friend, setFriend] = useState('');
    const [lastname, setLastname] = useState('');
  
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validate = () => {
      let currentError = ''
      if(!sender) {
        currentError += 'The sender is required. '
      }
      if(!receiver) {
        currentError += 'The receiver is required. '
      }
      if(!name) {
        currentError += 'The name is required. '
      }
      if(!friend) {
        currentError += 'The friend is required. '
      }
      if(!lastname) {
        currentError += 'The lastname is required. '
      }
      setError(currentError)
    }

  
    
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      validate()
      try {
        const response = await sendBookEmail(sender, receiver, name, friend, lastname, id)
        console.log(response)
        if (response.status === 200) {
          setError('Email sent successfully')
          toggle() 
        }
        
      } catch (e: unknown) {
        if (e instanceof Error) {
            setError(e.message + ". Please complete all the fields.");
        }
        
        else {
            setError(e as string);
        }

        console.log({ e });
    };
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="From: email"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
       
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
           <input
          type="text"
          placeholder="Your Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
         <input
          type="email"
          placeholder="To: email"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <input
          type="text"
          placeholder="Friend's Name"
          value={friend}
          onChange={(e) => setFriend(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    )
  }

  export default EmailForm