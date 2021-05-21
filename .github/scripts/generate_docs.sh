#!/bin/bash

# Setup git config
git config --global user.name "GitHub Actions"
git config --global user.email "actions@github.com"

# Get branch
BRANCH="$(echo "$GITHUB_REF" | cut -d "/" -f 3)"

git remote add origin-docs https://${GITHUB_TOKEN}@github.com/aeracord/aeracord.git

# Build docs
yarn docs

# Commit if docs have changed
if [[ $(git status) == *"docs.json"* ]]; then
    git add docs/docs.json
    git commit -m "[CI] Generated docs"
    git push --set-upstream origin-docs $BRANCH
else
    echo "No changes to docs"
fi