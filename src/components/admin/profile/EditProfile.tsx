import { useState, useEffect } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import InputField from 'components/fields/InputField';
import Button from 'components/button/Button';
import { useUpdateMyProfileMutation } from 'store/apiEndPoints/userApi';
import Card from 'components/card';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { useDispatch } from 'react-redux';
import ImageUploaderAndCropper from 'components/imageUploader/ImageUploaderAndCropper';
import { getImageUrl } from 'utils/imageUtils';

const EditProfile = ({ data, onClose }) => {
    const [firstName, setFirstName] = useState(data?.firstName || '');
    const [lastName, setLastName] = useState(data?.lastName || '');
    const [email, setEmail] = useState(data?.email || '');
    const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || '');
    const [role, setRole] = useState(data?.role || '');
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useDispatch();
    const [updateProfile] = useUpdateMyProfileMutation();

    const handleProfileImageCrop = (croppedImage) => {
        setProfileImage(URL.createObjectURL(croppedImage));
    };

    const handleCoverImageCrop = (croppedImage) => {
        setCoverImage(URL.createObjectURL(croppedImage));
    };

    const removeImage = (type) => {
        if (type === 'profile') {
            setProfileImage(null);
        } else if (type === 'cover') {
            setCoverImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProfile = { firstName, lastName, email, phoneNumber, role };

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("role", role);

        if (profileImage) {
            const profileBlob = await fetch(profileImage).then(res => res.blob());
            formData.append("profileImage", profileBlob, "profileImage.png");
        }

        if (coverImage) {
            const coverBlob = await fetch(coverImage).then(res => res.blob());
            formData.append("coverImage", coverBlob, "coverImage.png");
        }

        try {
            await updateProfile(formData);
            onClose();
        } catch (error) {
            dispatch(showAlert({ message: 'Failed to update profile', severity: 'error', duration: 2000 }));
        }
    };

    return (
        <Card className="grid h-full w-full grid-cols-1 gap-3 py-7 px-10 rounded-[20px] bg-white bg-clip-border font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-12">
            <div className="col-span-12 flex flex-col justify-center">
                <InputField
                    label="First Name"
                    placeholder="Enter your first name"
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="auth"
                />
            </div>

            <div className="col-span-12 flex flex-col justify-center">
                <InputField
                    label="Last Name"
                    placeholder="Enter your last name"
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="auth"
                />
            </div>

            <div className="col-span-12 flex flex-col justify-center">
                <InputField
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    id="phoneNumber"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    variant="auth"
                />
            </div>

            <div className="col-span-12 flex flex-col justify-center mt-4">
                <h4 className="text-lg font-bold text-brandGreen dark:text-white">Profile Image</h4>
                <ImageUploaderAndCropper
                    previewImage={getImageUrl(profileImage)}
                    setPreviewImage={setProfileImage}
                    onCropComplete={handleProfileImageCrop}
                    removeImage={() => removeImage('profile')}
                    aspectRatio={4 / 3}
                />
            </div>


            <div className="col-span-12 flex flex-col justify-center mt-4">
                <h4 className="text-lg font-bold text-brandGreen dark:text-white">Cover Image</h4>
                <ImageUploaderAndCropper
                    previewImage={coverImage}
                    setPreviewImage={setCoverImage}
                    onCropComplete={handleCoverImageCrop}
                    removeImage={() => removeImage('cover')}
                    aspectRatio={16 / 9}
                />
            </div>

            <div className="col-span-12 flex justify-center mt-4">
                <Button
                    icon={MdAdd}
                    text="Save Changes"
                    size="sm"
                    color="bg-brandGreen"
                    className="w-full"
                    onClick={handleSubmit}
                />
            </div>

            <div className="col-span-12 flex justify-center mt-4">
                <Button
                    icon={MdClose}
                    text="Cancel"
                    size="sm"
                    color="bg-gray-500"
                    className="w-full"
                    onClick={onClose}
                />
            </div>
        </Card>
    );
};

export default EditProfile;
