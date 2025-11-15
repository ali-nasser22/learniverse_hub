import Link from "next/link";
import React from "react";
import NewsletterSubscription from "@/components/newsletter-subscription";
import {getLoggedInUser} from "@/lib/loggedin-user";
import {isSubscribedToNewsLetter} from "../../queries/newsletter";


const SiteFooter = async () => {

    const loggedInUser = await getLoggedInUser();
    const isSubscribed = await isSubscribedToNewsLetter(loggedInUser?.id);

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="lg:col-span-1">
                            <div className="mb-6">
                                <div className="text-white">
                                    <Link href="/">
                    <span className="text-3xl font-bold hover:text-blue-500 transition-colors">
                      Learniverse Hub
                    </span>
                                    </Link>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Empowering developers with cutting-edge courses and hands-on
                                learning experiences.
                            </p>
                            {/* Social Links */}
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">X</span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">LinkedIn</span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Courses
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Instructors
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Cookie Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        Refund Policy
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Subscribe to our newsletter for the latest courses and updates.
                            </p>
                            <div className="flex flex-col space-y-3">
                                <NewsletterSubscription isSubscribed={isSubscribed} loggedInUser={loggedInUser}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Learniverse Hub. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Terms
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Privacy
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors text-sm"
                            >
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
