# gpt-prompter-frontend

## development

```sh
# expo
npm start

# tailwind
npm run dev:tailwind
```

## build

```sh
npm ci
npm run build:tailwind

# increment ios buildNumber
echo $(jq '. = (. + 1)' build-number.json) > build-number.json

# build and submit via EAS
npx eas-cli@latest build --platform ios --auto-submit

# push store metadata
npx eas-cli@latest metadata:push
```
