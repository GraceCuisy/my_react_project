const { override, 
        fixBabelImports,
        addLessLoader,
        addWebpackAlias,//专门用来配置路径别名的
        addDecoratorsLegacy,
      } = require('customize-cra');
const { resolve } = require("path");
module.exports = override(
    fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
   }),
  addWebpackAlias({
		"@": resolve(__dirname, "src")
  }),
  addDecoratorsLegacy(),//用于支持装饰器语法
)