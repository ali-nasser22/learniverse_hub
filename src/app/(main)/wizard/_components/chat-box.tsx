'use client';

import {useEffect, useState} from 'react';
import Message from '@/app/(main)/wizard/_components/message';

interface MessageType {
    role: 'user' | 'bot';
    content: string;
    courses?: Array<{
        id: string;
        title: string;
        description: string;
        price: number;
        thumbnail: string;
        instructor: string;
    }>;
}

export default function ChatBox() {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const savedMessages = sessionStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {

            const welcomeMessage: MessageType = {
                role: 'bot',
                content: 'Welcome to the wizard! Please tell me what you wanna learn, let me recommend the best that fits your journey.',
            };
            setMessages([welcomeMessage]);
        }
    }, []);


    useEffect(() => {
        if (messages.length > 0) {
            sessionStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;


        const userMessage: MessageType = {
            role: 'user',
            content: input,
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    conversationHistory: newMessages.slice(0, -1), // Exclude current message
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();


            const botMessage: MessageType = {
                role: 'bot',
                content: data.response,
                courses: data.courses || [],
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);


            const errorMessage: MessageType = {
                role: 'bot',
                content: 'Sorry, I encountered an error. Please try again.',
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-[600px] max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-lg bg-white">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <Message key={index} message={message}/>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 rounded-lg px-4 py-2">
                            <span className="text-gray-600">Thinking...</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Container */}
            <div className="border-t border-gray-300 p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !input.trim()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}