import React, { useState } from "react";
import "../../index.css"
import Typography from "@mui/material/Typography";
import { Avatar, Card, CardContent, Grid, MenuItem, Menu, Dialog, DialogActions, Button, DialogTitle, DialogContent, Snackbar, Alert } from "@mui/material";
import { ArrowDropDown, ArrowRight } from "@mui/icons-material";
import NotFound from "app/components/NotFound";

function SaleOrderCard({ order, onSelect }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = () => {
        setErrorAlert(true);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorAlert(false);
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Grid item xs={12} sm={6} md={4} key={order.id} id="cardContainer">
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
                        <MenuItem onClick={() => onSelect(order.id)}>Edit</MenuItem>
                        <MenuItem onClick={handleOpenDialog}>Delete</MenuItem>
                    </Menu>

                    <CardContent onClick={() => onSelect(order.id)}>
                        <div>
                            <Typography variant="h6" component="div">
                                <span className="sale-order">
                                    Sale order {order.saleOrderSeq}{" "}
                                    {order.externalReference && (
                                        <>( {order.externalReference} )</>
                                    )}
                                </span>
                            </Typography>
                            <Typography variant="body2" color="textSecondary" id="date">
                                <>
                                    <span className="order-date">
                                        {order.orderDate
                                            ? new Date(order.orderDate).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                }
                                            )
                                            : ""}
                                    </span>
                                </>
                            </Typography>
                            <div className="customer-info-status">
                                {" "}
                                <Typography variant="body2" color="textSecondary">
                                    <div className="customer-info">
                                        <Avatar
                                            alt="Customer"
                                            src="https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
                                        />
                                        <span className="client-partner">
                                            {order["clientPartner.fullName"]}
                                        </span>
                                    </div>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" id="status">
                                    {order.statusSelect === 3 ? (
                                        <span className="order-confirm">
                                            <ArrowRight /> Order Confirmed
                                        </span>
                                    ) : null}
                                </Typography>
                            </div>

                            <div className="status-and-total">
                                {" "}
                                <Typography variant="body2" color="textSecondary">
                                    <span className="wt-total">
                                        WT: {order["currency.symbol"]} {order.exTaxTotal}
                                    </span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <span className="ati-total">
                                        ATI: {order["currency.symbol"]} {order.inTaxTotal}
                                    </span>
                                </Typography>
                            </div>
                            <Typography variant="body2" color="textSecondary">
                                {order.invoicingState === 1 ? (
                                    <span className="not-invoiced">Not Invoiced</span>
                                ) : (
                                    <span className="invoiced">Invoiced</span>
                                )}
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                                {order.deliveryState === 1 ? (
                                    <span className="not-delivered">Not Delivered</span>
                                ) : (
                                    <span className="delivered">Delivered</span>
                                )}
                            </Typography>

                            <Typography variant="body2" color="textSecondary">
                                {order.orderBeingEdited === true ? (
                                    <span className="not-invoiced">Order being edited</span>
                                ) : (
                                    ""
                                )}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <div className="company-name">{order.company.name}</div>
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                id="customer-info"
                            >
                                <div className="company-name">
                                    {order.stockLocation !== null && (
                                        <>{order.stockLocation.name}</>
                                    )}
                                </div>
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    style: {
                        minWidth: "300px",
                        position: "absolute",
                        top: "10%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
            >
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this card?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={errorAlert}
                onClose={handleSnackBarClose}
                autoHideDuration={5000}
            >
                <Alert
                    onClose={handleSnackBarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    "It is not possible to delete a confirmed order
                </Alert>
            </Snackbar>
        </>
    )
}

export default SaleOrderCard