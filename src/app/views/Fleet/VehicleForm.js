import ToolBar from 'app/components/ToolBar'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchActionData, fetchModelData, fetchVehicleData, uploadFile } from 'app/services/rest';
import { COMPANY_MODEL, METAFILE_MODEL, PARTNER_MODEL, VEHICLE, VEHICLE_ACTION_BODY, VEHICLE_MODEL, VEHICLE_MODEL_BODY, VEHICLE_TAGS_MODEL } from 'app/Utils/Constant';
import "./Vehicle_Module.css"
import FleetForm from 'app/components/FleetForm';
import { Snackbar, Alert } from "@mui/material";

function VehicleForm() {
    let [actionBody, setActionBody] = useState({});
    const navigate = useNavigate();
    const actionBodyRef = useRef(actionBody);
    const [snackbarOpen, setSnackbarOpen] = useState({
        state: false,
        message: "",
        severity: ""
    });

    const [formState, setFormState] = useState({
        isRentalCar: false,
        image: null,
        fileUrl: '',
        showImagePreview: false,
        models: [],
        vehicleModel: {},
        isModelSelectOpen: false,
        name: "",
        carValue: "0",
        co2emmision: "0",
        doors: 0,
        fuelTypeSelect: 0,
        horsePower: 0,
        horsePowerTax: "0",
        isArchived: false,
        powerKw: 0,
        seats: 0,
        transmissionSelect: 0,
        vehicleOdometer: "0",
        plateNo: '',
        vehicleTagSet: [],
        tags: [],
        isTagsSelectOpen: false,
        company: null,
        companyList: [],
        isCompanySelectOpen: false,
        driverPartner: null,
        isDriverSelectedOpen: false,
        driverList: [],
        location: "",
        chasisNo: "",
        acquisitionDate: "",
        color: "",
        fuelCardNumber: "",
        fuelCardCode: ""
    })

    useEffect(() => {
        actionBodyRef.current = actionBody;
    }, [actionBody])

    useEffect(() => {
        const updatedActionBody = { ...VEHICLE_ACTION_BODY };
        updatedActionBody.data.context = {
            ...updatedActionBody.data.context,
            isRentalCar: formState.isRentalCar,
            image: formState.image,
            vehicleModel: formState.vehicleModel,
            carValue: formState.carValue,
            co2emmision: formState.co2emmision,
            doors: formState.doors,
            fuelTypeSelect: formState.fuelTypeSelect,
            horsePower: formState.horsePower,
            horsePowerTax: formState.horsePowerTax,
            isArchived: formState.isArchived,
            powerKw: formState.powerKw,
            seats: formState.seats,
            transmissionSelect: formState.transmissionSelect,
            vehicleTagSet: formState.vehicleTagSet,
            company: formState.company,
            driverPartner: formState.driverPartner,
            location: formState.location,
            chasisNo: formState.chasisNo,
            vehicleOdometer: formState.vehicleOdometer,
            acquisitionDate: formState.acquisitionDate,
            color: formState.color,
            fuelCardNumber: formState.fuelCardNumber,
            fuelCardCode: formState.fuelCardCode
        };

        if (formState.plateNo !== "" && formState.name === "") {
            updatedActionBody.data.context.plateNo = formState.plateNo;
            delete updatedActionBody.data.context.name;
        } else {
            if (formState.plateNo !== "" && formState.name !== "") {
                updatedActionBody.data.context.name = formState.name;
                updatedActionBody.data.context.plateNo = formState.plateNo;
            } else {
                if (formState.plateNo === "") {
                    delete updatedActionBody.data.context.plateNo;
                }
                if (formState.name === "") {
                    delete updatedActionBody.data.context.name;
                }
            }
        }
        const updatedAction = { ...updatedActionBody };
        setActionBody(updatedAction)
    }, [formState]);

    const handleFileChangeAndUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('field', undefined);
                formData.append(
                    'request',
                    JSON.stringify({
                        data: {
                            fileName: selectedFile.name,
                            fileType: selectedFile.type,
                            fileSize: selectedFile.size,
                            $upload: {
                                file: {}
                            }
                        }
                    })
                );

                uploadFile(METAFILE_MODEL, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then((response) => {
                    setFormState((prev) => ({
                        ...prev,
                        image: response.data[0],
                        fileUrl: URL.createObjectURL(selectedFile),
                        showImagePreview: true
                    }))
                })
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
        else {
            setFormState((prev) => ({ ...prev, image: null }));
        }
    }

    const onModelSelected = (model) => {
        setFormState((prev) => ({ ...prev, vehicleModel: model }));
    };

    const onTagsSelected = (tags) => {
        setFormState((prev) => ({ ...prev, vehicleTagSet: [tags] }))
    }
    const onCompanySelected = (selectedCompany) => {
        setFormState((prev) => ({ ...prev, company: selectedCompany }))
    }

    const onDriverSelected = (driver) => {
        setFormState((prev) => ({ ...prev, driverPartner: driver }))
    }

    const onTransmissionSelected = (transmission) => {
        setFormState((prev) => ({ ...prev, transmissionSelect: transmission.id }))
    }

    const onFuelTypeSelected = (fueltype) => {
        setFormState((prev) => ({ ...prev, fuelTypeSelect: fueltype.id }))
    }

    const saveData = async () => {
        try {
            if (Object.keys(formState.vehicleModel).length > 0) {
                setSnackbarOpen((prev) => ({
                    ...prev,
                    state: "Success",
                    message: "Vehicle Information Added Successfully",
                    severity: "success"
                }))
                let reqBody = {};
                reqBody.data = { ...actionBodyRef.current.data.context };
                delete reqBody.data._id;
                delete reqBody.data._model;
                delete reqBody.data._source;
                delete reqBody.data._viewType;
                delete reqBody.data._views;
                fetchModelData(VEHICLE, reqBody).then((response) => {
                    const ID = response.data[0].id;
                    navigate(`/home/vehicle-edit/${ID}`);
                })
            }
            else {
                setSnackbarOpen((prev) => ({
                    ...prev,
                    message: "Model is required",
                    severity: "error",
                    state: true
                }))
            }
        } catch (error) {
            console.error("Error while saving data ===>", error);
        }
    }

    useEffect(() => {
        if (Object.keys(formState.vehicleModel).length > 0) {
            fetchActionData(actionBody).then((response) => {
                handleInputChange("name", response.data[0].values.name);
            });
        }
    }, [formState.vehicleModel]);

    useEffect(() => {
        if (formState.isModelSelectOpen) {
            const reqBody = { ...VEHICLE_MODEL_BODY };
            fetchVehicleData(VEHICLE_MODEL, reqBody).then((response) => {
                setFormState((prev) => ({ ...prev, models: response.data }))
            })
        }
        if (formState.isTagsSelectOpen) {
            const reqBody = { ...VEHICLE_MODEL_BODY };
            fetchVehicleData(VEHICLE_TAGS_MODEL, reqBody).then((response) => {
                setFormState((prev) => ({ ...prev, tags: response.data }))
            })
        }
        if (formState.isCompanySelectOpen) {
            const reqBody = { ...VEHICLE_MODEL_BODY };
            fetchVehicleData(COMPANY_MODEL, reqBody).then((response) => {
                setFormState((prev) => ({ ...prev, companyList: response.data }))
            })
        }
        if (formState.isDriverSelectedOpen) {
            let reqBody = { ...VEHICLE_MODEL_BODY };
            reqBody = {
                ...reqBody,
                fields: ["id", "fullName"]
            }
            reqBody.data = {
                ...reqBody.data,
                _domain: "self.isEmployee = true AND :company member of self.companySet",
            }
            if (formState.company) {
                reqBody.data = {
                    ...reqBody.data,
                    _domainContext: actionBody.data.context
                }
            }
            fetchVehicleData(PARTNER_MODEL, reqBody).then((response) => {
                setFormState((prev) => ({ ...prev, driverList: response.data }))
            })
        }
    }, [formState.isModelSelectOpen, formState.isTagsSelectOpen, formState.isCompanySelectOpen, formState.isDriverSelectedOpen])

    const handleInputChange = (fieldName, value) => {
        setFormState(prev => ({
            ...prev,
            [fieldName]: value
        }));
    }

    const handleCloseSuccessMessage = () => {
        setSnackbarOpen((prev) => ({
            ...prev,
            state: false
        }))
    }

    return (
        <>
            <div>
                <ToolBar
                    refreshToggle={false}
                    add={() => navigate("/home/vehicle-edit")}
                    cardBtn={() => navigate('/home/fleet')}
                    gridBtn={() => navigate('/home/vehicle-list')}
                    searchToggle={'hidden'}
                    toggle={true}
                    saveToggle={true}
                    saveSelected={saveData}
                    backToggle={true}
                    backAction={() => navigate(-1)}
                />
                <FleetForm
                    formState={formState}
                    setFormState={setFormState}
                    onCompanySelected={onCompanySelected}
                    onDriverSelected={onDriverSelected}
                    onFuelTypeSelected={onFuelTypeSelected}
                    onModelSelected={onModelSelected}
                    onTagsSelected={onTagsSelected}
                    onTransmissionSelected={onTransmissionSelected}
                    fieldDisable={false}
                    handleFileChangeAndUpload={handleFileChangeAndUpload}
                    actionBody={actionBody}
                    handleInputChange={handleInputChange}
                />

            </div>
            <Snackbar open={snackbarOpen.state} close={handleCloseSuccessMessage} autoHideDuration={3000}>
                <Alert onClose={handleCloseSuccessMessage} severity={snackbarOpen.severity} sx={{ wdith: "100%" }}>
                    {snackbarOpen.message}
                </Alert>
            </Snackbar>
        </>
    )
}
export default VehicleForm