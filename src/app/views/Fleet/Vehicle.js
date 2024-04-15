import React, { useEffect, useState } from 'react'
import { fetchVehicleData, fetchVehicleSearchData } from 'app/services/rest'
import { VEHICLE, VEHICLE_CARD_BODY } from 'app/Utils/Constant'
import ToolBar from 'app/components/ToolBar'
import { useNavigate } from 'react-router-dom'
import NotFound from 'app/components/NotFound'
import VehicleCard from 'app/components/VehicleCard'
import { Grid } from '@mui/material'
import "../../../index.css"

function Vehicle() {
    const [vehicles, setVehicles] = React.useState(null);
    const [searchContent, setSearchContent] = useState("");
    const navigate = useNavigate();
    let reqBody = { ...VEHICLE_CARD_BODY };

    const getVehicleData = async () => {
        const response = await fetchVehicleData(VEHICLE, reqBody);
        if (response) {
            setVehicles(response.total === 0 ? [] : response.data)
        }
    }

    const searchBody = {
        "offset": 0,
        "translate": true,
        "sortBy": [
            "name"
        ],
        "fields": [
            "image",
            "plateNo",
            "name",
            "company",
            "driverPartner",
            "vehicleState"
        ],
        "limit": 40,
        "data": {
            "_domain": null,
            "_domainContext": {
                "_model": "com.axelor.apps.fleet.db.Vehicle",
                "_id": null
            },
            "operator": "or",
            "criteria": [
                {
                    "fieldName": "image.fileName",
                    "operator": "like",
                    "value": searchContent
                },
                {
                    "fieldName": "name",
                    "operator": "like",
                    "value": searchContent
                },
                {
                    "fieldName": "plateNo",
                    "operator": "like",
                    "value": searchContent
                },
                {
                    "fieldName": "driverPartner.fullName",
                    "operator": "like",
                    "value": searchContent
                },
                {
                    "fieldName": "vehicleState",
                    "operator": "like",
                    "value": searchContent
                },
                {
                    "fieldName": "company.name",
                    "operator": "like",
                    "value": searchContent
                }
            ]
        }
    }

    useEffect(() => {
        try {
            if (searchContent !== "") {
                const reqBody = { ...searchBody };
                reqBody.data = {
                    ...reqBody.data,
                    _searchText: searchContent
                }
                fetchVehicleSearchData(VEHICLE, reqBody).then((res) => setVehicles(res.total === 0 ? [] : res.data))
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
            <ToolBar refreshToggle={true}
                add={() => navigate(`/home/vehicle-edit`)}
                cardBtn={() => navigate(`/home/fleet`)}
                gridBtn={() => navigate(`/home/vehicle-list`)}
                refresh={getVehicleData}
                search={setSearchContent}
            />
            {
                vehicles && vehicles.length !== 0 ? (<>
                    <Grid container spacing={2} padding={2}>
                        {vehicles.map((data) => (
                            <VehicleCard data={data} setData={setVehicles} key={data.id} />
                        ))}
                    </Grid>
                </>) : (<><NotFound /></>)
            }
        </div>
    )
}

export default Vehicle