import typescript from '@rolldown/rolldown-plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/wireframe.js',
      format: 'iife',
      name: 'wireframe',
      plugins: []
    },
    {
      file: 'dist/wireframe.esm.js',
      format: 'esm',
      plugins: []
    },
    {
      file: 'dist/wireframe.min.js',
      format: 'iife',
      name: 'wireframe',
      plugins: [],
      minify: true
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false
    })
  ]
}
