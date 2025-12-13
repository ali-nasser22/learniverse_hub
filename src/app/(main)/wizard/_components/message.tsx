import Link from 'next/link';

interface MessageProps {
    message: {
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
    };
}

export default function Message({message}: MessageProps) {
    const isBot = message.role === 'bot';

    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
            <div
                className={`max-w-[70%] rounded-lg px-4 py-3 ${
                    isBot
                        ? 'bg-gray-200 text-gray-800'
                        : 'bg-blue-600 text-white'
                }`}
            >
                {/* Message Content */}
                <p className="whitespace-pre-wrap">{message.content}</p>

                {/* Course Recommendations (if any) */}
                {message.courses && message.courses.length > 0 && (
                    <div className="mt-3 space-y-2">
                        {message.courses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.id}`}
                                className="block p-3 bg-white rounded-lg border border-gray-300 hover:border-blue-500 hover:shadow-md transition-all"
                            >
                                <h3 className="font-semibold text-gray-900 mb-1">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {course.description}
                                </p>
                                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">
                    by {course.instructor}
                  </span>
                                    <span className="font-semibold text-blue-600">
                    ${course.price}
                  </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}