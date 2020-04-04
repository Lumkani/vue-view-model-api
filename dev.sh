nvm install

function build_docs {
  cd docs/
  pnpx vuepress build
  cd ..
}

function run_tests {
  pnpx jest --verbose --coverage
}

function upload_coverage {
  pnpx codecov
}

function netlify_pipeline {
  run_tests
  upload_coverage
  build_docs
}