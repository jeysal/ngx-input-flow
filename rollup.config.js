export default {
  input: 'dist/index.js',
  output: {
    name: 'inputflow',
    file: 'dist/bundles/inputflow.umd.js',
    format: 'umd',
    sourcemap: true,
    globals: {
      '@angular/core': 'ng.core',
      'rxjs/Observable': 'Rx',
      'rxjs/Subject': 'Rx',
      'rxjs/observable/merge': 'Rx.Observable',
      'rxjs/observable/timer': 'Rx.Observable',
      'rxjs/operators': 'Rx.operators',
    },
  },
};
