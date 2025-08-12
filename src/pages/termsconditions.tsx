

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const TermsConditions = () => {
  const navigate = useNavigate();
  const updated = "August 11, 2025";

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="grid grid-cols-3 items-center">
          <Button
            onClick={() => navigate("/")}
            className="justify-self-start h-10 w-10 p-0 bg-orange-600 hover:bg-orange-400 rounded-lg shadow-md shadow-yellow-300/60 hover:shadow-lg hover:shadow-yellow-300/90 flex items-center justify-center font-pixel"
            aria-label="Back to Menu"
          >
            <ArrowLeft className="h-5 w-5 text-black" />
          </Button>
          <h1 className="justify-self-center font-arcade text-xl sm:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 drop-shadow-[0_0_6px_rgba(255,200,100,0.9)]">
            TERMS AND CONDITIONS
          </h1>
          <div className="justify-self-end" />
        </div>

        <Card className="bg-black/70 border border-orange-500 rounded-xl p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-5">
            <p className="font-sans text-[11px] sm:text-xs text-white/90">
              Last updated: {updated}
            </p>

            {/* Acceptance */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                1. Acceptance of Terms
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                By accessing or using this app/website (the “Service”), you agree to be bound by these Terms & Conditions (the “Terms”). If you do not agree, do not use the Service.
              </p>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                2. Eligibility
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                The Service is intended for personal, non‑commercial entertainment. You must be of legal age in your jurisdiction to access any modes or content labeled “(18+)”. If you are under the age required by your jurisdiction, you may only use non‑18+ modes with the supervision and consent of a parent or legal guardian where permitted by law.
              </p>
            </section>

            {/* Safety & Conduct */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                3. Safety, Legality & Player Conduct
              </h2>
              <ul className="list-disc pl-5 space-y-1 font-sans text-[11px] sm:text-xs text-white">
                <li>Use the Service responsibly. Choose actions that are <span className="font-semibold">safe, lawful and appropriate</span> for your context.</li>
                <li>Do not attempt any prompt or dare that could cause injury, illness, property damage, harassment, humiliation, or violate any law, rule, or venue policy.</li>
                <li>You are solely responsible for your decisions and conduct while using the Service.</li>
                <li>We may remove content, restrict features, or suspend access for breaches of these Terms.</li>
              </ul>
            </section>

            {/* No advice */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                4. No Professional Advice
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                The Service provides entertainment content only and does not constitute legal, medical, safety, mental‑health, or other professional advice. You should exercise independent judgment and, where appropriate, seek professional guidance.
              </p>
            </section>

            {/* User content */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                5. User Content & Rights
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                If the Service allows you to submit prompts, names, images, or other content ("User Content"), you grant us a non‑exclusive, worldwide, royalty‑free license to host, store, display, and use such User Content solely to operate and improve the Service. You represent that you own or have the necessary rights to submit the User Content and that it does not infringe or violate any third‑party rights or laws.
              </p>
            </section>

            {/* IP */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                6. Intellectual Property
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                The Service, including all software, visuals, text, logos, and assets, is owned by us or our licensors and is protected by intellectual‑property laws. You may not copy, modify, distribute, sell, or reverse engineer any part of the Service except as permitted by law or with our prior written consent.
              </p>
            </section>

            {/* Assumption of Risk & Limitation */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                7. Assumption of Risk; Disclaimer; Limitation of Liability
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                You acknowledge that using the Service may involve inherent risks. You use the Service at your own risk. To the maximum extent permitted by law, the Service is provided on an “as is” and “as available” basis, without warranties of any kind, express or implied. We disclaim all warranties, including merchantability, fitness for a particular purpose, and non‑infringement. To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or any loss of data, profits, goodwill, or other intangible losses, arising out of or relating to your use of the Service.
              </p>
              <p className="font-sans text-[11px] sm:text-xs text-white mt-2">
                Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under applicable law.
              </p>
            </section>

            {/* Indemnity */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                8. Indemnification
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                You agree to defend, indemnify, and hold harmless us and our affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or related to your use of the Service or your breach of these Terms.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                9. Suspension & Termination
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                We may suspend or terminate access to the Service at any time, with or without notice, for any reason including suspected violations of these Terms.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                10. Changes to the Service or Terms
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                We may modify the Service or these Terms at any time. Changes take effect when posted. Your continued use of the Service after changes become effective constitutes acceptance of the revised Terms.
              </p>
            </section>

            {/* Governing law */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                11. Governing Law & Venue
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                These Terms are governed by the laws of Singapore, without regard to conflict‑of‑laws principles. You submit to the exclusive jurisdiction of the courts of Singapore for any dispute arising from or relating to the Service or these Terms.
              </p>
            </section>

            {/* Privacy Policy */}
<section>
  <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
    12. Privacy Policy
  </h2>
  <p className="font-sans text-[11px] sm:text-xs text-white mb-2">
    We respect your privacy and are committed to protecting your personal information. 
    This Privacy Policy explains how we collect, use, and share information when you use the Service.
  </p>

  <ul className="list-disc pl-5 space-y-1 font-sans text-[11px] sm:text-xs text-white">
    <li>
      <span className="font-semibold">Information We Collect:</span> We may collect information you provide 
      directly (e.g., email, username, payment details for premium features) and information collected 
      automatically (e.g., device type, IP address, app usage statistics) via cookies or analytics tools.
    </li>
    <li>
      <span className="font-semibold">Use of Information:</span> To operate and improve the Service, 
      process transactions, provide customer support, personalize your experience, and ensure compliance 
      with applicable laws.
    </li>
    <li>
      <span className="font-semibold">Payments:</span> If you make purchases, payment processing is handled 
      by secure third-party providers (e.g., Stripe). We do not store full credit/debit card information.
    </li>
    <li>
      <span className="font-semibold">Third-Party Services:</span> We may use analytics and advertising 
      services (e.g., Google Analytics, AdMob) to understand usage and deliver relevant ads. These 
      third parties may collect data in accordance with their own privacy policies.
    </li>
    <li>
      <span className="font-semibold">Data Sharing:</span> We do not sell your personal data. We may share 
      information with trusted service providers who assist in operating the Service, or if required by 
      law or to protect our rights and safety.
    </li>
    <li>
      <span className="font-semibold">Data Retention:</span> We retain your data only as long as necessary 
      to fulfill the purposes outlined here, unless a longer retention period is required by law.
    </li>
    <li>
      <span className="font-semibold">Your Rights:</span> You may request access, correction, or deletion 
      of your personal data by contacting us at the email below.
    </li>
  </ul>

  <p className="font-sans text-[11px] sm:text-xs text-white mt-2">
    By using the Service, you consent to this Privacy Policy. We may update it from time to time, and 
    changes will be posted here with the updated date.
  </p>
</section>

            {/* Contact */}
            <section>
              <h2 className="font-sans text-sm sm:text-base font-semibold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_4px_rgba(255,200,100,0.6)]">
                13. Contact
              </h2>
              <p className="font-sans text-[11px] sm:text-xs text-white">
                Questions about these Terms? Contact us at: playchaoticgood@gmail.com
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditions;