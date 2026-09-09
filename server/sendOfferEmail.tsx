import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
 service: "gmail",
 auth: {
 user: process.env.EMAIL_USER,
 pass: process.env.EMAIL_APP_PASSWORD,
 },
});

export const sendOfferEmail = async ({
 email,
 fullName,
 companyName,
 appliedRole,
 salary,
 startDate,
 employmentType,
 description,
 offerId,
}: {
 email: string;
 fullName: string;
 companyName: string;
 appliedRole: string;
 salary: number;
 startDate: string;
 employmentType: string;
 description: string;
 offerId: string;
}) => {
 const frontendUrl =
 process.env.FRONTEND_URL || "http://localhost:5173";

 const offerLink = `${frontendUrl}/candidate/offer/${offerId}`;

 const result = await transporter.sendMail({
 from: `"${companyName}" <${process.env.EMAIL_USER}>`,
 to: email,
 subject: `Job Offer from ${companyName}`,

 html: `
 <h2>Congratulations, ${fullName}!</h2>

 <p>
 We are pleased to offer you the position of
 <strong>${appliedRole}</strong> at
 <strong>${companyName}</strong>.
 </p>

 <h3>Offer Details</h3>

 <p>
 <strong>Salary:</strong> ₦${salary.toLocaleString()}
 </p>

 <p>
 <strong>Start Date:</strong> ${startDate}
 </p>

 <p>
 <strong>Employment Type:</strong> ${employmentType}
 </p>

 <p>
 ${description}
 </p>

 <p>
 Click the button below to view your complete offer and respond.
 </p>

 <a
 href="${offerLink}"
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
 View Offer
 </a>

 <p>
 If you have any questions about this offer, please contact the company.
 </p>
 `,
 });

 return result;
};

