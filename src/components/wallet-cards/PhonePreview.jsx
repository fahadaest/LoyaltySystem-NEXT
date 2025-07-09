import React from 'react';
import IPhoneFrame from './IphoneFrame';
import AndroidFrame from './AndroidFrame';

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
                <IPhoneFrame cardData={cardData} />
            ) : (
                <AndroidFrame cardData={cardData} />
            )}
        </div>
    </div>
);

export default PhonePreview;