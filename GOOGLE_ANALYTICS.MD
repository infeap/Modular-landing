# Google Analytics – Implementation och efterlevnad

## Implementerat i projektet

### Tracking som är aktivt:
- **Sidvisningar (Page Views)** - Automatisk tracking av alla sidvisningar
- **Scroll Tracking** - Trackar när användare scrollar 25%, 50%, 75% och 100% av sidan
- **Click Tracking** - Trackar klick på alla CTA-knappar, navigeringslänkar och moduler
- **Formulär Tracking** - Trackar när användare skickar formulär (success/error)
- **Modal Tracking** - Trackar när användare öppnar och interagerar med moduler

### Event-kategorier:
- `cta` - Call-to-action knappar
- `navigation` - Navigationslänkar
- `engagement` - Användare interaktioner (modulklick, frågor, etc.)
- `form` - Formulärinteraktioner

### Measurement ID:
Konfigurerat i `.env.local`: `G-L2K6QSQQ41`

---

# Obligatoriska krav och efterlevnad

Följande krav ska alltid uppfyllas vid implementation och användning av Google Analytics i projektet. Kraven är bindande och får inte kringgås.

---

## 1. Integritetspolicy
Projektet **ska** ha en tydlig och lättillgänglig integritetspolicy på webbplatsen.

Integritetspolicyn **ska** uttryckligen informera om:
- att Google Analytics används
- vilken typ av data som samlas in
- i vilket syfte datan används

---

## 2. Länk till Googles datainformation
Integritetspolicyn **ska** innehålla en länk till Googles officiella information om hur Google använder data som samlas in från webbplatser och appar som använder deras tjänster.

---

## 3. Samtycke till cookies (GDPR)
Användarens samtycke till cookies **ska** inhämtas där lagkrav föreligger.

Detta är **obligatoriskt** inom Sverige och EU enligt GDPR och tillämplig e-privacy-lagstiftning.

Google Analytics **får inte** aktiveras innan giltigt samtycke har lämnats, där detta krävs.

---

## 4. Förbud mot personuppgifter
Personuppgifter **får aldrig** skickas till Google Analytics.

Detta inkluderar, men är inte begränsat till:
- e-postadresser
- personnummer
- användarnamn
- andra identifierare som kan kopplas till en specifik individ

All insamlad data **ska** vara anonymiserad och får inte möjliggöra identifiering av en enskild person.

---

## 5. Säkerhet och ansvar
Följande säkerhets- och ansvarsprinciper **ska** efterlevas utan undantag:

- Du **ansvarar** för säkerheten kring ditt konto och dina inloggningsuppgifter, inklusive lösenord.
- Du **ska** vidta nödvändiga tekniska och organisatoriska åtgärder för att skydda kunders och tredje parters data.
- Du **får inte** modifiera, manipulera eller reverse-engineera Google Analytics-koden eller dess relaterade komponenter.

---

Dessa krav gäller som standard och ska följas konsekvent i samtliga projekt.
