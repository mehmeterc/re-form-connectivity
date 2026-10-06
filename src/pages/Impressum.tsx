import LegalPage from './LegalPage';

const Impressum = () => (
  <LegalPage title="Impressum">
    <p>Angaben gemäß § 5 DDG und § 18 MStV</p>
    <p>
      <strong>Mehmet Ercan</strong><br />
      Re:Form Hub<br />
      Straße der Befreiung 139<br />
      06886 Lutherstadt Wittenberg<br />
      Deutschland
    </p>
    <p>
      <strong>E-Mail:</strong>{' '}
      <a href="mailto:mehmeterc@gmail.com" className="underline hover:text-foreground">mehmeterc@gmail.com</a>
    </p>
    <h2>Verantwortlich für den Inhalt</h2>
    <p>
      Mehmet Ercan<br />
      Anschrift wie oben.
    </p>
  </LegalPage>
);

export default Impressum;
