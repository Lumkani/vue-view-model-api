nvm install

echo ""
echo "serve_docs                Serves the Vuepress documentation for development"
echo ""
echo "build_docs                Build the Vuepress documentation to static files"
echo ""
echo "build_package             Builds the plugin for distribution via NPM"
echo ""
echo "run_tests                 Runs the Jest test suite"
echo ""
echo "run_lint                  Runs Eslint to enforce code style"
echo ""
echo "upload_coverage           Uploads the Jest coverage to Codecov.io"
echo ""
echo "netlify_pipeline          Runs the necessary commands for the deployment of the documentation on Netlify"
echo ""
echo "publish_package_beta      Publishes the package with the [ beta ] flag"
echo ""
echo "publish_package_prod      Publishes the package to production"

function serve_docs {
  pnpx vuepress dev docs
}

function build_docs {
  cd docs/
  pnpx vuepress build
  cd ..
}

function build_package {
  pnpm run build
}

function run_tests {
  pnpx jest --verbose --coverage
}

function run_lint {
  pnpx eslint --ext .js .
}

function upload_coverage {
  pnpx codecov $@
}

function publish_package_beta {
  package_version=$(node -p "require('./package.json').version")

  echo ""
  echo "Package version: $package_version"
  
  if [[ $package_version =~ "beta" ]]; then
    npm publish --tag="beta"
  else
    echo ""
    echo "You can only publish a package with [ beta ] in the name"
  fi
}

function publish_package_prod {
  package_version=$(node -p "require('./package.json').version")

  echo ""
  echo "Package version: $package_version"
  
  if [[ ! $package_version =~ "beta" ]]; then
    npm publish
  else
    echo ""
    echo "You can only publish a package without [ beta ] in the name"
  fi
}

function netlify_pipeline {
  npm i -g pnpm

  build_package && run_lint && run_tests && upload_coverage && build_docs
}