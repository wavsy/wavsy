import type { NextConfig } from "next";

const publicToInternal = [
  ["/услуги", "/uslugi"],
  ["/проекти", "/proekti"],
  ["/за-нас", "/za-nas"],
  ["/контакти", "/kontakti"],
  ["/поверителност", "/poveritelnost"],
  ["/бисквитки", "/biskvitki"],
] as const;

function encodedSources(source: string) {
  const encoded = encodeURI(source);
  const lower = encoded.replace(/%[0-9A-F]{2}/gi, (match) =>
    match.toLowerCase(),
  );
  return [...new Set([source, encoded, lower])];
}

const nextConfig: NextConfig = {
  async redirects() {
    return publicToInternal.flatMap(([publicPath, internalPath]) => [
      {
        source: internalPath,
        destination: publicPath,
        permanent: true,
      },
      {
        source: `${internalPath}/:path*`,
        destination: `${publicPath}/:path*`,
        permanent: true,
      },
    ]);
  },
  async rewrites() {
    return publicToInternal.flatMap(([publicPath, internalPath]) =>
      encodedSources(publicPath).flatMap((source) => [
        { source, destination: internalPath },
        { source: `${source}/:path*`, destination: `${internalPath}/:path*` },
      ]),
    );
  },
};

export default nextConfig;
