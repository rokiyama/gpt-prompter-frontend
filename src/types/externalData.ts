export type SystemMessage = {
  id: string;
  text: string;
};

export function isSystemMessage(arg: any): arg is SystemMessage {
  return typeof arg.id === 'string' && typeof arg.text === 'string';
}
