# Plan: Portfolio-Seite reparieren (Play-Button, Navigation, 404)

## 1. Videos lassen sich nicht abspielen (Hauptfehler)
Ursache gefunden: die Karten benutzen den Effekt `glow-card`, der eine unsichtbare Schicht über die ganze Karte legt. Diese Schicht liegt über dem YouTube-Player, deshalb wird beim Klick nur die Karte markiert statt Play gedrückt.

Fix:
- Der Glanz-Schicht in `src/index.css` (`.glow-card::after`) wird `pointer-events: none` gegeben, damit Klicks immer durchgehen (gilt für die ganze Seite, überall ungefährlich).
- Auf der Portfolio-Karte wird das Video zusätzlich über die Effektschicht gelegt (eigene Ebene), und der leichte "Anheben"-Hover-Effekt der Karte entfernt, damit beim Klicken nichts wackelt.

## 2. Portfolio-Seite bekommt die gleiche Navigation wie die Startseite
- Der bestehende Header (Logo, Hell-/Dunkel-Umschalter, DE/EN, Hamburger-Menü) wird auf der Portfolio-Seite eingebaut, statt der aktuellen minimalen Kopfzeile.
- Damit die Menülinks (Über uns, Vision, FAQ, Kontakt …) auch von `/portfolio` funktionieren, verweisen sie auf die Startseite plus Abschnitt (z. B. `/#contact`) statt nur `#contact`.
- Der Portfolio-Link im Menü bleibt erhalten; Sprachumschaltung und Theme wirken auf der Seite.
- Der Seiteninhalt bekommt oben Abstand, weil der Header fest oben liegt.

## 3. 404 auf reformhub.de/portfolio
Die Seite existiert und funktioniert in der Vorschau. Auf der veröffentlichten Domain erscheint 404, weil dort noch die alte Version liegt: die Seite muss neu veröffentlicht werden. Nach dem Umsetzen erinnere ich dich ans Veröffentlichen; danach ist `/portfolio` auch unter reformhub.de erreichbar.

## Technische Details
- `src/index.css`: `pointer-events: none` bei `.glow-card::after`.
- `src/pages/Portfolio.tsx`: Header-Komponente einbinden, minimale Topbar entfernen, Video-Wrapper mit `relative z-10`, Hover-Translate entfernen.
- `src/components/Header.tsx`: Abschnittslinks auf `/#…` umstellen (funktioniert auf Startseite und Unterseiten identisch).
- Keine Änderungen an Inhalten, Videos, Texten oder anderen Abschnitten.
