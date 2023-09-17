# gpt-prompter-frontend

## development

```sh
# expo
npm start

# tailwind
npm run dev:tailwind
```

## production

```sh
npm ci
npm run build:tailwind

# build and submit via EAS
npx eas-cli@latest build --profile production --platform ios --auto-submit --non-interactive --no-wait

# update
npx eas-cli@latest update --branch production --platform ios

# push store metadata
npx eas-cli@latest metadata:push
```

### preview

```sh
# build
npx eas-cli@latest build --profile preview --platform ios --non-interactive --no-wait

# update
npx eas-cli@latest update --branch preview --platform ios
```
