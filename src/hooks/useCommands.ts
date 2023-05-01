import { getLocales } from 'expo-localization';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { Command, selectCommands } from '../redux/slices/externalDataSlice';

export const useCommands = () => {
  const [localeCommands, setLocaleCommands] = useState<Array<Command>>([]);
  const commands = useAppSelector(selectCommands);

  useEffect(() => {
    const locales = getLocales()[0];
    setLocaleCommands(
      commands[locales.languageCode] || commands['ja'] || commands['en']
    );
  }, [commands]);

  return { commands: localeCommands };
};
