export default {
  input: 'dist/index.js',
  name: 'inputflow',
  sourcemap: true,
  output: {
    file: 'dist/bundles/inputflow.umd.js',
    format: 'umd',
  },
  globals: {
    '@angular/core': 'ng.core',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/observable/merge': 'Rx',
    'rxjs/observable/timer': 'Rx',
  },
};
