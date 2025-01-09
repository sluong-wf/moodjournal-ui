import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const JournalHistory = ({ messages, prompt, displayNewPrompt }) => {
    const [typingText, setTypingText] = useState('');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, typingText]);

    useEffect(() => {
        if (prompt) {
            let index = 0;
            setTypingText(prompt[index]);
            const interval = setInterval(() => {
                setTypingText(prev => prev + prompt[index]);
                index += 1;

                if (index === prompt.length - 1) {
                    clearInterval(interval);
                }
            }, 20);
            return () => clearInterval(interval);
        }
    }, [prompt]);

    return (
        <Box
            ref={chatContainerRef}
            sx={{
                maxHeight: '300px',
                overflowY: 'auto',
                padding: '10px',
            }}
        >
            {messages.map((msg, index) => (
                <Box key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        flexDirection: msg.sender === 'user' ? 'row' : 'row',
                        // justifyContent: 'center',
                    }}>
                    <Box
                        sx={{
                            backgroundColor: msg.sender === 'user' ? '#d8edd9' : '#f4f6f8',
                            padding: '10px',
                            borderRadius: '10px',
                            width: '95%',
                        }}>
                        <Typography variant="body1">{msg.text}</Typography>
                    </Box>
                </Box>
            ))}
            {displayNewPrompt && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        flexDirection: 'row',
                        padding: '10px 0',
                    }}>
                    <Avatar sx={{ width: '30px', height: '30px', marginRight: '10px' }} >🐶</Avatar>
                    <Box
                        sx={{
                            backgroundColor: '#dfe4ea',
                            padding: '10px',
                            borderRadius: '10px',
                            width: '90%',
                        }}>
                        <Typography variant="body1">{typingText || 'Hmmm...'}</Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default JournalHistory;
