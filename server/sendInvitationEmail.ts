import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
 user: process.env.EMAIL_USER,
 pass: process.env.EMAIL_APP_PASSWORD,
 },
});

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
 const invitationLink = `https://recuriters-dashboard.onrender.com/accept-invitation/${invitationId}`;
 const result = await transporter.sendMail({
 from: `"${companyName}" <${process.env.EMAIL_USER}>`,
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
 background:hashtag#285A48;
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

 return result;
};