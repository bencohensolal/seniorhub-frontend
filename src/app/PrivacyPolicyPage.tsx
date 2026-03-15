export default function PrivacyPolicyPage() {
  return (
    <main className="privacy-page">
      <section className="privacy-hero">
        <p className="privacy-eyebrow">Senior Hub</p>
        <h1>Privacy Policy</h1>
        <p className="privacy-updated">Last updated: March 13, 2026</p>
        <p className="privacy-lead">
          This Privacy Policy explains how Senior Hub uses and stores information when you use the
          mobile application and the display tablet setup flow.
        </p>
      </section>

      <section className="privacy-card">
        <h2>What Senior Hub is for</h2>
        <p>
          Senior Hub helps households organize daily life for seniors and caregivers, including
          reminders, appointments, household coordination, and display tablet setup.
        </p>
      </section>

      <section className="privacy-card">
        <h2>Camera permission</h2>
        <p>
          The Android camera permission is used only to scan QR codes when pairing and configuring
          a display tablet inside the mobile application.
        </p>
        <p>
          Senior Hub does not use the camera for background capture, photo taking, video recording,
          or advertising purposes.
        </p>
      </section>

      <section className="privacy-card">
        <h2>Information we may process</h2>
        <ul>
          <li>Account and profile information needed to identify household members.</li>
          <li>Household information such as members, appointments, medications, and tasks.</li>
          <li>Display tablet configuration data, including selected screens and preferences.</li>
          <li>Technical information required for authentication, security, and session management.</li>
        </ul>
      </section>

      <section className="privacy-card">
        <h2>How we use information</h2>
        <ul>
          <li>Provide the core Senior Hub features inside the mobile app and display tablet mode.</li>
          <li>Authenticate users and display tablets securely.</li>
          <li>Store preferences and configuration choices.</li>
          <li>Deliver reminders, household coordination features, and tablet display experiences.</li>
          <li>Improve reliability, security, and troubleshooting.</li>
        </ul>
      </section>

      <section className="privacy-card">
        <h2>Data sharing</h2>
        <p>
          Senior Hub does not sell personal data to third parties. Information is only used as
          needed to operate the app and its household-management features.
        </p>
      </section>

      <section className="privacy-card">
        <h2>Data retention and security</h2>
        <p>
          We retain data only as needed to provide the service, maintain household functionality,
          and protect account security. We use authentication, access controls, and secure storage
          mechanisms where appropriate.
        </p>
      </section>

      <section className="privacy-card">
        <h2>Your choices</h2>
        <p>
          You can stop using the app, revoke display tablet access, or request account-related
          updates through the application’s management flows.
        </p>
      </section>

      <section className="privacy-card">
        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact the Senior Hub team at{' '}
          <a href="mailto:privacy@seniorhub.app">privacy@seniorhub.app</a>.
        </p>
      </section>
    </main>
  );
}
