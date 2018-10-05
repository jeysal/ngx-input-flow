export default {
  input: 'dist/index.js',
  output: {
    name: 'inputflow',
    file: 'dist/bundles/inputflow.umd.js',
    format: 'umd',
    sourcemap: true,
    globals: {
      rxjs: 'Rx',
      'rxjs/operators': 'Rx.operators',
      '@angular/core': 'ng.core',
    },
  },
};
