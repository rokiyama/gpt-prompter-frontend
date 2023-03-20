import * as ExpoSpeech from 'expo-speech';
import { useCallback, useEffect, useState } from 'react';

export const useSpeech = () => {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    ExpoSpeech.getAvailableVoicesAsync().then((voices) =>
      console.log(
        JSON.stringify(
          voices.filter((v) => v.language.indexOf('ja') > -1),
          null,
          '  '
        )
      )
    );
  }, []);

  const speak = useCallback((text: string) => {
    setSpeaking(true);
    ExpoSpeech.speak(text, {
      language: 'ja',
      voice: 'com.apple.ttsbundle.siri_O-ren_ja-JP_compact',
      onDone() {
        console.log('done');
        setSpeaking(false);
      },
      onStopped() {
        console.log('stopped');
        setSpeaking(false);
      },
      onError: (err) => {
        console.error(err);
        setSpeaking(false);
      },
    });
  }, []);

  const stop = useCallback(() => {
    ExpoSpeech.stop();
    setSpeaking(false);
  }, []);

  return { speaking, speak, stop };
};
