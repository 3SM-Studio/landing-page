import { groq } from 'next-sanity';

export const SITE_CONTACT_SETTINGS_QUERY = groq`
  *[_type == "siteContactSettings"][0]{
    _id,
    _type,
    contact{
      emails[]{
        type,
        email,
        isPrimary
      },
      phoneNumbers[]{
        type,
        countryCode,
        nationalNumber,
        isPrimary
      },
      publicAddressMode,
      customPublicAddress{
        streetAddress,
        postalCode,
        "city": city,
        "region": region,
        countryCode
      },
      businessHours[]{
        days,
        opensAt,
        closesAt,
        closesNextDay
      }
    },
    map{
      source,
      coordinates,
      placeId,
      useCustomLabel,
      customLabel,
      zoom
    }
  }
`;
