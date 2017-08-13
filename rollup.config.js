export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/inputflow.umd.js',
  moduleName: 'inputflow',
  format: 'umd',
  sourceMap: true,
  globals: {
    '@angular/core': 'ng.core',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/observable/merge': 'Rx',
    'rxjs/observable/timer': 'Rx',
  },
};
