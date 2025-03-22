<script lang="ts">
  // No reactive logic needed for static Terms of Service, but TypeScript is applied for consistency
  const companyName: string = "My *Space";
  const lastUpdated: string = "March 22, 2025"; // Matches current date
</script>

<svelte:head>
  <title>{companyName} - Terms of Service</title>
</svelte:head>

<main class="container mx-auto p-4 max-w-3xl">
  <h1 class="text-2xl font-bold">Terms of Service</h1>
  <p class="mt-2">Welcome to {companyName}. By accessing or using our services, you agree to comply with and be bound by the following Terms of Service ("Terms"). Please read them carefully.</p>
  
  <h2 class="text-xl font-semibold mt-4">1. Acceptance of Terms</h2>
  <p>By accessing or using {companyName}, including its website, associated Discord bot, and any related services (collectively, the "Services"), you represent that you have read, understood, and agree to be legally bound by these Terms and any applicable laws. If you do not agree, you must immediately cease using the Services.</p>
  
  <h2 class="text-xl font-semibold mt-4">2. User Accounts</h2>
  <p>To access certain features of the Services, you must log in using a valid Discord account. You are solely responsible for maintaining the confidentiality and security of your account credentials. You agree to notify us immediately of any unauthorized use or security breach. {companyName} shall not be liable for any loss or damage arising from your failure to safeguard your account.</p>
  
  <h2 class="text-xl font-semibold mt-4">3. Content and Conduct</h2>
  <p>Any content you submit, including but not limited to messages, images, or files, to designated Discord channels or via the '{companyName}' bot ("User Content") may be displayed in real time on our platform. You grant {companyName} a non-exclusive, royalty-free, worldwide, perpetual license to use, display, and distribute your User Content solely for the purpose of providing the Services. You agree not to post, upload, or share User Content that:</p>
  <ul class="list-disc ml-6 mt-2">
      <li>Is illegal, defamatory, obscene, abusive, harassing, or otherwise objectionable;</li>
      <li>Infringes on any third-party rights, including intellectual property or privacy rights;</li>
      <li>Contains viruses, malware, or other harmful code;</li>
      <li>Violates any applicable laws or regulations.</li>
  </ul>
  <p class="mt-2">{companyName} reserves the right, but not the obligation, to monitor, remove, or restrict any User Content at its sole discretion, without prior notice, for any reason or no reason.</p>
  
  <h2 class="text-xl font-semibold mt-4">4. Privacy</h2>
  <p>Your use of the Services is subject to our <a href="/privacy-policy" class="text-blue-500 hover:underline">Privacy Policy</a>, which details how we collect, use, disclose, and protect your personal information. By using the Services, you consent to such processing as described therein.</p>
  
  <h2 class="text-xl font-semibold mt-4">5. Modifications to Terms</h2>
  <p>{companyName} reserves the right to modify or update these Terms at any time, with or without prior notice. Any changes will be effective immediately upon posting to the Services. Your continued use of the Services following such changes constitutes your acceptance of the revised Terms. It is your responsibility to review these Terms periodically.</p>
  
  <h2 class="text-xl font-semibold mt-4">6. Termination</h2>
  <p>{companyName} may suspend or terminate your access to the Services at any time, with or without cause or notice, including for violations of these Terms. Upon termination, your right to use the Services ceases immediately, and any licenses granted hereunder are revoked.</p>
  
  <h2 class="text-xl font-semibold mt-4">7. Limitation of Liability</h2>
  <p>The Services are provided "as is" without warranties of any kind, express or implied. To the fullest extent permitted by law, {companyName}, its affiliates, and its agents shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Services, even if advised of the possibility of such damages.</p>
  
  <h2 class="text-xl font-semibold mt-4">8. Governing Law</h2>
  <p>These Terms shall be governed by and construed in accordance with the laws of [Insert Jurisdiction, e.g., "the State of California, United States"], without regard to its conflict of law principles. Any disputes arising under these Terms shall be resolved exclusively in the courts of [Insert Jurisdiction].</p>
  
  <h2 class="text-xl font-semibold mt-4">9. Miscellaneous</h2>
  <p>If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect. These Terms constitute the entire agreement between you and {companyName} regarding the use of the Services. Failure to enforce any right or provision shall not constitute a waiver of such right or provision.</p>
  
  <p class="mt-6">Last Updated: {lastUpdated}</p>
  <p class="mt-2">If you do not agree to these Terms, please refrain from accessing or using {companyName}.</p>
</main>