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
