import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserReview from '../UserReview/UserReview.jsx';
import EnterpriseContact from '../EnterpriseContact/EnterpriseContact.jsx';


export default function Footer() {
    const [isUserReviewOpen, setUserReviewOpen] = useState(false);
    const [isEnterpriseContactOpen, setEnterpriseContactOpen] = useState(false);

    const handleEnterpriseContactButtonClick = () => {
        setEnterpriseContactOpen(true);
        setUserReviewOpen(false); // Close the UserReview modal if open
    };

    const handleReviewButtonClick = () => {
        setUserReviewOpen(true);
        setEnterpriseContactOpen(false); // Close the EnterpriseContact modal if open
    };

    return (
        <footer className="bg-white border-y mt-auto pt-4 pb-5 ">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="md:flex md:justify-between">
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        {/* Resource links */}
                    </div>
                </div>
                <hr className="my-2 border-gray-200 sm:mx-auto lg:my-4" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex mt-2 space-x-5 sm:justify-center sm:mt-0">
                        <NavLink
                            to="/doctorFooter"
                            className="block py-2 pr-4 pl-3 duration-200 mr-3 ml-7 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0 font-bold hover:underline"
                        >
                            Join as a Doctor
                        </NavLink>
                        <button 
                            onClick={handleReviewButtonClick} 
                            className={`text-gray-700 border-b border-transparent hover:text-orange-700 duration-200 font-bold focus:outline-none focus:text-orange-700 ${isUserReviewOpen ? 'text-orange-700 border-orange-700' : ''}`}
                        >
                            User Review/Doubt
                        </button>

                        <button 
                            onClick={handleEnterpriseContactButtonClick} 
                            className={`text-gray-700 border-b border-transparent hover:text-orange-700 duration-200 font-bold focus:outline-none focus:text-orange-700 ${isEnterpriseContactOpen? 'text-orange-700 border-orange-700' : ''}`}
                        >
                            Join us as Enterprise
                        </button>
                    </div>
                    <div className="flex mt-2 space-x-5 sm:justify-center sm:mt-0">
                        {/* Social media links */}
                    </div>
                </div>
                {isUserReviewOpen && <UserReview onClose={() => setUserReviewOpen(false)} />}
                {isEnterpriseContactOpen && <EnterpriseContact onClose={() => setEnterpriseContactOpen(false)} />}
            </div>
        </footer>
    );
}
