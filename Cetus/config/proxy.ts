/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
	dev: {
		'/api/': {
			target: 'https://preview.pro.ant.design',
			changeOrigin: true,
			pathRewrite: { '^': '' },
		},
		'/hbyfApi': {
			target: 'http://114.55.43.36:9412/yfManager',
			changeOrigin: true,
			pathRewrite: {
				'^/hbyfApi': ''
			}
		},
		'/allot': {
			// target: 'http://114.55.43.36:9412/yfManager',
			target: 'http://114.55.43.36:9001/allot',
			changeOrigin: true,
			pathRewrite: {
				'^/allot': ''
			}
		},
		'/hbyfCloudApi': {
			target: 'http://114.55.43.36:9426/',
			changeOrigin: true,
			pathRewrite: {
				'^/hbyfCloudApi': ''
			}
		},
		'/qcbApi': {
			target: 'http://114.55.43.36:9411/hbyf',
			changeOrigin: true,
			pathRewrite: {
				'^/qcbApi': ''
			}
		},
		'/wjcApi': {
			target: 'http://192.168.1.170:9413/hbyfIm',
			changeOrigin: true,
			pathRewrite: {
				'^/wjcApi': ''
			}
		}
		
	},
	test: {
		'/api/': {
			target: 'https://preview.pro.ant.design',
			changeOrigin: true,
			pathRewrite: { '^': '' },
		},
	},
	pre: {
		'/api/': {
			target: 'your pre url',
			changeOrigin: true,
			pathRewrite: { '^': '' },
		},
	},
};
