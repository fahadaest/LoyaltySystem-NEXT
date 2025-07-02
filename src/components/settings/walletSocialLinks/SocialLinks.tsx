import Card from 'components/card';
import Image from 'next/image';
import { MdEdit } from 'react-icons/md';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaGlobe,
  FaWhatsapp
} from 'react-icons/fa';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SocialLinks = ({ data, onEdit }) => {
  const coverImg = data?.coverImage ? baseUrl + data.coverImage : '/images/default-cover.jpg';
  const profileImg = data?.profileImage ? baseUrl + data.profileImage : '/images/default-profile.jpg';

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: data?.facebookLink || 'https://facebook.com/johndoe',
      color: 'text-blue-600 hover:text-blue-700',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: data?.twitterLink || 'https://twitter.com/johndoe',
      color: 'text-blue-400 hover:text-blue-500',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      url: data?.instagramLink || 'https://instagram.com/johndoe',
      color: 'text-pink-500 hover:text-pink-600',
      bgColor: 'hover:bg-pink-50'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: data?.linkedinLink || 'https://linkedin.com/in/johndoe',
      color: 'text-blue-700 hover:text-blue-800',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      url: data?.tiktokLink || 'https://tiktok.com/@johndoe',
      color: 'text-black hover:text-gray-800',
      bgColor: 'hover:bg-gray-50'
    },
    {
      name: 'Website',
      icon: FaGlobe,
      url: data?.websiteLink || 'https://johndoe.com',
      color: 'text-green-600 hover:text-green-700',
      bgColor: 'hover:bg-green-50'
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: data?.whatsappLink || 'https://wa.me/1234567890',
      color: 'text-green-500 hover:text-green-600',
      bgColor: 'hover:bg-green-50'
    }
  ];

  const handleSocialClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
      {onEdit && (
        <div className="absolute top-7 right-5 z-10">
          <button onClick={onEdit} className="p-2 bg-brandGreen text-white rounded-full shadow-md">
            <MdEdit size={24} />
          </button>
        </div>
      )}

      <div className="mt-8 w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPlatforms.map((platform) => {
            const IconComponent = platform.icon;
            const isActive = platform.url && platform.url.trim() !== '';

            return (
              <div
                key={platform.name}
                className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${isActive
                  ? `cursor-pointer ${platform.bgColor} border-gray-200 hover:border-gray-300 hover:shadow-md`
                  : 'border-gray-100 opacity-50 cursor-not-allowed'
                  }`}
                onClick={() => isActive && handleSocialClick(platform.url)}
              >
                <IconComponent
                  size={28}
                  className={`mr-4 flex-shrink-0 ${isActive ? platform.color : 'text-gray-400'}`}
                />
                <div className="flex-grow min-w-0">
                  <div className="flex items-center mb-1">
                    <span
                      className={`text-sm font-medium ${isActive ? 'text-navy-700 dark:text-white' : 'text-gray-400'
                        }`}
                    >
                      {platform.name}
                    </span>
                    {isActive && (
                      <div className="ml-2 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                  {isActive ? (
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {platform.url}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400">
                      No link added
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Contact Section */}
        {(data?.email || data?.phoneNumber) && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h6 className="text-md font-semibold text-navy-700 dark:text-white mb-3 text-center">
              Quick Contact
            </h6>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {data?.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="font-medium">{data.email}</span>
                </a>
              )}
              {data?.phoneNumber && (
                <a
                  href={`tel:${data.phoneNumber}`}
                  className="flex items-center justify-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="font-medium">{data.phoneNumber}</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SocialLinks;