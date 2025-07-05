import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit3, Palette, Image, Type, CreditCard, MapPin, Clock, Star } from 'lucide-react';

// SelectionView Component
const SelectionView = ({ isModal, onCreateFromScratch }) => (
  <div className={`${isModal ? 'h-[80vh]' : 'min-h-screen'} bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6`}>
    <div className="max-w-2xl w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Create Your Wallet Card
        </h1>
        <p className="text-xl text-gray-600">
          Choose how you'd like to get started
        </p>
      </div>

      <div className=" grid md:grid-cols-2 gap-6">
        {/* Create from Scratch */}
        <div onClick={onCreateFromScratch} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-brandGreen" >
          <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brandGreenGradient5 to-brandGreen rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Create from Scratch
          </h3>
          <p className="text-gray-600 mb-5">
            Start with a blank canvas and design your wallet card exactly how you want it
          </p>
          <div className="flex items-center text-brandGreen font-semibold group-hover:text-brandGreen">
            Get Started
            <ChevronLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Choose from Template */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 opacity-75">
          <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl mb-5">
            <CreditCard className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Choose from Template
          </h3>
          <p className="text-gray-600 mb-5">
            Select from pre-designed templates to get started quickly
          </p>
          <div className="flex items-center text-gray-400 font-semibold">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  </div>
);

