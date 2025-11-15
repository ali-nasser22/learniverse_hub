import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | Leaniverse Hub",
    description: "Terms and conditions for instructors and students using Leaniverse Hub platform",
};

export default function TermsPage() {
    return (
        <div className="container max-w py-12 md:py-16 px-12">
            {/* Header Section */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                    Terms & Conditions
                </h1>
                <p className="text-muted-foreground text-lg">
                    Last Updated: November 15, 2025
                </p>
            </div>

            {/* Introduction */}
            <section className="mb-12">
                <p className="text-muted-foreground leading-relaxed">
                    Welcome to Leaniverse Hub. These Terms and Conditions govern your use of our Learning Management
                    System platform.
                    By accessing or using our services, you agree to be bound by these terms. Please read them carefully
                    before using the platform.
                </p>
            </section>

            {/* Table of Contents */}
            <section className="mb-12 p-6 bg-muted/50 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
                <nav className="space-y-2">
                    <a href="#general" className="block text-primary hover:underline">
                        1. General Terms
                    </a>
                    <a href="#student-terms" className="block text-primary hover:underline">
                        2. Terms for Students
                    </a>
                    <a href="#instructor-terms" className="block text-primary hover:underline">
                        3. Terms for Instructors
                    </a>
                    <a href="#content-policy" className="block text-primary hover:underline">
                        4. Content Policy
                    </a>
                    <a href="#privacy" className="block text-primary hover:underline">
                        5. Privacy & Data Protection
                    </a>
                    <a href="#termination" className="block text-primary hover:underline">
                        6. Termination
                    </a>
                    <a href="#contact" className="block text-primary hover:underline">
                        7. Contact Information
                    </a>
                </nav>
            </section>

            {/* General Terms */}
            <section id="general" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    1. General Terms
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">1.1 Acceptance of Terms</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            By creating an account and using Leaniverse Hub, you acknowledge that you have read,
                            understood, and agree to be bound by these Terms and Conditions. If you do not agree
                            with any part of these terms, you must not use our platform.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">1.2 Eligibility</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            You must be at least 18 years old to create an instructor account. Students under 18
                            may use the platform with parental consent. By registering, you represent and warrant
                            that you have the right, authority, and capacity to enter into these terms.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">1.3 Account Responsibilities</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            You are responsible for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Maintaining the confidentiality of your account credentials</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us immediately of any unauthorized access</li>
                            <li>Ensuring your account information is accurate and up-to-date</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">1.4 Prohibited Conduct</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            Users must not:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe on intellectual property rights of others</li>
                            <li>Upload malicious software or engage in hacking activities</li>
                            <li>Harass, abuse, or harm other users</li>
                            <li>Create multiple accounts to manipulate the system</li>
                            <li>Engage in any fraudulent activities</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Student Terms */}
            <section id="student-terms" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    2. Terms for Students
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">2.1 Course Enrollment</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            When you enroll in a course, you gain access to all course materials, including videos,
                            text lessons, quizzes, and supplementary resources. Your enrollment is subject to the
                            course pricing and any promotional offers active at the time of purchase.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">2.2 Access to Course Content</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            Upon successful enrollment:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>You receive lifetime access to enrolled courses unless otherwise specified</li>
                            <li>Course content may be updated by instructors without prior notice</li>
                            <li>Access may be revoked if you violate these terms</li>
                            <li>You may not share your account credentials with others</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">2.3 Course Progress & Completion</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Your progress is tracked automatically as you complete lessons and quizzes. Completion
                            certificates may be awarded upon finishing all required course materials and assessments
                            as determined by the instructor.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">2.4 Reviews & Feedback</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            You may leave reviews and ratings for courses you have enrolled in. All reviews must be
                            honest, constructive, and comply with our content policy. We reserve the right to remove
                            reviews that violate these guidelines.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">2.5 Refund Policy</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Refund requests must be submitted within 30 days of enrollment. Refunds are granted at
                            our discretion based on course completion percentage and reason for request. Courses
                            with more than 30% completion are generally not eligible for refunds.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">2.6 Intellectual Property</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            All course content remains the intellectual property of the respective instructors.
                            Students are granted a limited, non-exclusive license to access and view content for
                            personal educational purposes only. You may not reproduce, distribute, or create
                            derivative works from course materials.
                        </p>
                    </div>
                </div>
            </section>

            {/* Instructor Terms */}
            <section id="instructor-terms" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    3. Terms for Instructors
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">3.1 Instructor Responsibilities</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            As an instructor on Leaniverse Hub, you agree to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Create high-quality, original educational content</li>
                            <li>Ensure all content complies with applicable laws and regulations</li>
                            <li>Maintain accurate course descriptions and learning outcomes</li>
                            <li>Respond to student inquiries in a timely and professional manner</li>
                            <li>Keep course content current and relevant</li>
                            <li>Not engage in fraudulent or deceptive practices</li>
                        </ul>
                    </div>

                    <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                        <h3 className="text-xl font-semibold mb-3">3.2 Revenue Sharing & Platform Fees</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Leaniverse Hub operates on a revenue-sharing model to maintain and improve the platform:
                        </p>
                        <div className="space-y-3">
                            <div className="bg-background p-4 rounded-lg">
                                <p className="font-semibold mb-2">Platform Fee: 10% per enrollment</p>
                                <p className="text-muted-foreground text-sm">
                                    For each student enrollment, Leaniverse Hub deducts 10% of the course price as a
                                    platform fee. This fee covers hosting, payment processing, student support, and
                                    platform maintenance.
                                </p>
                            </div>
                            <div className="bg-background p-4 rounded-lg">
                                <p className="font-semibold mb-2">Example Calculation:</p>
                                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                                    <li>• Course Price: $100</li>
                                    <li>• Platform Fee (10%): $10</li>
                                    <li>• Instructor Revenue: $90</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">3.3 Monthly Payment Schedule</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            Instructor revenue is processed and paid according to the following schedule:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>
                                <strong>Payment Frequency:</strong> Monthly payments are processed on the 1st business
                                day of each month
                            </li>
                            <li>
                                <strong>Payment Period:</strong> Each payment includes all enrollments from the previous
                                calendar month
                            </li>
                            <li>
                                <strong>Minimum Payout:</strong> A minimum balance of $50 is required to process payment
                            </li>
                            <li>
                                <strong>Payment Method:</strong> Payments are made via bank transfer or PayPal based on
                                your account settings
                            </li>
                            <li>
                                <strong>Processing Time:</strong> Payments typically arrive within 5-7 business days
                                after processing
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">3.4 Content Ownership & Licensing</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            You retain full ownership of all content you create and upload to Leaniverse Hub.
                            By publishing a course, you grant us a worldwide, non-exclusive license to host,
                            display, and distribute your content on our platform. You may remove your content
                            at any time, subject to existing student enrollments.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">3.5 Course Pricing</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Instructors have full control over course pricing. However, we may occasionally run
                            promotional campaigns that affect course prices. You will be notified of any such
                            promotions in advance and may opt-out if desired. Your revenue share is always
                            calculated based on the actual sale price.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">3.6 Content Quality Standards</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            All courses must meet our quality standards:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Clear audio and video quality (for video lessons)</li>
                            <li>Well-structured curriculum with logical progression</li>
                            <li>Accurate and up-to-date information</li>
                            <li>Proper use of grammar and spelling</li>
                            <li>Professional presentation and teaching style</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">3.7 Instructor Analytics & Reporting</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            You have access to comprehensive analytics including enrollment numbers, revenue tracking,
                            student progress, course ratings, and engagement metrics. Monthly revenue reports are
                            available in your instructor dashboard before each payment cycle.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Policy */}
            <section id="content-policy" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    4. Content Policy
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">4.1 Prohibited Content</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                            The following types of content are strictly prohibited:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Content that violates intellectual property rights</li>
                            <li>Illegal, harmful, or dangerous content</li>
                            <li>Discriminatory or hate speech content</li>
                            <li>Sexually explicit or pornographic material</li>
                            <li>Content promoting violence or self-harm</li>
                            <li>Spam, scams, or fraudulent schemes</li>
                            <li>Malware or malicious code</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">4.2 Content Moderation</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to review, modify, or remove any content that violates these terms.
                            Users can report inappropriate content through our reporting system. All reports are
                            reviewed and appropriate action is taken within 48 hours.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">4.3 Copyright Compliance</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Instructors must ensure they have the necessary rights to all content they upload.
                            This includes text, images, videos, audio, and any third-party materials. We comply
                            with DMCA and respond to valid copyright infringement notices.
                        </p>
                    </div>
                </div>
            </section>

            {/* Privacy & Data Protection */}
            <section id="privacy" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    5. Privacy & Data Protection
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">5.1 Data Collection</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We collect and process personal data as described in our Privacy Policy. This includes
                            information necessary to provide our services, process payments, and improve user
                            experience. We are committed to protecting your privacy and complying with applicable
                            data protection laws.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">5.2 Student Data Protection</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Student progress data, course completion information, and learning analytics are stored
                            securely and used only to enhance the learning experience. Instructors have access to
                            aggregated student data but not to personal information unless provided directly by
                            students.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">5.3 Payment Information</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            All payment transactions are processed through secure, PCI-compliant payment gateways.
                            We do not store complete credit card information on our servers. Financial data is
                            encrypted and protected according to industry standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Termination */}
            <section id="termination" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    6. Termination
                </h2>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold mb-3">6.1 Account Termination by User</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            You may terminate your account at any time by contacting our support team. Upon termination,
                            students retain access to previously enrolled courses, while instructors must wait for
                            final payment processing before account closure.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">6.2 Termination by Leaniverse Hub</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to suspend or terminate accounts that violate these terms.
                            Termination may occur immediately for serious violations such as fraud, illegal activity,
                            or repeated policy breaches. Users will be notified of termination reasons except where
                            prohibited by law.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-3">6.3 Effect of Termination</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Upon termination, your right to access the platform ceases immediately. Any outstanding
                            payments will be processed according to our regular schedule. Content removal and data
                            deletion follow our data retention policies and legal obligations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    7. Limitation of Liability
                </h2>

                <div className="space-y-6">
                    <div>
                        <p className="text-muted-foreground leading-relaxed">
                            Leaniverse Hub is provided "as is" without warranties of any kind. We do not guarantee
                            uninterrupted access, error-free operation, or specific learning outcomes. To the maximum
                            extent permitted by law, we are not liable for any indirect, incidental, special, or
                            consequential damages arising from your use of the platform.
                        </p>
                    </div>
                </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    8. Changes to Terms
                </h2>

                <div className="space-y-6">
                    <div>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update these Terms and Conditions from time to time. Significant changes will be
                            communicated via email and platform notifications. Continued use of the platform after
                            changes take effect constitutes acceptance of the new terms. We encourage you to review
                            these terms periodically.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section id="contact" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    9. Contact Information
                </h2>

                <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        If you have any questions, concerns, or disputes regarding these Terms and Conditions,
                        please contact us:
                    </p>

                    <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                        <div>
                            <p className="font-semibold mb-1">Leaniverse Hub Support Team</p>
                            <p className="text-muted-foreground">Email: support@leaniversehub.com</p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Legal Department</p>
                            <p className="text-muted-foreground">Email: legal@leaniversehub.com</p>
                        </div>
                        <div>
                            <p className="font-semibold mb-1">Instructor Support</p>
                            <p className="text-muted-foreground">Email: instructors@leaniversehub.com</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b">
                    10. Governing Law
                </h2>

                <div className="space-y-6">
                    <div>
                        <p className="text-muted-foreground leading-relaxed">
                            These Terms and Conditions are governed by and construed in accordance with applicable
                            laws. Any disputes arising from these terms or your use of the platform shall be subject
                            to the exclusive jurisdiction of the appropriate courts.
                        </p>
                    </div>
                </div>
            </section>

            {/* Acknowledgment */}
            <section className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground leading-relaxed">
                    By using Leaniverse Hub, you acknowledge that you have read, understood, and agree to be
                    bound by these Terms and Conditions. If you do not agree with any part of these terms,
                    please discontinue use of the platform immediately.
                </p>
            </section>
        </div>
    );
}