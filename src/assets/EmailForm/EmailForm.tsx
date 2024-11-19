import { useState } from "react";
import { sendBookEmail } from "../../services/email";
import React from 'react';

interface EmailFormProps {
    toggle: () => void;
    id: string;
  }

  const EmailForm: React.FC<EmailFormProps> = ({ toggle, id }) => {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [name, setName] = useState('');
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
      e.preventDefault();
      try {
        sendBookEmail(sender, receiver, name, id)
        toggle()
      } catch (error) {
        console.log(error)
      }
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
          type="email"
          placeholder="To: email"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>
    )
  }

  export default EmailForm