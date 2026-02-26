import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 flex justify-center bg-gray-50">
            <div className="max-w-4xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-md text-gray-800">
                <h1 className="text-3xl md:text-5xl font-black mb-8 text-blue-900">
                    Privacy Policy
                </h1>
                <div className="space-y-6 leading-relaxed">
                    <p>
                        Your privacy is important to us. It is LightHouse Energy Developers' policy
                        to respect your privacy regarding any information we may collect from you
                        across our website and other sites we own and operate.
                    </p>

                    <h2 className="text-xl font-bold text-black mt-6">Information we collect</h2>
                    <p>
                        We only ask for personal information when we truly need it to provide a service
                        to you. We collect it by fair and lawful means, with your knowledge and
                        consent. We also let you know why we’re collecting it and how it will be used.
                    </p>

                    <h2 className="text-xl font-bold text-black mt-6">Data storage and security</h2>
                    <p>
                        We only retain collected information for as long as necessary to provide you
                        with your requested service. What data we store, we’ll protect within
                        commercially acceptable means to prevent loss and theft, as well as
                        unauthorized access, disclosure, copying, use or modification.
                    </p>

                    <h2 className="text-xl font-bold text-black mt-6">Third-party sharing</h2>
                    <p>
                        We don’t share any personally identifying information publicly or with
                        third-parties, except when required to by law.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
