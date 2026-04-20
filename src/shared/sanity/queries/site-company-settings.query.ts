import { groq } from 'next-sanity';

export const SITE_COMPANY_SETTINGS_QUERY = groq`
  *[_type == "siteCompanySettings"][0]{
    _id,
    _type,
    company{
      brandName,
      registrationCountryCode,
      legalFormPl,
      legalFormGlobal,
      customLegalForm,
      organizationType,
      foundedYear,
      nip,
      krs,
      regon,
      registrationNumber,
      taxId,
      vatId,
      hasSeparateOperatingAddress,
      registeredAddress{
        streetAddress,
        postalCode,
        city,
        region
      },
      operatingAddress{
        streetAddress,
        postalCode,
        city,
        region,
        countryCode
      }
    }
  }
`;
