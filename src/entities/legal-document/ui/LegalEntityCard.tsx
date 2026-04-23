type LegalEntityCardProps = {
  locale: 'pl' | 'en';
  name: string;
  address?: string;
  krs?: string;
  nip?: string;
  regon?: string;
  registrationNumber?: string;
  taxId?: string;
  vatId?: string;
  email?: string;
};

function getLabels(locale: 'pl' | 'en') {
  if (locale === 'pl') {
    return {
      title: 'Dane firmy',
      name: 'Nazwa',
      address: 'Adres',
      krs: 'KRS',
      nip: 'NIP',
      regon: 'REGON',
      registrationNumber: 'Numer rejestracyjny',
      taxId: 'Tax ID',
      vatId: 'VAT ID',
      email: 'E-mail',
    };
  }

  return {
    title: 'Company details',
    name: 'Name',
    address: 'Address',
    krs: 'KRS',
    nip: 'NIP',
    regon: 'REGON',
    registrationNumber: 'Registration number',
    taxId: 'Tax ID',
    vatId: 'VAT ID',
    email: 'Email',
  };
}

export function LegalEntityCard({
  locale,
  name,
  address,
  krs,
  nip,
  regon,
  registrationNumber,
  taxId,
  vatId,
  email,
}: LegalEntityCardProps) {
  const labels = getLabels(locale);

  const items = [
    { label: labels.name, value: name },
    { label: labels.address, value: address },
    { label: labels.krs, value: krs },
    { label: labels.nip, value: nip },
    { label: labels.regon, value: regon },
    { label: labels.registrationNumber, value: registrationNumber },
    { label: labels.taxId, value: taxId },
    { label: labels.vatId, value: vatId },
  ].filter((item) => item.value);

  return (
    <section className="mb-8 border border-[#d5d4d1] bg-[#f5f5f1] px-4 py-4 md:mb-10 md:px-6 md:py-5">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#6b6b6b]">
        {labels.title}
      </p>

      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-[180px_1fr]">
        {items.map((item) => (
          <div key={item.label} className="contents">
            <dt
              key={`${item.label}-label`}
              className="text-[16px] font-semibold leading-6 text-[#221f1f]"
            >
              {item.label}
            </dt>
            <dd key={`${item.label}-value`} className="text-[16px] leading-6 text-[#4c4948]">
              {item.value}
            </dd>
          </div>
        ))}

        {email ? (
          <>
            <dt className="text-[16px] font-semibold leading-6 text-[#221f1f]">{labels.email}</dt>
            <dd className="text-[16px] leading-6 text-[#4c4948]">
              <a href={`mailto:${email}`} className="text-[#e50914] underline underline-offset-2">
                {email}
              </a>
            </dd>
          </>
        ) : null}
      </dl>
    </section>
  );
}
