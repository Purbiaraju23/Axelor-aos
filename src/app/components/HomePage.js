import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HomePage() {
    return (
        <Box minHeight="90vh" display="flex" flexDirection="column">
            <Box flexGrow={1}>
                <Box textAlign="center" mt={8}>
                    <Typography variant="h1" component="h1" gutterBottom>
                        Welcome to Axelor U-BMS
                    </Typography>
                    <Typography variant="h6" component="p" gutterBottom>
                        (Unified Business Management System : Optimized Sale Order and Vehicle Management Modules)
                    </Typography>
                </Box>
            </Box>

            <Box bgcolor="grey.800" color="white" py={3} textAlign="center">
                <Typography variant="body1" component="p">
                    Copyright (c) {new Date().getFullYear()} Axelor. All Rights Reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default HomePage;
