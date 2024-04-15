import ToolBar from 'app/components/ToolBar'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchActionData, fetchModelData, fetchVehcileEditData, fetchVehicleData, uploadFile } from 'app/services/rest';
import { COMPANY_MODEL, METAFILE_MODEL, PARTNER_MODEL, VEHICLE, VEHICLE_ACTION_BODY, VEHICLE_EDIT_FETCH_BODY, VEHICLE_MODEL, VEHICLE_MODEL_BODY, VEHICLE_TAGS_MODEL } from 'app/Utils/Constant';
import "./Vehicle_Module.css"
import FleetForm from 'app/components/FleetForm';

function VehicleEdit() {
    const [fieldDisable, setfieldDisable] = useState(true);
    const [saveToggle, setSaveToggle] = useState(false);
    const [originalData, setOriginalData] = useState({});
    const [updateFields, setUpdatedFields] = useState({});
    let [actionBody, setActionBody] = useState({});
    const actionBodyRef = useRef(actionBody);
    const navigate = useNavigate();
    const { id } = useParams();

    const [formState, setFormState] = useState({
        isRentalCar: false,
        image: null,
        fileUrl: '',
        showImagePreview: false,
        models: [],
        vehicleModel: null,
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
        const reqBody = { ...VEHICLE_EDIT_FETCH_BODY };
        fetchVehcileEditData(VEHICLE, id, reqBody).then((res) => {
            setOriginalData(res.data[0]);
            setFormState(prev => ({ ...prev, ...res.data[0] }))
        })
    }, [id])

    useEffect(() => {
        actionBodyRef.current = actionBody
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
        handleInputChange("vehicleModel", model);
    };

    const onTagsSelected = (tags) => {
        handleInputChange("vehicleTagSet", [tags])
    }
    const onCompanySelected = (selectedCompany) => {
        handleInputChange("company", selectedCompany)
    }

    const onDriverSelected = (driver) => {
        handleInputChange("driverPartner", driver)
    }

    const onTransmissionSelected = (transmission) => {
        handleInputChange("transmissionSelect", transmission.id)
    }

    const onFuelTypeSelected = (fueltype) => {
        handleInputChange("fuelTypeSelect", fueltype.id)
    }

    const saveData = async () => {
        try {
            if (Object.keys(formState.vehicleModel).length > 0) {
                let reqBody = {};
                reqBody.data = {
                    ...reqBody.data,
                    id: id,
                    version: formState.version,
                    wkfStatus: null,
                    ...updateFields,
                    _original: originalData
                }
                fetchModelData(VEHICLE, reqBody).then((response) => {
                    const ID = response.data[0].id;
                    const reqBody = { ...VEHICLE_EDIT_FETCH_BODY };
                    try {
                        fetchVehcileEditData(VEHICLE, ID, reqBody).then((response) => {
                            setFormState(prev => ({ ...prev, ...response.data[0] }))
                        })
                    } catch (error) {
                        console.error("Error fetching data: ", error);
                    }
                })
            }
            else {
                alert("Model is required");
            }
        } catch (error) {
            console.error("Error while saving data ===>", error);
        }
    }

    useEffect(() => {
        if (formState.vehicleModel) {
            fetchActionData(actionBody).then((response) => {
                setFormState((prev) => ({ ...prev, name: response.data[0].values.name }));
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
        setUpdatedFields(prev => ({
            ...prev,
            [fieldName]: value
        }));
        setFormState(prev => ({
            ...prev,
            [fieldName]: value
        }))
    };

    return (
        <div>
            <ToolBar
                refreshToggle={false}
                add={() => navigate("/home/vehicle-edit")}
                cardBtn={() => navigate('/home/fleet')}
                gridBtn={() => navigate('/home/vehicle-list')}
                searchToggle={'hidden'}
                toggle={true}
                saveToggle={saveToggle}
                editSelected={() => {
                    setfieldDisable(false);
                    setSaveToggle(true);
                }}
                saveSelected={() => {
                    saveData();
                    setSaveToggle(false);
                    setfieldDisable(true);
                }}
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
                fieldDisable={fieldDisable}
                handleFileChangeAndUpload={handleFileChangeAndUpload}
                actionBody={actionBody}
                handleInputChange={handleInputChange}
            />

        </div>

    )
}
export default VehicleEdit