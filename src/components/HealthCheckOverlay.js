import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Typography, Box, Button } from '@mui/material';
import { getHealthCheck } from '../utils/misc';
import TowerBuilder from './TowerBuilder';

const HealthCheckOverlay = ({ }) => {
    const [loading, setLoading] = useState(true);
    const [isGameInProgress, setIsGameInProgress] = useState(false);

    const performHealthCheck = async () => {
        try {
            const response = await getHealthCheck();
            if (response.status === 200) {
                setLoading(false);
            }
        } catch (error) {
            setLoading(true);
        }
    };

    useEffect(() => {
        performHealthCheck();
    }, []);

    const handleExitLoadingPage = () => {
        setIsGameInProgress(true);
    }

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading || isGameInProgress}
        >
            <Box textAlign="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {loading ?
                    (
                        <>
                            <CircularProgress color="inherit" />
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                Waiting for server to spin up
                            </Typography>
                            <p>(dev could only afford free tier hosting...)</p>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                Server is ready!
                            </Typography>
                            <Button sx={{ marginY: '25px' }} variant="outlined" color="white" onClick={() => setIsGameInProgress(false)}>
                                Return to Main Page
                            </Button>
                        </>
                    )
                }
                <TowerBuilder setIsGameInProgress={setIsGameInProgress} />
            </Box>
        </Backdrop>
    );
};

export default HealthCheckOverlay;
