import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import pkg from './package.json'

const config = {
  input: 'src/index.jsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      name: 'Example',
      sourcemap: true,
      exports: 'named',
      freeze: false,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named',
      freeze: false,
    },
  ],
  external: ['react', 'react-dom', 'guify'],
  plugins: [babel({ exclude: 'node_modules/**' }), resolve(), commonjs()],
}

export default config
