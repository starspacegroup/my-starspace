<script lang="ts">
  // No reactive logic needed for static Privacy Policy, but TypeScript is applied for consistency
  const companyName: string = "My *Space";
  const lastUpdated: string = "March 24, 2025";
</script>

<svelte:head>
  <title>{companyName} - Privacy Policy</title>
</svelte:head>

<main class="container mx-auto p-4 max-w-3xl">
  <h1 class="text-2xl font-bold">Privacy Policy</h1>
  <p class="mt-2">This Privacy Policy describes how {companyName} ("we," "us," or "our") collects, uses, and discloses your information when you use our services (the "Services"). By accessing or using the Services, you agree to the collection and use of information in accordance with this Privacy Policy.</p>
  
  <h2 class="text-xl font-semibold mt-4">1. Information We Collect</h2>
  <p>When you use the Services, we may collect the following types of information:</p>
  <ul class="list-disc ml-6 mt-2">
      <li><strong>Account Information:</strong> When you log in using your Discord account, we collect your Discord user ID, username, and avatar.</li>
      <li><strong>Usage Data:</strong> We collect data about your interactions with the Services, including chat messages, commands used, and activity logs.</li>
      <li><strong>Device and Log Information:</strong> We may collect technical details such as your IP address, browser type, and access times.</li>
      <li><strong>Cookies:</strong> We currently use cookies solely for session management to maintain your login state during your use of the Services. These cookies expire when your session ends.</li>
  </ul>

  <h2 class="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
  <p>We use the information we collect for the following purposes:</p>
  <ul class="list-disc ml-6 mt-2">
      <li>To provide, operate, and maintain the Services;</li>
      <li>To personalize your experience and improve our Services;</li>
      <li>To communicate with you regarding updates, changes, or support inquiries;</li>
      <li>To monitor usage and prevent fraudulent or malicious activity;</li>
      <li>To comply with legal obligations and enforce our Terms of Service.</li>
  </ul>
  
  <h2 class="text-xl font-semibold mt-4">3. Information Sharing and Disclosure</h2>
  <p>We do not sell or rent your personal information. However, we may share your information under the following circumstances:</p>
  <ul class="list-disc ml-6 mt-2">
      <li><strong>With Service Providers:</strong> We may share data with third-party providers who assist us in operating our Services.</li>
      <li><strong>For Legal Reasons:</strong> If required by law or to protect our rights, we may disclose information to authorities.</li>
      <li><strong>In Business Transfers:</strong> If {companyName} undergoes a merger, acquisition, or asset sale, your information may be transferred.</li>
  </ul>
  
  <h2 class="text-xl font-semibold mt-4">4. Data Retention</h2>
  <p>We retain your information for as long as necessary to fulfill the purposes outlined in this policy. You may request deletion of your data by contacting us.</p>
  
  <h2 class="text-xl font-semibold mt-4">5. Security</h2>
  <p>We implement reasonable security measures to protect your information, but no method of transmission or storage is 100% secure. You use the Services at your own risk.</p>
  
  <h2 class="text-xl font-semibold mt-4">6. Your Rights and Choices</h2>
  <p>You may have rights under applicable privacy laws, including the ability to:</p>
  <ul class="list-disc ml-6 mt-2">
      <li>Request access to or deletion of your data;</li>
      <li>Opt out of certain data collection practices;</li>
      <li>Update or correct your account information.</li>
  </ul>
  
  <h2 class="text-xl font-semibold mt-4">7. Compliance with Laws</h2>
  <p>We operate in compliance with applicable data protection laws, including but not limited to:</p>
  <ul class="list-disc ml-6 mt-2">
      <li>The General Data Protection Regulation (GDPR) for users in the European Union;</li>
      <li>The California Consumer Privacy Act (CCPA) for residents of California;</li>
      <li>Other relevant federal, state, and international privacy regulations as applicable.</li>
  </ul>
  <p>For more information about your rights under these laws, please contact us.</p>
  
  <h2 class="text-xl font-semibold mt-4">8. Changes to This Privacy Policy</h2>
  <p>We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting. Continued use of the Services constitutes your acceptance of the updated policy.</p>
  
  <h2 class="text-xl font-semibold mt-4">9. Contact Us</h2>
  <p>If you have any questions about this Privacy Policy, please contact us at support@my.starspace.group.</p>
  
  <p class="mt-6">Last Updated: {lastUpdated}</p>
</main>