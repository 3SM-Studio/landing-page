# Frontend-CMS contract

## Źródła prawdy z Sanity

Website konsumuje publiczne dane z tych dokumentów:
- `siteBrandSettings`
- `siteCompanySettings`
- `siteContactSettings`
- `siteMarketingSettings`
- `siteSeoSettings`
- `service`
- `post`
- `caseStudy`
- `client`
- `partner`
- `teamMember`
- `legalDocument`
- `staticPage`

## Publiczne DTO po stronie website

Frontend nie powinien gadać bezpośrednio z surowym payloadem Studio.
Najważniejsze DTO i warstwy mapujące:
- `PublicSiteConfig`
- `LocalizedSiteMetadata`
- `LegalDocumentEntry`
- encje domenowe `Service`, `BlogPost`, `CaseStudy`, `Client`, `Partner`, `TeamMember`

## Tymczasowe aliasy zgodności

Żeby nie rozwalać istniejącego UI, query nadal wystawiają kilka pól zgodności:
- `serviceKey <- key`
- `clientKey <- key`
- `partnerKey <- key`
- `memberKey <- key`
- `showInTrustedBy <- showInPublicSections`
- `showOnPublicPage <- showInPublicSections`
- `featured <- zmapowana semantyka featured global/scoped tam, gdzie Studio ma bogatszy model`

To jest most zgodności, nie docelowy stan na wieczność.

## Co zostało wycięte jako główne źródło prawdy

- stare `siteSettings`
- lokalne MDX jako główne źródło treści legal pages

## Co nadal czeka na pełne wdrożenie

- pełne wycięcie message JSON-ów jako głównego content source dla stron statycznych
- domknięcie mapowania sekcji `home`, które dziś częściowo dalej korzystają z lokalnego fallbacku
- doprecyzowanie semantyki visibility dla publicznych listingów klientów i partnerów


## Decyzja 2026-04-20 - fallbacki legacy

Jeśli strona ma aktywny dokument `staticPage`, to on jest źródłem prawdy dla redakcyjnego contentu tej strony.
Nie mieszamy wtedy sekcji z lokalnych `messages/pages/*` tylko po to, żeby sztucznie 'uzupełnić' brakujące fragmenty.

Lokalne messages zostają wyłącznie jako fallback awaryjny dla całej strony, gdy `staticPage` nie istnieje, oraz dla mikrocopy technicznego.


## Decyzje cleanupowe 2026-04

- `staticPage` jest źródłem prawdy dla redakcyjnego contentu stron `home`, `about`, `contact` i `services`.
- Lokalny namespace `messages/pages/*` nie może już nadpisywać pojedynczych sekcji strony, jeśli istnieje aktywny `staticPage`.
- Legacy copy ma zostać tylko jako fallback dla całej strony, gdy dokument `staticPage` nie istnieje.
- Linki z CMS dzielimy na 4 klasy: app routes, external href, anchor oraz `mailto:` / `tel:`. Frontend nie może traktować każdego stringa z CMS jako typed route.
- `client` i `partner` mają jawne pola widoczności po stronie frontendowego DTO: listing i public page. Dla klientów dodatkowo zostaje osobne `showInTrustedBy`.
- Namespace `messages/pages/work/*` jest martwy z punktu widzenia routingu strony publicznej i nie bierze już udziału w budowie pakietu tłumaczeń.

## Decyzja 2026 - strony statyczne bez hybrydy

Dla `home`, `about`, `contact` i `services` aktywny `staticPage` jest obowiązkowym źródłem prawdy.
Jeśli dokument nie istnieje, publiczna strona nie powinna wracać do lokalnych `messages/pages/*` i udawać, że wszystko jest w porządku. W takim przypadku route kończy się `notFound()`.

Lokalne messages zostają tylko dla mikrocopy współdzielonego UI, nie dla redakcyjnej treści tych stron.
