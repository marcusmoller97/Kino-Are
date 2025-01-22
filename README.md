# Kino-Are

* To run moviesJestTest.spec.js change **testEnvironment** to __jsdom__

## Inlämningsuppgift
Denna uppgift går ut på att på Kino-webbplatsen tillgängliggöra server-siderenderade filmsidor vars data kommer från ett API.

### Uppgiften

I förra kursen byggde ni i grupp en webbplats för biografen “Kino”. Nu ska du individuellt utgå från den webbplatsen, och använda node för att serva hela webbplatsen, samt server-side rendering (SSR) för att rendera filmsidor.

### Moment

* Serva hela sidan med hjälp av node på port 5080, exempelvis express och dess “middleware” för statiska filer eller med hjälp av server-siderendering för att återanvända mallar/templates
  En sida ska vara en lista på filmer, där listan ska hämtas från ett API. Om en användare återkommer efter att fler filmer tillkommit ska det återspeglas på sidan.
* Varje film ska ha en egen sida som visar titel, intro och bild
* Använd följande API-resurser:
     * Filmer: https://plankton-app-xhkom.ondigitalocean.app/api/movies 
     * Enstaka film: https://plankton-app-xhkom.ondigitalocean.app/api/movies/<id> 
* Det ska finnas ett integrationstest som verifierar att filmsidor visar rätt titel
* För betyget Väl Godkänd krävs ytterligare tre moment:
     * En annan template-motor än Handlebars ska användas för att rendera hela webbplatsen, inkl filmsidorna. Gör research och välj en template-motor. Motivera i inlämningen varför du valt den motor du valt.
     * Filmernas intro-text ska renderas med hjälp av “markdown” för formatering
     * När användare besöker en filmsida som inte existerar ska en felsida visas och servern svara med korrekt HTTP-status, och ett integrationstest bekräftar att detta fungerar
### Inlämning

Uppgiften lämnas in genom att koden publiceras på GitHub och en länk till repot skickas in via ItsLearning. Projektet ska gå att köra vid bedömningen. Node-projektet ska vara konfigurerat så att:

* Alla dependencies installeras när man kör “npm install” (måste finnas i package.json)
* Servern går att starta med “npm start”
* Test ska gå att köra med “npm test”

### Betygskriterier

På denna uppgift kan man få betygen underkänt, godkänt eller väl godkänt.

### Betyg Godkänd

Enligt kursplanen: För att få betyget Godkänt (G) ska den studerande ha genomfört kursen och nått alla kursens läranderesultat.

Det betyder för denna uppgift:

* Källkod redovisad via GitHub
* Projektet går att starta med npm start, varpå sidan går att besöka på http://localhost:5080
* Filmsidorna så som de beskrivs i “Moment” går att besöka
* Korrekt integrationstest går att köra med “npm test” och lyckas till 100%
### Betyg Väl Godkänd
Enligt kursplanen: För att få betyget Väl godkänt (VG) ska den studerande med hög kvalitet genomfört kursen och nått alla kursens läranderesultat.

Den studerande har fördjupad kunskap och förståelse för webbapplikationer genom programmering på servern och vilken roll databaser och API:er har i en webbapplikation.

Det betyder för denna uppgift, utöver kriterierna för godkänt:

* Samtliga VG-moment är genomförda
* Koden håller hög kvalitet avseende sådant som struktur, formatering, och “separation of concerns”
* Valet av template-motor motiveras utifrån fördjupad kunskap och förståelse
