"use client";
import React from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";

const TermsConditionsPage = () => {
    const handleEditTerms = () => {
        console.log("Edit Terms clicked");
        // Handle edit terms action
    };

    return (
        <main className="min-h-[80vh] flex flex-col">
            <div className="flex items-start justify-between flex-shrink-0 mb-8">
                <ComponentHeader
                    title="Terms & Conditions"
                    subtitle="Please read these terms carefully before using our service"
                    infoMessage="This page contains the terms and conditions that govern the use of our service."
                />

                <Button
                    text={"Edit Terms"}
                    onClick={handleEditTerms}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/edit.svg"}
                    showIcon={true}
                    iconPosition={'right'}
                    disabled={false}
                    height={'2rem'}
                    fontSize={'0.7rem'}
                    padding={'0px 4px 0px 12px'}
                    iconWidth={'1.4rem'}
                    iconHeight={'1.4rem'}
                    iconImageWidth={'1rem'}
                    iconImageHeight={'1rem'}
                    gap={'12px'}
                />
            </div>

            {/* Terms Content */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-8">
                {/* Terms Section */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-black mb-4">Acceptance of Terms</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-black mb-4">Use License</h2>
                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                            Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                            <li>modify or copy the materials</li>
                            <li>use the materials for any commercial purpose or for any public display</li>
                            <li>attempt to reverse engineer any software contained on our website</li>
                            <li>remove any copyright or other proprietary notations from the materials</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-black mb-4">Disclaimer</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-black mb-4">Limitations</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-black mb-4">Privacy Policy</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-black mb-4">Revisions and Errata</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current. We may make changes to the materials contained on its website at any time without notice. However, we do not make any commitment to update the materials.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-black mb-4">Contact Information</h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            If you have any questions about these Terms & Conditions, please contact us at support@rewardhive.com or through our customer service portal.
                        </p>
                    </div>

                    {/* Last Updated */}
                    <div className="pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                            Last updated: {new Date().toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TermsConditionsPage;