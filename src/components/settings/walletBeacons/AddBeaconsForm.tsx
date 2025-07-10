import React, { useState, useEffect } from "react";
import { useGetAllAddressesQuery } from "store/apiEndPoints/settingsApi";
import InputField from "components/fields/InputField";
import Button from "components/button/Button";
import InputDropdown from "components/fields/InputDropDown";

const AddBeacons = ({ onClose, editRowData, onSubmit }) => {
    const { data: addresses, isLoading, error } = useGetAllAddressesQuery("");
    const [beaconText, setBeaconText] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [addressOptions, setAddressOptions] = useState([]);

    console.log("addresses", addresses);
    console.log("editRowData", editRowData);

    useEffect(() => {
        if (addresses) {
            const options = addresses.map((address) => ({
                value: address.id,
                label: address.address,
            }));
            setAddressOptions(options);
        }

        if (editRowData) {
            setBeaconText(editRowData.beaconText);
            setSelectedAddress(editRowData.addressId);
        }
    }, [addresses, editRowData]);

    const handleBeaconTextChange = (e) => {
        setBeaconText(e.target.value);
    };

    const handleAddressChange = (selectedOption) => {
        setSelectedAddress(selectedOption.value);
    };

    const handleSubmit = () => {
        if (!selectedAddress && !beaconText) {
            alert("Please enter or select an address.");
            return;
        }
        const updatedAddressData = {
            id: editRowData ? editRowData.id : null,
            addressId: selectedAddress,
            beaconText: beaconText,
        };
        onSubmit(updatedAddressData);
    };

    return (
        <div className="address-selection-component py-8 px-10">
            <div className="address-form">
                <InputField
                    variant="auth"
                    extra="mb-3"
                    label="Beacon Text"
                    placeholder="Enter Beacon Text"
                    id="address-input"
                    type="text"
                    value={beaconText}
                    onChange={handleBeaconTextChange}
                />
            </div>

            <div className="mb-10">
                <InputDropdown
                    label="Select Address"
                    id="address-dropdown"
                    placeholder="Select an Address"
                    options={addressOptions}
                    value={selectedAddress}
                    onChange={handleAddressChange}
                    variant="auth"
                />
            </div>

            <Button
                text={editRowData ? "Update Beacon" : "Add Beacon"}
                size="sm"
                color="bg-brandGreen"
                className="w-full mb-5"
                onClick={handleSubmit}
                icon={undefined}
            />
        </div>
    );
};

export default AddBeacons;
