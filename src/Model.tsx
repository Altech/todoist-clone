import type { Project } from './data/project';

export type InboxType = { __type: 'inbox'; name: '__inbox__' };
export type TodayFilterType = { __type: 'today'; name: '__today__' };
export type TaskGroup = Project | InboxType | TodayFilterType;
export const Inbox: InboxType = { __type: 'inbox', name: '__inbox__' };
export const TodayFilter: TodayFilterType = {
  __type: 'today',
  name: '__today__',
};
