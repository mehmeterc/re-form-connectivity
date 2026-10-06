import LegalPage from './LegalPage';

const Datenschutz = () => (
  <LegalPage title="Datenschutzerklärung">
    <h2>1. Verantwortlicher</h2>
    <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
    <p>
      Mehmet Ercan<br />
      Straße der Befreiung 139<br />
      06886 Lutherstadt Wittenberg<br />
      Deutschland
    </p>
    <p>
      E-Mail: <a href="mailto:mehmeterc@gmail.com" className="underline hover:text-foreground">mehmeterc@gmail.com</a>
    </p>

    <h2>2. Hosting</h2>
    <p>Diese Website wird über Vercel gehostet.</p>
    <p>
      Anbieter:<br />
      Vercel Inc.<br />
      440 N Barranca Avenue #4133<br />
      Covina, CA 91723<br />
      USA
    </p>
    <p>
      Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch erforderliche Daten. Dazu können insbesondere die
      IP-Adresse, Datum und Uhrzeit des Zugriffs, Informationen zum verwendeten Browser sowie technische Server- und
      Verbindungsdaten gehören.
    </p>
    <p>Die Verarbeitung erfolgt zur sicheren, stabilen und technisch zuverlässigen Bereitstellung dieser Website.</p>
    <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
    <p>Weitere Informationen zur Datenverarbeitung durch Vercel finden sich in der Datenschutzerklärung von Vercel.</p>

    <h2>3. Kontakt per E-Mail</h2>
    <p>
      Wenn Besucher über einen E-Mail-Link Kontakt aufnehmen, werden die übermittelten personenbezogenen Daten
      ausschließlich zur Bearbeitung der jeweiligen Anfrage verarbeitet.
    </p>
    <p>Die E-Mail-Kommunikation findet außerhalb der Website über den jeweiligen E-Mail-Anbieter statt.</p>
    <p>Rechtsgrundlage ist je nach Inhalt der Anfrage Art. 6 Abs. 1 lit. b oder lit. f DSGVO.</p>

    <h2>4. Externe Links</h2>
    <p>
      Diese Website enthält möglicherweise Links zu externen Websites, beispielsweise Google Maps oder
      Social-Media-Plattformen.
    </p>
    <p>
      Beim bloßen Besuch von reformhub.de werden über diese einfachen Links keine Inhalte der externen Anbieter
      automatisch geladen.
    </p>
    <p>
      Erst wenn ein Besucher einen externen Link aktiv anklickt, verlässt er reformhub.de. Für die anschließende
      Datenverarbeitung ist der jeweilige externe Anbieter verantwortlich.
    </p>

    <h2>5. Rechte betroffener Personen</h2>
    <p>
      Betroffene Personen haben nach Maßgabe der DSGVO insbesondere das Recht auf Auskunft, Berichtigung, Löschung und
      Einschränkung der Verarbeitung sowie, soweit anwendbar, auf Widerspruch und Datenübertragbarkeit.
    </p>
    <p>Außerdem besteht das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.</p>

    <p className="pt-4 text-foreground/60">Stand: Oktober 2026</p>
  </LegalPage>
);

export default Datenschutz;
