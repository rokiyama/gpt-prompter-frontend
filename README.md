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

# increment ios buildNumber, build and submit via EAS
echo $(jq '. = (. + 1)' build-number.json) > build-number.json && \
npx eas-cli@latest build --platform ios --auto-submit --non-interactive --no-wait

# push store metadata
npx eas-cli@latest metadata:push
```