// PhonePreview Component
const PhonePreview = ({ phoneType, setPhoneType, cardData }) => (
  <div className="w-1/3 bg-gradient-to-br from-brandGreenGradient5 to-brandGreen flex flex-col items-center justify-center p-6">
    {/* Phone Type Toggle */}
    <div className="flex items-center gap-2 mb-4 bg-white rounded-full p-1 shadow-lg">
      <button
        onClick={() => setPhoneType('iphone')}
        className={`p-2 rounded-full transition-all duration-200 ${phoneType === 'iphone'
          ? 'bg-brandGreen text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100'
          }`}
        title="iPhone Preview"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      </button>
      <button
        onClick={() => setPhoneType('android')}
        className={`p-2 rounded-full transition-all duration-200 ${phoneType === 'android'
          ? 'bg-brandGreen text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100'
          }`}
        title="Android Preview"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
        </svg>
      </button>
    </div>

    <div className="relative">
      {phoneType === 'iphone' ? (
        /* iPhone Frame */
        <div className="w-62 h-[500px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-gray-900 rounded-[2rem] relative overflow-hidden">
            {/* iPhone Notch */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full z-10 shadow-inner">
            </div>

            {/* Screen Content */}
            <div className="pt-3 px-5 h-full bg-gray-100">
              {/* Status Bar */}
              <div className="flex justify-between items-center mb-12 text-xs text-gray-900">
                <span>9:41 AM</span>
                <span>100%</span>
              </div>

              {/* Wallet Header */}
              <div className="flex items-center justify-center mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-900 mr-2">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
              </div>

              {/* Apple Wallet Card */}
              <div className="relative transform hover:scale-105 transition-transform duration-300">
                <div
                  className="rounded-2xl p-5 shadow-xl text-white relative overflow-hidden"
                  style={{ background: cardData.backgroundColor }}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold">{cardData.title}</h2>
                      <p className="text-sm opacity-90">{cardData.subtitle}</p>
                    </div>
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full"></div>
                  </div>

                  {/* Primary Field */}
                  <div className="mb-4">
                    <p className="text-xs opacity-80">{cardData.primaryField}</p>
                    <p className="text-xl font-bold">{cardData.primaryValue}</p>
                  </div>

                  {/* Secondary Fields */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {cardData.secondaryFields.map((field, index) => (
                      <div key={index}>
                        <p className="text-xs opacity-80">{field.label}</p>
                        <p className="text-sm font-semibold">{field.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Auxiliary Fields */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {cardData.auxiliaryFields.map((field, index) => (
                      <div key={index}>
                        <p className="opacity-80">{field.label}</p>
                        <p className="font-semibold">{field.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Barcode */}
                  <div className="mt-4 pt-3 border-t border-white border-opacity-20">
                    <div className="flex justify-center">
                      <div className="text-xs font-mono">{cardData.barcode}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Android Frame */
        <div className="w-62 h-[500px] bg-black rounded-[1.5rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-black rounded-[1rem] relative overflow-hidden">
            {/* Android Status Bar */}
            <div className="bg-black px-4 py-1">
              <div className="flex justify-between items-center text-xs text-white">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-white rounded-full"></div>
                    <div className="w-1 h-3 bg-white rounded-full"></div>
                    <div className="w-1 h-3 bg-white rounded-full opacity-50"></div>
                    <div className="w-1 h-3 bg-white rounded-full opacity-30"></div>
                  </div>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Screen Content */}
            <div className="pt-12 px-5 h-full bg-white">

              {/* Google Pay Header */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <h1 className="text-lg font-bold text-gray-900">Google Wallet</h1>
              </div>

              {/* Android Card */}
              <div className="relative transform hover:scale-105 transition-transform duration-300">
                <div
                  className="rounded-xl p-4 shadow-lg text-white relative overflow-hidden"
                  style={{ background: cardData.backgroundColor }}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h2 className="text-base font-bold">{cardData.title}</h2>
                      <p className="text-xs opacity-90">{cardData.subtitle}</p>
                    </div>
                    <div className="w-5 h-5 bg-white bg-opacity-20 rounded"></div>
                  </div>

                  {/* Primary Field */}
                  <div className="mb-3">
                    <p className="text-xs opacity-80">{cardData.primaryField}</p>
                    <p className="text-lg font-bold">{cardData.primaryValue}</p>
                  </div>

                  {/* Secondary Fields */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {cardData.secondaryFields.map((field, index) => (
                      <div key={index}>
                        <p className="text-xs opacity-80">{field.label}</p>
                        <p className="text-xs font-semibold">{field.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Auxiliary Fields */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {cardData.auxiliaryFields.map((field, index) => (
                      <div key={index}>
                        <p className="opacity-80">{field.label}</p>
                        <p className="font-semibold">{field.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* QR Code */}
                  <div className="mt-3 pt-2 border-t border-white border-opacity-20">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 bg-white bg-opacity-90 rounded flex items-center justify-center">
                        <div className="w-6 h-6 bg-gray-800 rounded grid grid-cols-3 gap-0.5 p-1">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="bg-white rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

// EditorView Component
const EditorView = ({ isModal, onBack, cardData, handleFieldChange, gradientOptions, phoneType, setPhoneType }) => (
  <div className={`${isModal ? 'h-[80vh]' : 'min-h-screen'} bg-gray-50 flex`}>
    {/* Left Panel - Editor */}
    <div className="w-2/3 bg-white shadow-xl flex flex-col">

      <div className="p-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex gap-5 items-center">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-brandGreen transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="w-px h-12 bg-gray-300"></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Card Editor</h2>
            <p className="text-gray-600">Customize your Wallet card</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Edit3 className="w-5 h-5 mr-2" />
            Basic Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Title
              </label>
              <input
                type="text"
                value={cardData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter card title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={cardData.subtitle}
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter subtitle"
              />
            </div>
          </div>
        </div>

        {/* Design */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Design
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="grid grid-cols-3 gap-2">
                {gradientOptions.map((gradient, index) => (
                  <button
                    key={index}
                    onClick={() => handleFieldChange('backgroundColor', gradient.value)}
                    className="h-12 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                    style={{ background: gradient.value }}
                    title={gradient.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Primary Field */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2" />
            Primary Field
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label
              </label>
              <input
                type="text"
                value={cardData.primaryField}
                onChange={(e) => handleFieldChange('primaryField', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Balance, Points"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              <input
                type="text"
                value={cardData.primaryValue}
                onChange={(e) => handleFieldChange('primaryValue', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., $250.00, 1500 pts"
              />
            </div>
          </div>
        </div>

        {/* Secondary Fields */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Type className="w-5 h-5 mr-2" />
            Secondary Fields
          </h3>
          <div className="space-y-4">
            {cardData.secondaryFields.map((field, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => {
                      const newFields = [...cardData.secondaryFields];
                      newFields[index].label = e.target.value;
                      handleFieldChange('secondaryFields', newFields);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Field label"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => {
                      const newFields = [...cardData.secondaryFields];
                      newFields[index].value = e.target.value;
                      handleFieldChange('secondaryFields', newFields);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Field value"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auxiliary Fields */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Auxiliary Fields
          </h3>
          <div className="space-y-4">
            {cardData.auxiliaryFields.map((field, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => {
                      const newFields = [...cardData.auxiliaryFields];
                      newFields[index].label = e.target.value;
                      handleFieldChange('auxiliaryFields', newFields);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Field label"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => {
                      const newFields = [...cardData.auxiliaryFields];
                      newFields[index].value = e.target.value;
                      handleFieldChange('auxiliaryFields', newFields);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Field value"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Right Panel - Phone Preview */}
    <PhonePreview phoneType={phoneType} setPhoneType={setPhoneType} cardData={cardData} />
  </div>
);

// Main AppleWalletEditor Component
const AppleWalletEditor = ({ isModal = false }) => {
  const [currentView, setCurrentView] = useState('selection');
  const [phoneType, setPhoneType] = useState('iphone');
  const [cardData, setCardData] = useState({
    title: 'My Business',
    subtitle: 'Premium Member',
    backgroundColor: '#4F46E5',
    textColor: '#FFFFFF',
    logoUrl: null,
    barcode: '123456789',
    primaryField: 'Balance',
    primaryValue: '$250.00',
    secondaryFields: [
      { label: 'Member Since', value: '2024' },
      { label: 'Status', value: 'Gold' }
    ],
    auxiliaryFields: [
      { label: 'Points', value: '1,500' },
      { label: 'Expires', value: '12/25' }
    ]
  });

  const gradientOptions = [
    { name: 'Indigo', value: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' },
    { name: 'Blue', value: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)' },
    { name: 'Purple', value: 'linear-gradient(135deg, #8B5CF6 0%, #7C2D12 100%)' },
    { name: 'Green', value: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' },
    { name: 'Red', value: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' },
    { name: 'Orange', value: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' }
  ];

  const handleFieldChange = (field, value) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreateFromScratch = () => {
    setCurrentView('editor');
  };

  const handleBack = () => {
    setCurrentView('selection');
  };

  if (currentView === 'selection') {
    return (
      <SelectionView
        isModal={isModal}
        onCreateFromScratch={handleCreateFromScratch}
      />
    );
  }

  return (
    <EditorView
      isModal={isModal}
      onBack={handleBack}
      cardData={cardData}
      handleFieldChange={handleFieldChange}
      gradientOptions={gradientOptions}
      phoneType={phoneType}
      setPhoneType={setPhoneType}
    />
  );
};

export default AppleWalletEditor;