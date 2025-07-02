import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import InputField from "components/fields/InputField";
import Button from "components/button/Button";

const AddressSelectionComponent = ({ onClose, editRowData, onSubmit }) => {
    const [address, setAddress] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        if (editRowData) {
            setAddress(editRowData.address);
            setSelectedLocation({ lat: editRowData.lat, lng: editRowData.lng });
        }
    }, [editRowData]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleLocationSelect = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setSelectedLocation({ lat, lng });
    };

    const handleSubmit = () => {
        if (!address && !selectedLocation) {
            alert("Please enter or select an address.");
            return;
        }
        const updatedAddressData = {
            id: editRowData ? editRowData.id : null,
            address: address,
            lat: selectedLocation ? selectedLocation.lat : null,
            lng: selectedLocation ? selectedLocation.lng : null
        };
        onSubmit(updatedAddressData);
    };

    return (
        <div className="address-selection-component py-10 px-5">
            <div className="address-form">
                <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Enter Address"
                    placeholder="Enter address"
                    id="address-input"
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                />
            </div>

            <div className="google-map-container mb-4" style={{ height: "300px", width: "100%" }}>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={selectedLocation || { lat: 37.7749, lng: -122.4194 }}
                        zoom={12}
                        onClick={handleLocationSelect}
                    >
                        {selectedLocation && <Marker position={selectedLocation} />}
                    </GoogleMap>
                </LoadScript>
            </div>

            <Button
                text={editRowData ? "Update Address" : "Save Address"}
                size="sm"
                color="bg-brandGreen"
                className="w-full"
                onClick={handleSubmit}
                icon={undefined}
            />
        </div>
    );
};

export default AddressSelectionComponent;