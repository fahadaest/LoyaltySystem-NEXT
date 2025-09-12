import React from 'react';
import { Mail, Phone, User, Info, Star, Edit } from 'lucide-react';

const ProfileComponent = ({ onEditClick }) => {
    return (
        <div className="relative w-full">
            {/* Main Container - Reduced padding */}
            <div className="bg-white border border-gray-200 rounded-[40px] p-5 shadow-sm">

                {/* Header Section with Green Background - Reduced padding and title size */}
                <div className="relative bg-[#007042] rounded-[30px] p-6 mb-4">
                    {/* Edit Button - Now connected to modal */}
                    <button
                        onClick={onEditClick}
                        className="absolute top-3 right-3 w-[36px] h-[36px] bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <Edit className="w-4 h-4 text-gray-600" />
                    </button>

                    {/* Starbucks Logo and Text - Smaller title and logo */}
                    <div className="flex flex-col items-center">
                        <h1 className="text-white text-2xl font-bold mb-6 tracking-wider">STARBUCKS</h1>

                        {/* Starbucks Logo Circle - Smaller */}
                        <div className="w-[100px] h-[100px] bg-white rounded-full border-[5px] border-white flex items-center justify-center">
                            <div className="w-full h-full bg-[#00704A] rounded-full flex items-center justify-center">
                                <div className="text-white text-xl font-bold">★</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information Section - Reduced padding and font sizes */}
                <div className="bg-[#FCFCFC] border border-gray-200 rounded-[30px] p-6 mb-4 shadow-sm">
                    <div className="grid grid-cols-3 gap-6">

                        {/* Email - Smaller icon and text */}
                        <div className="flex items-center gap-3">
                            <div className="w-[40px] h-[40px] bg-black rounded-[12px] flex items-center justify-center">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[#636363] text-[12px] font-normal">Email</p>
                                <p className="text-black text-[16px] font-semibold">starbucks@gmail.com</p>
                            </div>
                        </div>

                        {/* Phone - Smaller icon and text */}
                        <div className="flex items-center gap-3">
                            <div className="w-[40px] h-[40px] bg-black rounded-[12px] flex items-center justify-center">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[#636363] text-[12px] font-normal">Phone Number</p>
                                <p className="text-black text-[16px] font-semibold">+971 50 000 0000</p>
                            </div>
                        </div>

                        {/* Role - Smaller icon and text */}
                        <div className="flex items-center gap-3">
                            <div className="w-[40px] h-[40px] bg-black rounded-[12px] flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-[#636363] text-[12px] font-normal">Role</p>
                                <p className="text-black text-[16px] font-semibold">Admin</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* More Information Section - Reduced padding and font sizes */}
                <div className="bg-[#FCFCFC] border border-gray-200 rounded-[30px] p-6 shadow-sm">
                    <h3 className="text-black text-[16px] font-bold mb-1">More Information</h3>
                    <p className="text-[#636363] text-[10px] font-medium mb-4">Following is the admins subscription permissions information</p>

                    <div className="grid grid-cols-2 gap-6">

                        {/* Subscription Information - Smaller card */}
                        <div className="bg-white border border-gray-200 rounded-[18px] p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-[40px] h-[40px] bg-black rounded-[12px] flex items-center justify-center">
                                    <Info className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-[#636363] text-[12px] font-normal">Subscription Information</p>
                                    <p className="text-black text-[14px] font-semibold">Admin user not allowed currently</p>
                                </div>
                            </div>
                        </div>

                        {/* Loyalties Allowed - Smaller card and text */}
                        <div className="bg-white border border-gray-200 rounded-[18px] p-4 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-[40px] h-[40px] bg-black rounded-[12px] flex items-center justify-center">
                                    <Star className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#636363] text-[12px] font-normal mb-1">Loyalties Allowed</p>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <span className="text-black text-[14px] font-semibold">Product Based Loyalty</span>
                                            <div className="w-[12px] h-[12px] bg-green-500 rounded-full flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-black text-[14px] font-semibold">Point Based Loyalty</span>
                                            <div className="w-[12px] h-[12px] bg-red-500 rounded-full flex items-center justify-center">
                                                <div className="w-0.5 h-0.5 bg-white"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileComponent;