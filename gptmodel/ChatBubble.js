import React from 'react';
import { Box, Typography } from '@mui/material';

function ChatBubble({ type, text }) {
  const isBot = type === 'bot';

  const style = {
    root: {
      maxWidth: '70%',
      borderRadius: '10px',
      padding: '.5rem .8rem',
      marginBottom: '.6rem',
    },
    bot: {
      background: '#f1f3f4',
    },
    user: {
      alignSelf: 'flex-end',
      background:'#1976d2', // You can change the color as needed.
	  color:'white'
    },
  };

  return (
    <Box sx={{ ...style.root, ...(isBot ? style.bot : style.user) }}>
        <Typography variant="body1">{text}</Typography>
	</Box>
  );
}

export default ChatBubble;