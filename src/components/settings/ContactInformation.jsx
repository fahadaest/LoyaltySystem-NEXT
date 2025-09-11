import React from "react";

const ContactInformation = () => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-black mb-1">Contact Information</h2>
                <p className="text-sm text-gray-500">Your primary contact details</p>
            </div>

            {/* Contact Items */}
            <div className="space-y-4">
                {/* Email Address - Active */}
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-black">Email Address</h3>
                            <p className="text-xs text-gray-500">rewardhive@gmail.com</p>
                        </div>
                    </div>
                    <span className="px-4 py-1.5 bg-green-500 text-white text-xs font-medium rounded-full">
                        Active
                    </span>
                </div>

                {/* Phone Number - Inactive */}
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                            <p className="text-xs text-gray-400">+92 XXX XXX XXXX</p>
                        </div>
                    </div>
                    <span className="px-4 py-1.5 bg-gray-300 text-gray-600 text-xs font-medium rounded-full">
                        Inactive
                    </span>
                </div>

                {/* Website - Inactive */}
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Website</h3>
                            <p className="text-xs text-gray-400">Not provided</p>
                        </div>
                    </div>
                    <span className="px-4 py-1.5 bg-gray-300 text-gray-600 text-xs font-medium rounded-full">
                        Inactive
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContactInformation;