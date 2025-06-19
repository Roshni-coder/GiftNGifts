import React from 'react';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaRegClock,
  FaCheckCircle,
  FaUndoAlt,
  FaBoxOpen,
  FaUserShield,
} from 'react-icons/fa';

const CardSection = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 space-y-3 border border-gray-100">
    {title && <h2 className="text-xl font-semibold text-[#7d0492]">{title}</h2>}
    <div className="text-sm text-gray-700">{children}</div>
  </div>
);

function Support_Policy() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-[#7d0492] mb-4">
        🛡 Customer Support & Service Policy
      </h1>
      <p className="text-center text-[15px] text-gray-700 max-w-3xl mx-auto mb-10">
        At <span className="font-semibold text-black">Ishisoft Private Limited</span>, customer satisfaction is our top priority. This policy explains how we assist with orders, accounts, and product issues.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardSection title="Customer Support Channels">
          <ul className="space-y-2">
            <li><FaEnvelope className="inline mr-2 text-[#7d0492]" /> Email: ishisofttech@gmail.com</li>
            <li><FaPhoneAlt className="inline mr-2 text-[#7d0492]" /> Phone: +91-93650 55344</li>
            <li><FaRegClock className="inline mr-2 text-[#7d0492]" /> Live Chat available on our website</li>
            <li>🕔 Response Time: Within 24–48 business hours</li>
          </ul>
        </CardSection>

        <CardSection title="Support Hours">
          <ul className="list-disc pl-5">
            <li>Monday – Saturday: 10:00 AM – 6:00 PM IST</li>
            <li>Sunday & Public Holidays: Closed</li>
          </ul>
        </CardSection>

        <CardSection title="Help With Orders">
          <ul className="list-disc pl-5 space-y-1">
            <li><FaCheckCircle className="inline mr-2 text-green-600" /> Order Confirmation Not Received</li>
            <li>🛒 Cart or Checkout Issues</li>
            <li>📦 Delayed or Missing Orders</li>
            <li><FaUndoAlt className="inline mr-2 text-orange-500" /> Returns & Exchange Queries</li>
            <li>💸 Payment or Refund Issues</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">Include your Order ID for faster help.</p>
        </CardSection>

        <CardSection title="Returns & Refund Policy">
          <p>
            Read our <span className="underline text-[#7d0492] cursor-pointer">Return & Refund Policy</span> for full terms.
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Returns accepted within 7–14 days</li>
            <li>Product must be unused and in original condition</li>
            <li>Refund processed within 3–7 working days post-approval</li>
          </ul>
        </CardSection>

        <CardSection title="Product Issues">
          <ul className="list-disc pl-5 space-y-1">
            <li><FaBoxOpen className="inline mr-2 text-red-600" /> Damaged or wrong product</li>
            <li>Size or variant mismatch</li>
            <li>Missing components</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">Send clear photos within 48 hours of delivery.</p>
        </CardSection>

        <CardSection title="Technical Support">
          <ul className="list-disc pl-5">
            <li>Installation Help</li>
            <li>Product Troubleshooting</li>
            <li>Usage Instructions</li>
          </ul>
        </CardSection>

        <CardSection title="Account & Login Help">
          <ul className="list-disc pl-5">
            <li>Forgot Password</li>
            <li>Email not verified</li>
            <li>Account locked or compromised</li>
          </ul>
        </CardSection>

        <CardSection title="Complaints & Feedback">
          <p>
            We value your feedback. Email us at{' '}
            <a href="mailto:care@ishisoft.com" className="text-[#7d0492] underline">care@ishisoft.com</a>.
            We aim to respond within 3 business days.
          </p>
        </CardSection>

        <CardSection title="Resolution Timelines">
          <ul className="list-disc pl-5">
            <li>Standard queries: 1–2 business days</li>
            <li>Escalated issues: up to 5 business days</li>
          </ul>
        </CardSection>

        <CardSection title="Escalation Matrix">
          <ul className="list-disc pl-5">
            <li>Level 1: support@ishisoft.com</li>
            <li>Level 2: escalation@ishisoft.com</li>
            <li><FaUserShield className="inline mr-2 text-black" /> Level 3: grievance@ishisoft.com</li>
          </ul>
        </CardSection>
      </div>

      <p className="text-xs text-gray-400 text-right italic mt-10">Last updated: June 17, 2025</p>
    </section>
  );
}

export default Support_Policy;
