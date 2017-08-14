# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.0"></a>
# [1.0.0](https://github.com/jeysal/ngx-input-flow/compare/0.1.0...1.0.0) (2017-08-14)


### Bug Fixes

* update the flow item when the emptyItem generator changes ([4a683cf](https://github.com/jeysal/ngx-input-flow/commit/4a683cf))


### Features

* add focusDebounce option to ngxInputFlowModel ([d00a093](https://github.com/jeysal/ngx-input-flow/commit/d00a093))


### BREAKING CHANGES

* (only in case you're using the ArrayManager API)
ArrayManager#checkItem has been renamed to
ArrayManager#checkItems and now takes an array of items
instead of a single one.
Upgrade path: wrap the item you pass in a single-element array.



<a name="0.1.0"></a>
# 0.1.0 (2017-07-23)


### Features

* after 1000 rewrites, finally put it on gh 🎉 ([ef06f8d](https://github.com/jeysal/ngx-input-flow/commit/ef06f8d))
