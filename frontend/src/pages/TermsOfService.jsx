import React from "react";

const TermsOfService = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 flex justify-center bg-gray-50">
            <div className="max-w-4xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-md text-gray-800">
                <h1 className="text-3xl md:text-5xl font-black mb-8 text-blue-900">
                    Terms of Service
                </h1>
                <div className="space-y-6 leading-relaxed">
                    <p>
                        Welcome to LightHouse Energy Developers! By accessing our website, you agree to
                        be bound by these Terms of Service, all applicable laws and regulations,
                        and agree that you are responsible for compliance with any applicable local laws.
                    </p>

                    <h2 className="text-xl font-bold text-black mt-6">Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials
                        (information or software) on our website for personal,
                        non-commercial transitory viewing only.
                    </p>

                    <h2 className="text-xl font-bold text-black mt-6">Disclaimer</h2>
                    <p>
                        The materials on our website are provided on an 'as is' basis. We make no
                        warranties, expressed or implied, and hereby disclaim and negate all other
                        warranties including, without limitation, implied warranties or conditions of
                        merchantability, fitness for a particular purpose, or non-infringement of
                        intellectual property or other violation of rights.
                    </p>

                    <h2 className="text-xl font-bold text-black mt-6">Limitations</h2>
                    <p>
                        In no event shall LightHouse Energy Developers or its suppliers be liable for any
                        damages (including, without limitation, damages for loss of data or profit, or
                        due to business interruption) arising out of the use or inability to use the
                        materials on our website.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
