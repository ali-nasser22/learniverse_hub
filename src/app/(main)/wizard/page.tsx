import ChatBox from "@/app/(main)/wizard/_components/chat-box";

export default function WizardPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold text-center mb-6">
                Welcome to the wizard
            </h1>
            <ChatBox/>
        </div>
    )
}