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

# increment ios buildNumber
jq '.expo.ios.buildNumber = (."expo".ios.buildNumber | tonumber + 1 | tostring) | . ' app.json > app_new.json && mv app_new.json app.json

# build and submit via EAS
eas build --platform ios --auto-submit

# push store metadata
eas metadata:push
```
