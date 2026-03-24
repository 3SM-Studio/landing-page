type LegalEntityCardProps = {
  name: string;
  address: string;
  krs: string;
  nip: string;
  regon: string;
  email: string;
};

export function LegalEntityCard({ name, address, krs, nip, regon, email }: LegalEntityCardProps) {
  return (
    <div className="my-6 rounded-2xl border border-white/10 bg-white/5 p-6">
      <dl className="grid gap-4 sm:grid-cols-[140px_1fr]">
        <dt className="font-semibold text-white">Nazwa</dt>
        <dd className="text-slate-300">{name}</dd>

        <dt className="font-semibold text-white">Adres</dt>
        <dd className="text-slate-300">{address}</dd>

        <dt className="font-semibold text-white">KRS</dt>
        <dd className="text-slate-300">{krs}</dd>

        <dt className="font-semibold text-white">NIP</dt>
        <dd className="text-slate-300">{nip}</dd>

        <dt className="font-semibold text-white">REGON</dt>
        <dd className="text-slate-300">{regon}</dd>

        <dt className="font-semibold text-white">E-mail</dt>
        <dd className="text-slate-300">
          <a href={`mailto:${email}`} className="text-3sm-cyan underline underline-offset-4">
            {email}
          </a>
        </dd>
      </dl>
    </div>
  );
}
