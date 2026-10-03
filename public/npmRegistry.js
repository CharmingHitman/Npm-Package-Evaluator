import axios from 'axios';

const REGISTRY_SEARCH_URL = 'https://registry.npmjs.org/-/v1/search';

/**
 * Search npm packages by keyword.
 * @param {string} query - e.g. "date picker"
 * @param {{ size?: number, from?: number }} [options] - size = results per page (max 250), from = pagination offset
 * @returns {Promise<{ total: number, results: object[] }>}
 */
export async function searchPackages(query, { size = 10, from = 0 } = {}) {
  const { data } = await axios.get(REGISTRY_SEARCH_URL, {
    params: { text: query, size, from },
  });
  return {
    total: data.total,
    results: data.objects.map(({ package: pkg, score, downloads, dependents }) => ({
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      keywords: pkg.keywords ?? [],
      license: pkg.license ?? 'Unknown',
      author: pkg.publisher?.username ?? pkg.maintainers?.[0]?.username ?? 'Unknown',
      links: pkg.links,
      lastPublished: pkg.date,
      downloads: {
        weekly: downloads?.weekly ?? 0,
        monthly: downloads?.monthly ?? 0,
      },
      dependents: Number(dependents) || 0,
      score: {
        final: score?.final ?? 0,
        quality: score?.detail?.quality ?? 0,
        popularity: score?.detail?.popularity ?? 0,
        maintenance: score?.detail?.maintenance ?? 0,
      },
    })),
  };
}

/**
 * Get a package's unpacked size from its latest version. Not in the search
 * response — search and this are separate calls, so this hits the direct
 * package endpoint. Works for scoped names (e.g. "@nestjs/axios") as-is.
 * @param {string} name
 * @returns {Promise<{ bytes: number, kb: number }>}
 */
export async function getPackageSize(name) {
  const { data } = await axios.get(`https://registry.npmjs.org/${name}/latest`);
  const bytes = data.dist.unpackedSize;
  return { bytes, kb: +(bytes / 1024).toFixed(1) };
}

/**
 * Enrich searchPackages() results with each one's size, fetched in parallel
 * (one request per result — fine for a page of 20-ish, not for hundreds).
 * @param {object[]} results - the `results` array from searchPackages()
 */
export async function withSizes(results) {
  return Promise.all(
    results.map(async (pkg) => ({ ...pkg, size: await getPackageSize(pkg.name) })),
  );
}

/**
 * Check a package version for known vulnerabilities via OSV.dev.
 * @param {string} name
 * @param {string} version
 * @returns {Promise<object[]>} vulnerability records, empty if none found
 */
export async function getVulnerabilities(name, version) {
  const { data } = await axios.post('https://api.osv.dev/v1/query', {
    package: { name, ecosystem: 'npm' },
    version,
  });
  return data.vulns ?? [];
}

/**
 * Enrich searchPackages() results with both size and vulnerabilities.
 * Each package's two lookups run in parallel, and all packages run in
 * parallel too — for a page of ~20 results that's fine; for hundreds,
 * you'd want to batch this instead.
 * @param {object[]} results - the `results` array from searchPackages()
 */
export async function enrichResults(results) {
  return Promise.all(
    results.map(async (pkg) => {
      const [size, vulns] = await Promise.all([
        getPackageSize(pkg.name),
        getVulnerabilities(pkg.name, pkg.version),
      ]);
      return { ...pkg, size, vulns };
    }),
  );
}

export async function getPackageDetails(name) {
  const { data } = await axios.get(`https://registry.npmjs.org/${name}/latest`);
  const vulns = await getVulnerabilities(name, data.version);
  return {
    name: data.name,
    description: data.description,
    version: data.version,
    keywords: data.keywords ?? [],
    license: data.license ?? 'Unknown',
    author: data.publisher?.username ?? data.maintainers?.[0]?.username ?? 'Unknown',
    dependencies: data.dependencies ?? {},
    links: {
      homepage: data.homepage,
      repository: data.repository?.url,
      bugs: data.bugs?.url,
      npm: `https://www.npmjs.com/package/${data.name}`,
    },
    lastPublished: data.date,
    size: {
      bytes: data.dist.unpackedSize,
      kb: +(data.dist.unpackedSize / 1024).toFixed(1),
    },
    vulns,
    provenance: Boolean(data.dist?.attestations),
    trustedPublisher: Boolean(data._npmUser?.trustedPublisher),
    deprecated: data.deprecated ?? null,
    installScripts: Boolean(
      data.scripts?.preinstall || data.scripts?.install || data.scripts?.postinstall,
    ),
  };
}

const OSI_APPROVED = new Set([
  'MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'ISC',
  'GPL-2.0', 'GPL-2.0-only', 'GPL-3.0', 'GPL-3.0-only',
  'LGPL-2.1', 'LGPL-3.0', 'MPL-2.0', 'AGPL-3.0', 'EPL-2.0',
  'Unlicense', '0BSD', 'CC0-1.0',
]);
 
/**
 * @param {string} license - an SPDX identifier, e.g. "MIT"
 */
export function isOsiApproved(license) {
  return OSI_APPROVED.has(license);
}