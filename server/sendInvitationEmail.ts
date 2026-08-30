import "dotenv/config";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
 throw new Error("RESEND_API_KEY is required to send invitation emails.");
}

const resend = new Resend(resendApiKey);

export const sendInvitationEmail = async ({
 email,
 fullName,
 companyName,
 role,
 invitationId,
}: {
 email: string;
 fullName: string;
 companyName: string;
 role: string;
 invitationId: string;
}) => {
 const invitationLink = `http://localhost:5173/accept-invitation/${invitationId}`;

 const { data, error } = await resend.emails.send({
 from: "RecruiterPro <onboarding@resend.dev>",
 to: email,
 subject: `You're invited to join ${companyName}`,
 html: `
 <h2>You're invited, ${fullName}!</h2>

 <p>
 You have been invited to join
 <strong>${companyName}</strong>
 as a <strong>${role}</strong>.
 </p>

 <p>
 Click the button below to accept your invitation.
 </p>

 <a
 href="${invitationLink}"
 style="
 display:inline-block;
 padding:12px 20px;
 background:#285A48;
 color:white;
 text-decoration:none;
 border-radius:8px;
 font-weight:bold;
 "
 >
 Accept Invitation
 </a>

 <p>
 If you did not expect this invitation, you can ignore this email.
 </p>
 `,
 });

 if (error) {
 throw new Error(error.message);
 }

 return data;
};