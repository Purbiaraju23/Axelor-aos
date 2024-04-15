import React from 'react'
import "../views/Fleet/Vehicle_Module.css"
import LabelledTextField from './LabelledTextField';
import { Checkbox, Divider, Switch } from '@mui/material';
import BasicTabs from './BasicTabs';
import SearchSelect from './SearchSelect';
import { FUELTYPE_OPTIONS, TRANSMISSION_OPTIONS } from 'app/Utils/Constant';
import { fetchActionData } from 'app/services/rest';
import { TABS } from "../Utils/Constant"

function FleetForm({
    formState,
    setFormState,
    onCompanySelected,
    onTransmissionSelected,
    onDriverSelected,
    onFuelTypeSelected,
    onTagsSelected,
    onModelSelected,
    fieldDisable,
    handleFileChangeAndUpload,
    actionBody,
    handleInputChange }) {

    return (
        <div className='fleet-form'>
            <div className="container-main-card">
                <div className="main-card">
                    <div className="form">
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className='input-field'>
                                <div className="image-upload">
                                    <label>Image</label>
                                    <input accept="Image/*" type="file" onChange={handleFileChangeAndUpload} disabled={fieldDisable} />
                                    {formState.showImagePreview && <img src={formState.fileUrl} alt="Uploadedimage" className="image-preview" />}
                                </div>
                                <div className="fieldset">
                                    <div className="fieldSet-top">
                                        <div className="rental-toggle">
                                            <label>Rental car</label>
                                            <Switch
                                                checked={formState.isRentalCar}
                                                disabled={fieldDisable}
                                                onChange={(event) => handleInputChange('isRentalCar', event.target.checked)}
                                            />
                                        </div>
                                        <SearchSelect
                                            label="Model"
                                            disabled={fieldDisable}
                                            options={formState.models.length !== 0 ? formState.models : [formState.vehicleModel]}
                                            value={formState?.vehicleModel?.name || ''}
                                            onOpen={() => setFormState((prev) => ({ ...prev, isModelSelectOpen: true }))}
                                            onClose={() => setFormState((prev) => ({ ...prev, isModelSelectOpen: false }))}
                                            onMenuSelected={onModelSelected}
                                        />
                                        <LabelledTextField
                                            label='Name'
                                            disabled={fieldDisable}
                                            value={formState?.name || ""}
                                        />
                                        <LabelledTextField
                                            label='Plate number'
                                            value={formState?.plateNo || ""}
                                            disabled={fieldDisable}
                                            onChange={(event) => handleInputChange('plateNo', event.target.value)} onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    event.preventDefault();
                                                    fetchActionData(actionBody).then((response) => {
                                                        handleInputChange('name', response.data[0].values.name);
                                                    });
                                                }
                                            }} />
                                        <SearchSelect label='Tags'
                                            onOpen={() => setFormState((prev) => ({ ...prev, isTagsSelectOpen: true }))}
                                            onClose={() => setFormState((prev) => ({ ...prev, isTagsSelectOpen: false }))}
                                            options={formState.tags.length !== 0 ? formState.tags : formState.vehicleTagSet}
                                            disabled={fieldDisable}
                                            onMenuSelected={onTagsSelected}
                                            value={formState?.vehicleTagSet[0]?.name || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                            <h3>General Properties</h3>
                            <Divider />
                            <div className='fieldSet-middle'>
                                <div className='fieldSet-middle-left'>
                                    <SearchSelect
                                        label='Company'
                                        onOpen={() => setFormState((prev) => ({ ...prev, isCompanySelectOpen: true }))}
                                        onClose={() => setFormState((prev) => ({ ...prev, isCompanySelectOpen: false }))}
                                        options={formState.companyList.length !== 0 ? formState.companyList : [formState.company]}
                                        onMenuSelected={onCompanySelected}
                                        value={formState?.company?.name || ''}
                                        disabled={fieldDisable}
                                    />
                                    <SearchSelect
                                        label='Driver'
                                        options={formState.driverList.length !== 0 ? formState.driverList : [formState.driverPartner]}
                                        onOpen={() => setFormState((prev) => ({ ...prev, isDriverSelectedOpen: true }))}
                                        onClose={() => setFormState((prev) => ({ ...prev, isDriverSelectedOpen: false }))}
                                        onMenuSelected={onDriverSelected}
                                        disabled={fieldDisable}
                                        value={formState?.driverPartner?.fullName || ""}
                                    />
                                    <LabelledTextField
                                        label="Location"
                                        value={formState.location}
                                        onChange={(event) => handleInputChange("location", event.target.value)}
                                        disabled={fieldDisable}
                                    />
                                    <LabelledTextField
                                        label='Chassis Number'
                                        value={formState.chasisNo}
                                        onChange={(event) => handleInputChange("chasisNo", event.target.value)}
                                        disabled={fieldDisable}
                                    />
                                </div>
                                <div className='fieldSet-middle-right'>
                                    <LabelledTextField label='Odometer' type='number'
                                        value={formState.vehicleOdometer}
                                        onChange={(event) => handleInputChange("vehicleOdometer", event.target.value)}
                                        disabled={fieldDisable}
                                    />
                                    <LabelledTextField label="Acquistion Date" type="date"
                                        value={formState.acquisitionDate}
                                        onChange={(event) => handleInputChange("acquisitionDate", event.target.value)}
                                        disabled={fieldDisable}
                                    />
                                    <LabelledTextField label='Car value' type='number'
                                        value={formState.carValue}
                                        onChange={(event) => handleInputChange("carValue", event.target.value)}
                                        disabled={fieldDisable}
                                    />
                                    <div className="checkbox">
                                        <label>Archived</label>
                                        <Checkbox
                                            checked={formState.isArchived}
                                            onChange={(event) => handleInputChange("isArchived", event.target.checked)}
                                            disabled={fieldDisable}
                                        />
                                    </div>
                                </div>
                            </div>
                            <h3>Additional Properties</h3>
                            <Divider />
                            <div className="fieldSet-lower">
                                <div className='fieldSet-lower-left'>
                                    <LabelledTextField label='Seats' type='number'
                                        value={formState.seats}
                                        onChange={(event) => handleInputChange("seats", event.target.value)}
                                        disabled={fieldDisable}
                                    />
                                    <LabelledTextField label='Doors' type='number'
                                        value={formState.doors}
                                        onChange={(event) => handleInputChange("doors", event.target.value)}
                                        disabled={fieldDisable}
                                    />
                                    <LabelledTextField label='Color' type='text'
                                        value={formState.color}
                                        onChange={(event) => handleInputChange("color", event.target.value)}
                                        disabled={fieldDisable}
                                    />
                                </div>
                                <div className='fieldSet-lower-right'>
                                    <h3>Engine Options</h3>
                                    <Divider />
                                    <SearchSelect label="Transmission"
                                        options={fieldDisable ? [TRANSMISSION_OPTIONS[formState.transmissionSelect]] : TRANSMISSION_OPTIONS}
                                        onMenuSelected={onTransmissionSelected}
                                        value={TRANSMISSION_OPTIONS[formState.transmissionSelect].name || ""}
                                        disabled={fieldDisable}
                                    />
                                    <SearchSelect label="Fuel Type"
                                        options={fieldDisable ? [FUELTYPE_OPTIONS[formState.fuelTypeSelect]] : FUELTYPE_OPTIONS}
                                        onMenuSelected={onFuelTypeSelected}
                                        disabled={fieldDisable}
                                        value={FUELTYPE_OPTIONS[formState.fuelTypeSelect].name || ""}
                                    />
                                    <LabelledTextField label='CO2 Emissions' type='number'
                                        value={formState?.co2emmision}
                                        disabled={fieldDisable}
                                        onChange={(event) => handleInputChange("co2emmision", event.target.value)}
                                    /><b>g/km</b>
                                    <LabelledTextField label='Horse Power' type='number'
                                        value={formState.horsePower}
                                        disabled={fieldDisable}
                                        onChange={(event) => handleInputChange("horsePower", event.target.value)}
                                    />
                                    <LabelledTextField label='Horse Power Tax' type='number'
                                        value={formState.horsePowerTax}
                                        disabled={fieldDisable}
                                        onChange={(event) => handleInputChange("horsePowerTax", event.target.value)}
                                    />
                                    <LabelledTextField label='Power(KW)' type='number'
                                        value={formState.powerKw}
                                        disabled={fieldDisable}
                                        onChange={(event) => handleInputChange("powerKw", event.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                formState.isRentalCar && <div>
                    <div className="container-main-card">
                        <div className="main-card">
                            <div className="form">
                                <h4>Rental</h4>
                                <Divider />
                                <div className="rentalfields">
                                    <div className='rentalfields-left'>
                                        <LabelledTextField type="text"
                                            label="Fuel card number" value={formState.fuelCardNumber}
                                            disabled={fieldDisable}
                                            onChange={(event) => handleInputChange("fuelCardNumber", event.target.value)}
                                        />
                                    </div>
                                    <div className='rentalfields-right'>
                                        <LabelledTextField type="text"
                                            label="Fuel card code" value={formState.fuelCardCode}
                                            disabled={fieldDisable}
                                            onChange={(event) => handleInputChange("fuelCardCode", event.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div>
                <div className="container-main-card">
                    <div className="main-card">
                        <div className="form">
                            <BasicTabs tabs={TABS} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FleetForm