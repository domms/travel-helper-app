export function formatAddress(tags: Record<string, any> | undefined): string {
  if (!tags) return 'No address available';

  const parts = [
    tags['addr:housenumber'],
    tags['addr:street'],
    tags['addr:city'],
    tags['addr:postcode'],
    tags['addr:country'],
  ].filter(Boolean); // remove undefined

  return parts.length > 0 ? parts.join(', ') : 'No address available';
}
