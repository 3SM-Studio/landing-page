import { resolvePublicSiteConfig } from '@/shared/config/site/site-config.resolver';
import { LocationMap } from './LocationMap';

export async function LocationMapSection() {
  const siteConfig = await resolvePublicSiteConfig();

  return <LocationMap location={siteConfig.location} coordinates={siteConfig.coordinates} />;
}
