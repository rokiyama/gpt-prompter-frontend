import { IMessage, User as GiftedUser } from 'react-native-gifted-chat';

export type Message = {
  id: string;
  text: string;
  createdAt: number;
  user: User;
  system?: boolean;
};

export const toMessage = (m: IMessage): Message => ({
  ...m,
  id: typeof m._id === 'number' ? m._id.toString() : m._id,
  text: m.text,
  createdAt:
    typeof m.createdAt === 'object' ? m.createdAt.getTime() : m.createdAt,
  user: toUser(m.user),
  system: false,
});

export const toIMessage = (m: Message): IMessage => ({
  ...m,
  _id: m.id,
  user: toGiftedUser(m.user),
});

export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export const toUser = (user: GiftedUser): User => ({
  id: typeof user._id === 'number' ? user._id.toString() : user._id,
  name: user.name || '',
  avatar:
    typeof user.avatar !== 'string' ? user.avatar?.toString() : user.avatar,
});

export const toGiftedUser = (user: User): GiftedUser => ({
  ...user,
  _id: user.id,
});
