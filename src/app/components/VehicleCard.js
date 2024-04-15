import { ArrowDropDown } from '@mui/icons-material';
import { Card, CardContent, Menu, MenuItem, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import { VEHICLE } from 'app/Utils/Constant';
import { removeData } from 'app/services/rest';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageComponent from './ImageComponent';

function VehicleCard({ data, setData }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const cardSelect = (id) => {
        navigate("/home/vehicle-edit/" + id);
    };

    const handleDelete = () => {
        let reqBody = {};
        reqBody.records = [{
            id: data.id,
            version: data.version
        }];

        removeData(VEHICLE, reqBody)
            .then(() => {
                setData(prev => prev.filter(item => item.id !== data.id));
                handleCloseDialog();
            })
            .catch(error => {
                console.error("Error deleting data: ", error);
                handleCloseDialog();
            });
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    let queryParams = {
        image: true,
        v: data.version,
        parentId: data.id,
        parentModel: VEHICLE
    }

    return (
        <>
            <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={data.id}
                id="cardContainer"
            >
                <Card sx={{ height: "100%" }} elevation={2}>
                    <ArrowDropDown
                        onClick={handleClick}
                        sx={{
                            top: -10,
                            right: -10,
                            float: "right",
                            borderRadius: "0.1",
                        }}
                        id="arrow-dropdown"
                    />

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 1,
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                cardSelect(data.id);
                            }}
                        >
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleOpenDialog}>
                            Delete
                        </MenuItem>
                    </Menu>
                    <CardContent onClick={() => {
                        cardSelect(data.id);
                    }}>
                        <div>
                            <Typography variant='h6' component='div' >
                                <span>
                                    {data?.name}
                                </span>
                            </Typography>
                            <Typography variant='h6' component='div' >
                                <span>
                                    {data?.plateNo}
                                </span>
                            </Typography>
                            <Typography variant='h6' component='div' >
                                <span>
                                    {data.driverPartner?.fullName}
                                </span>
                            </Typography>
                            <ImageComponent id={data.id} queryParams={queryParams} />
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Dialog open={openDialog} onClose={handleCloseDialog}
                PaperProps={{
                    style: {
                        minWidth: '300px',
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this card?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default VehicleCard;
