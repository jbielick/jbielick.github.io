#!/bin/sh

set -euo pipefail

DIRTY_OK="${DIRTY_OK:-}"

DIR=$(dirname "$0")

cd $DIR/..

if [[ $(git status -s) ]] && [ "$DIRTY_OK" != "y" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

git submodule update

echo "Checking out master branch into public"
git worktree add -B master public origin/master

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo

echo 'joshbielick.com' > public/CNAME

echo "Updating and pushing master branch"
cd public && git add --all && git commit -m "Publishing to master (publish.sh)" && git push origin

echo "Done!"