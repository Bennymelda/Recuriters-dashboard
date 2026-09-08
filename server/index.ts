import dotenv from "dotenv";


import express from "express";
import cors from "cors";

//import { Resend } from "resend";

import { sendInvitationEmail } from "./sendInvitationEmail";
import { sendOfferEmail } from "./sendOfferEmail";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/invitations/send", async (req, res) => {
 try {
 const {
 email,
 fullName,
 companyName,
 role,
 invitationId,
 } = req.body;

 if (
 !email ||
 !fullName ||
 !companyName ||
 !role ||
 !invitationId
 ) {
 console.warn("Missing invitation information:", req.body);
 return res.status(400).json({
 success: false,
 message: "Missing invitation information.",
 });
 }

 console.log(`Sending invitation email to ${email} for ${fullName}...`);

 const result = await sendInvitationEmail({
 email,
 fullName,
 companyName,
 role,
 invitationId,
 });

 console.log(`Email sent successfully to ${email}:`, result.messageId);

 return res.status(200).json({
 success: true,
 message: "Invitation email sent successfully.",
 data: result,
 });
 } catch (error) {
 console.error("Invitation email error:", error);
 
 const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
 
 return res.status(500).json({
 success: false,
 message: `Failed to send invitation email: ${errorMessage}`,
 error: errorMessage,
 });
 }
});


app.get("/api/test-email", async (_req, res) => {
 try {
 const result = await sendInvitationEmail({
 email: "benedictaibesi45@gmail.com",
 fullName: "Benny",
 companyName: "RecruiterPro",
 role: "Recruiter",
 invitationId: "test-invitation-123",
 });

 return res.json({
 success: true,
 message: "Test email sent successfully.",
 data: result,
 });
 } catch (error) {
 console.error("Test email error:", error);

 return res.status(500).json({
 success: false,
 message: error instanceof Error
 ? error.message
 : "Unknown error",
 });
}
});
//const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", (req, res) => {
 res.json({
 message: "RecruiterPro email server is running.",
 });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Email server running on port ${PORT}`);
});

app.post("/api/offers/send", async (req, res) => {
 try {
 const {
 email,
 fullName,
 companyName,
 appliedRole,
 salary,
 startDate,
 employmentType,
 description,
 offerId,
 } = req.body;

 if (
 !email ||
 !fullName ||
 !companyName ||
 !appliedRole ||
 !salary ||
 !startDate ||
 !employmentType ||
 !description ||
 !offerId
 ) {
 console.warn("Missing offer information:", req.body);

 return res.status(400).json({
 success: false,
 message: "Missing offer information.",
 });
 }

 console.log(
 `Sending offer email to ${email} for ${fullName}...`
 );

 const result = await sendOfferEmail({
 email,
 fullName,
 companyName,
 appliedRole,
 salary,
 startDate,
 employmentType,
 description,
 offerId,
 });

 console.log(
 `Offer email sent successfully to ${email}:`,
 result.messageId
 );

 return res.status(200).json({
 success: true,
 message: "Offer email sent successfully.",
 data: result,
 });
 } catch (error) {
 console.error("Offer email error:", error);

 const errorMessage =
 error instanceof Error
 ? error.message
 : "Unknown error occurred";

 return res.status(500).json({
 success: false,
 message: `Failed to send offer email: ${errorMessage}`,
 error: errorMessage,
 });
 }
});