'use strict'

const output = {
	reactStrictMode: true,
	poweredByHeader: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
   // config.output.hashFunction = 'sha1'
    return config
  },
}

export default output
