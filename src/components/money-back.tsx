import Image from 'next/image';
import React from 'react';
import {CheckCircle, Clock, Shield} from 'lucide-react';

const MoneyBack = () => {
    return (
        <section className='bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-16 md:px-16 lg:px-24'>
            <div className='max-w-7xl mx-auto'>
                {/* Main Content */}
                <div className='bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100'>
                    <div className='flex flex-col md:flex-row items-center'>
                        {/* Image Section */}
                        <div
                            className='md:w-1/2 p-8 md:p-12 flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100'>
                            <div className='relative'>
                                <div
                                    className='absolute inset-0 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse'></div>
                                <Image
                                    src="/assets/images/money.png"
                                    alt='30-Day Money-Back Guarantee'
                                    width={450}
                                    height={450}
                                    className='rounded-lg relative z-10 drop-shadow-2xl'
                                />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className='md:w-1/2 p-8 md:p-12'>
                            {/* Badge */}
                            <div
                                className='inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4'>
                                <Shield className='w-4 h-4'/>
                                <span className='text-sm font-semibold uppercase tracking-wide'>
                                    Risk-Free Learning
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className='text-gray-900 font-bold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight'>
                                30-Day Money-Back
                                <span className='block text-blue-600'>Guarantee</span>
                            </h2>

                            {/* Description */}
                            <p className='text-gray-600 text-lg mb-6 leading-relaxed'>
                                We're confident you'll love our courses. If you're not completely satisfied,
                                request a full refund within 30 days—no questions asked.
                            </p>

                            {/* Features List */}
                            <div className='space-y-3 mb-8'>
                                <div className='flex items-start gap-3'>
                                    <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5'/>
                                    <p className='text-gray-700'>
                                        <span className='font-semibold'>Instant refund processing</span> - Get your
                                        money back quickly
                                    </p>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <CheckCircle className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5'/>
                                    <p className='text-gray-700'>
                                        <span className='font-semibold'>No questions asked</span> - Simple and
                                        straightforward
                                    </p>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <Clock className='w-5 h-5 text-green-600 flex-shrink-0 mt-0.5'/>
                                    <p className='text-gray-700'>
                                        <span className='font-semibold'>Full 30 days</span> - Plenty of time to explore
                                    </p>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <span
                                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
                                Start Learning Risk-Free
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MoneyBack;