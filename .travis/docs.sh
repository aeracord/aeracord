#!/bin/sh

# Setup git config
git config --global user.name "Travis CI"
git config --global user.email "travis@travis-ci.com"

git remote add origin-docs https://${GITHUB_TOKEN}@github.com/aeracord/aeracord.git
git checkout $TRAVIS_BRANCH

# Build docs
yarn docs

# Commit if docs have changed
if [[ $(git status) == *"docs.json"* ]]; then
    git add docs/docs.json
    git commit -m "[CI] Generated docs"
    git push --set-upstream origin-docs $TRAVIS_BRANCH
else
    echo "No changes to docs"
fi