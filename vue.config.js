module.exports = {
	outputDir: process.env.outputDir,
	assetsDir: 'static',
	// devServer: {
	// 	proxy: {
	// 		'/api': {
	// 			target: 'http://124.71.102.74:21884', // sit
	// 			// target: 'http://124.71.102.74:41884', // uat
	// 			ws: true,
	// 			changeOrigin: true,
	// 			logLevel: 'debug',
	// 			pathRewrite: {
	// 				'^/api': ''
	// 			}
	// 		}
	// 	}
	// },
	runtimeCompiler: true,
	productionSourceMap: false
}
