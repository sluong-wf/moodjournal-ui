import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
import { getHealthCheck } from '../utils/misc';
import TowerBuilder from './TowerBuilder';

const HealthCheckOverlay = ({ }) => {
    const [loading, setLoading] = useState(true);
    const [isServerHealthy, setIsServerHealthy] = useState(false);

    const performHealthCheck = async () => {
        try {
            const response = await getHealthCheck();
            if (response.status === 200) {
                setIsServerHealthy(true);
                setLoading(false);
            } else {
                setIsServerHealthy(false);
            }
        } catch (error) {
            setIsServerHealthy(false);
            setLoading(true);
        }
    };

    useEffect(() => {
        performHealthCheck();
    }, []);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <Box textAlign="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress color="inherit" />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                    Waiting for server to spin up in ~15 seconds
                </Typography>
                <p>(dev could only afford free tier hosting...)</p>
                <TowerBuilder />
            </Box>
        </Backdrop>
    );
};

export default HealthCheckOverlay;
