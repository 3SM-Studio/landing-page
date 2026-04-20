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
    <section className="my-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
      <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-3sm-cyan">
        {labels.title}
      </p>

      <dl className="grid gap-4 sm:grid-cols-[180px_1fr]">
        {items.map((item) => (
          <div key={item.label} className="contents">
            <dt key={`${item.label}-label`} className="font-semibold text-white">
              {item.label}
            </dt>
            <dd key={`${item.label}-value`} className="text-slate-300">
              {item.value}
            </dd>
          </div>
        ))}

        {email ? (
          <>
            <dt className="font-semibold text-white">{labels.email}</dt>
            <dd className="text-slate-300">
              <a href={`mailto:${email}`} className="text-3sm-cyan underline underline-offset-4">
                {email}
              </a>
            </dd>
          </>
        ) : null}
      </dl>
    </section>
  );
}
