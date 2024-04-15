import { Edit } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { VEHICLE, VEHICLE_SEARCH_BODY } from 'app/Utils/Constant';
import GridView from 'app/components/GridView';
import ToolBar from 'app/components/ToolBar'
import { fetchVehicleSearchData, removeData } from 'app/services/rest';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function VehicleGrid() {
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState([]);
    const [deleteToggle, setDeleteToggle] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchContent, setSearchContent] = useState("");

    const getVehicleData = async () => {
        const response = await fetchVehicleSearchData(VEHICLE, VEHICLE_SEARCH_BODY)
        if (response) {
            setVehicleData(response.total === 0 ? [] : response.data);
        }
    }

    const columns = [
        { field: 'edit', headerName: '', width: 50, renderCell: (params) => <Edit onClick={() => navigate(`/home/vehicle-edit/${params.row.id}`)} /> },
        { field: 'plateNo', headerName: 'Plate Number', width: 150 },
        { field: 'model', headerName: "Model", width: 100 },
        { field: 'name', headerName: "Name", width: 200 },
        { field: 'driver', headerName: 'Driver', width: 150 },
        { field: 'chassisNo', headerName: 'Chassis Number', width: 150 },
        { field: 'acquisitionDate', headerName: 'Acquistion Date', width: 150 },
        { field: 'state', headerName: 'State', width: 100, valueGetter: (params) => params.row.vehicleState === null ? "" : params.row.vehicleState },
        { field: 'odometer', headerName: "Odometer", width: 150 }
    ]

    const rows = vehicleData.map((vehicle) => ({
        id: vehicle.id,
        plateNo: vehicle.plateNo,
        model: vehicle.vehicleModel.name,
        name: vehicle.name,
        driver: vehicle.driverPartner.fullName,
        chassisNo: vehicle.chasisNo,
        acquisitionDate: vehicle.acquisitionDate,
        state: vehicle.vehicleState,
        odometer: vehicle.vehicleOdometer
    }))

    const handleCheckboxChange = (vehicle) => {
        if (vehicle.length > 0) {
            setSelectedItems(vehicle)
            setDeleteToggle(true);
        }
        else {
            setSelectedItems(vehicle);
            setDeleteToggle(false);
        }
    };

    const handleDelete = async () => {
        if (selectedItems.length > 0) {
            const reqBody = {
                records: selectedItems.map(item => ({
                    id: item.id,
                    version: item.version
                }))
            };

            try {
                await removeData(VEHICLE, reqBody);
                setVehicleData(prevData =>
                    prevData.filter(vehicle =>
                        !selectedItems.some(selectedItem => selectedItem.id === vehicle.id)
                    )
                );
                setSelectedItems([]);
                setOpenDialog(false);
                setDeleteToggle(false);
            } catch (error) {
                console.error("Error deleting data : ", error);
            }
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const searchBody = {
        "offset": 0,
        "fields": [
            "plateNo",
            "vehicleModel",
            "name",
            "driverPartner",
            "chasisNo",
            "acquisitionDate",
            "vehicleState",
            "vehicleOdometer",
        ],
        "limit": 40,
        "data": {
            "_domain": null,
            "_domainContext": {
                "_model": "com.axelor.apps.fleet.db.Vehicle",
                "_id": null
            },
            "_domains": [],
            "operator": "and",
            "criteria": [
                { fieldName: 'plateNo', operator: 'like', value: searchContent },
                { fieldName: 'vehicleModel.name', operator: 'like', value: searchContent },
                { fieldName: 'name', operator: 'like', value: searchContent },
                { fieldName: 'driverPartner.fullName', operator: 'like', value: searchContent },
                { fieldName: 'chasisNo', operator: 'like', value: searchContent },
                { fieldName: 'vehicleState', operator: 'like', value: searchContent },
                { fieldName: 'vehicleOdometer', operator: '=', value: searchContent },
            ]
        }
    }

    useEffect(() => {
        try {
            let Criteria = [...searchBody.data.criteria];
            if (searchContent !== "") {
                if (isNaN(searchContent)) {
                    Criteria.pop();
                }
                let reqBody = { ...searchBody };
                reqBody.data = {
                    ...reqBody.data,
                    _searchText: searchContent,
                    criteria: Criteria,
                    operator: "or"
                }
                fetchVehicleSearchData(VEHICLE, reqBody).then((res) => setVehicleData(res.total > 0 ? res.data : []))
            }
            else {
                getVehicleData();
            }
        } catch (error) {
            console.error("Error in Search Vehicles : ", error);
        }
    }, [searchContent])

    return (
        <div>
            <ToolBar add={() => navigate("/home/vehicle-edit")}
                refreshToggle={true}
                cardBtn={() => navigate('/home/fleet')}
                gridBtn={() => navigate('/home/vehicle-list')}
                deleteToggle={deleteToggle}
                deleteAction={() => setOpenDialog(true)}
                search={setSearchContent}
                refresh={getVehicleData}
            />
            <GridView
                rows={rows}
                columns={columns}
                handleCheckboxChange={handleCheckboxChange}
                dataList={vehicleData}
            />
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
                    <Typography>Are you sure you want to delete this record?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default VehicleGrid