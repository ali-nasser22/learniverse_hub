'use client'

import {IUser} from "../../model/user-model";
import {FormEvent, useState, useTransition} from "react";
import {subscribeToNewsLetterAction} from "../../queries/newsletter";
import {INewsLetter} from "../../model/newsletter-subscriptions";

interface IProps {
    loggedInUser: IUser | null;
    isSubscribed: boolean | INewsLetter;
}

export default function NewsletterSubscription({loggedInUser, isSubscribed}: IProps) {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!loggedInUser?.id) return;

        startTransition(async () => {
            try {

                const result = await subscribeToNewsLetterAction(loggedInUser.id);

                if (result.success) {

                    const emailResponse = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            emails: [
                                {
                                    to: loggedInUser.email,
                                    subject: 'NewsLetter Subscription',
                                    message: `Thank you Mr. ${loggedInUser.lastName} for Subscribing to our newsletter. We will soon activate this functionality, and you will be able to see our new courses and events!`,
                                }
                            ]
                        }),
                    });

                    const emailData = await emailResponse.json();

                    if (emailData.success) {
                        setMessage({type: 'success', text: 'Successfully subscribed to newsletter! Check your email.'});
                    } else {

                        setMessage({type: 'success', text: 'Successfully subscribed! (Email notification pending)'});
                        console.error('Email sending failed:', emailData);
                    }
                } else {
                    setMessage({type: 'error', text: result.error || 'Failed to subscribe'});
                }
            } catch (error) {
                console.error('Subscription error:', error);
                setMessage({type: 'error', text: 'An error occurred. Please try again.'});
            }

            setTimeout(() => setMessage(null), 5000);
        });
    };

    if (!loggedInUser) {
        return null;
    }

    return (
        <>
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                <input
                    value={loggedInUser?.email}
                    readOnly
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                    disabled={isPending || (isSubscribed !== false)}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                    {isPending ? 'Subscribing...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>

                {message && (
                    <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {message.text}
                    </p>
                )}
            </form>
        </>
    );
}