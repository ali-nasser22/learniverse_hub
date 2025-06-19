import Image from "next/image";
import React from "react";

const Element = () => {
  return (
    <div className="w-full">
      {/* First Section - Learn By Doing */}
      <section className="w-full bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wide bg-blue-100/50 px-3 py-1 rounded-full">
                  Fast-track your learning
                </span>
                <h2 className="font-heading text-4xl font-bold sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
                  Learn By Doing
                </h2>
                <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-lg">
                  Learn Programming skills, from absolute beginner to advanced
                  mastery. We create project-based courses that help you learn
                  professionally and make you feel like a complete developer.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/assets/images/two.png"
                  alt="Learning by doing"
                  width={600}
                  height={480}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              {/* Decorative background element */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-blue-200/30 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-16 bg-gradient-to-b from-blue-50/50 to-pink-50/50"></div>

      {/* Second Section - Put Your Learning Into Practice */}
      <section className="w-full bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="lg:order-2 space-y-6">
              <div className="space-y-4">
                <span className="inline-block text-green-600 font-semibold text-sm uppercase tracking-wide bg-green-100/50 px-3 py-1 rounded-full">
                  Step-by-step lessons
                </span>
                <h2 className="font-heading text-4xl font-bold sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
                  Put Your Learning <br />
                  Into Practice
                </h2>
                <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-lg">
                  Apply your learning with real-world projects and learn
                  everything you need to take your career to the next level.
                </p>
              </div>
            </div>

            <div className="lg:order-1 relative">
              <div className="relative z-10">
                <Image
                  src="/assets/images/one.png"
                  alt="Put Your Learning Into Practice"
                  width={600}
                  height={480}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              {/* Decorative background element */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-green-200/30 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Element;
