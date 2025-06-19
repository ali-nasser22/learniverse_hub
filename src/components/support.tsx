import Image from "next/image";
import React from "react";

const Support = () => {
  return (
    <div className="w-full bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-4xl font-bold text-gray-900 leading-tight">
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 rounded-lg text-black shadow-lg shadow-blue-500/50 glow">
                    Let us know for support
                  </span>
                </span>
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                At <strong className="text-gray-900">Learniverse Hub</strong>,
                we&apos;re committed to providing exceptional support and
                resources to help you master new skills. Our platform connects
                learners with expert instructors and comprehensive courses
                designed to accelerate your professional growth.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
              >
                Contact Us
              </a>

              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
              >
                Call for Support
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/assets/images/support1.png"
                alt="Support"
                width={500}
                height={400}
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
