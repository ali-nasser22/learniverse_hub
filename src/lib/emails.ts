import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailInfo {
  to: string;
  subject: string;
  message: string;
}

interface EmailResult {
  success: boolean;
  to: string;
  data?: any;
  error?: string;
}

export const sendEmails = async (
  emailInfo: EmailInfo[]
): Promise<EmailResult[]> => {
  if (!emailInfo || emailInfo.length === 0) {
    console.log("No email information provided");
    return [];
  }

  // Validate environment variable
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set in environment variables");
    return emailInfo.map((info) => ({
      success: false,
      to: info.to,
      error: "RESEND_API_KEY not configured",
    }));
  }

  console.log(`Attempting to send ${emailInfo.length} emails...`);

  const results = await Promise.allSettled(
    emailInfo.map(async (data): Promise<EmailResult> => {
      try {
        // Validate required fields
        if (!data.to || !data.subject || !data.message) {
          throw new Error(
            `Missing required fields: ${JSON.stringify({
              to: !!data.to,
              subject: !!data.subject,
              message: !!data.message,
            })}`
          );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.to)) {
          throw new Error(`Invalid email format: ${data.to}`);
        }

        console.log(`Sending email to: ${data.to}`);
        console.log(`Subject: ${data.subject}`);
        console.log(`Message preview: ${data.message.substring(0, 50)}...`);

        const sendInfo = await resend.emails.send({
          from: "support@alinasser.dev", // Using your verified root domain
          to: data.to,
          subject: data.subject,
          react: EmailTemplate({ message: data.message }),
        });

        // Check if sendInfo contains an error
        if (sendInfo.error) {
          console.error(`Resend API error for ${data.to}:`, sendInfo.error);
          return {
            success: false,
            to: data.to,
            error: sendInfo.error.message || JSON.stringify(sendInfo.error),
          };
        }

        console.log(`Email sent successfully to ${data.to}:`, sendInfo.data);
        return {
          success: true,
          to: data.to,
          data: sendInfo.data,
        };
      } catch (error) {
        console.error(`Failed to send email to ${data.to}:`, error);
        return {
          success: false,
          to: data.to,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    })
  );

  // Process results
  const processedResults: EmailResult[] = results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      return {
        success: false,
        to: emailInfo[index]?.to || "unknown",
        error:
          result.reason instanceof Error
            ? result.reason.message
            : String(result.reason),
      };
    }
  });

  // Log summary
  const successful = processedResults.filter((r) => r.success).length;
  const failed = processedResults.filter((r) => !r.success).length;

  console.log(
    `Email sending summary: ${successful} successful, ${failed} failed`
  );

  if (failed > 0) {
    console.log(
      "Failed emails:",
      processedResults.filter((r) => !r.success)
    );
  }

  return processedResults;
};
