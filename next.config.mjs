'use strict'

let output = 
{
	swcMinifier: true,
	reactStrictMode: true,
	poweredByHeader: false,
	/*experimental: 
	{
		esmExternals: true,
	},*/
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
   // config.output.hashFunction = 'sha1'
    return config
  },
}

export default output