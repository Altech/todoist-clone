// Basic objects and associations:
// ユーザーがある。
//  ユーザー以外のすべてのデータは、ただ一人のユーザーに必ず紐づく（少なくとも当面の間）。
// プロジェクトは0個以上のセクションを持つ.
// タスクはセクションに属しているかもしれないし、属していないかもしれない
// タスクは、
//   名前を持つ
//   完了ステータスを持つ
//   優先度を持つ
//   スケジュールを持つ期限を持つかもしれない
//   0個以上のコメントを持つ
//   プロジェクトまたはプロジェクトのセクションのいずれかに属しているかもしれない
//   0個以上のタグに紐づけられているかもしれない。
// スケジュールは、
//   期限を持つ。
//   期限は繰り返すかもしれない(不完全な定義)
// プロジェクトは、
//   ビューを持つ
// ビューは、
//   並び替え方法を持つ
//   レイアウト方法を持つ
// フィルタがある。
//   フィルタは、いろいろな条件によってタスクを抜き出し、一つの画面に並べる
//   「インボックス」という削除不可能な特別なフィルタがある。これは、プロジェクトに属していない全てのタスクを抜き出す
//   そのほかにも、「今日」「近日予定」という特別なフィルタがある。
//   フィルタもビューを持つ。
// タグがある。
//   名前のみを持つ。
// アクティビティがある。（ログ的なもの）
//   例：あるタスクを追加した

import type { Timestamp } from 'firebase/firestore';

// UI上、1行として表示されるものに一致する
export type Task = {
  __type: 'task';
  id?: string;
  createdAt?: Timestamp;
  done: boolean;
  name: string;
  scheduledAt: Timestamp | null;
};

export type Project = {
  __type: 'project';
  id?: string;
  createdAt?: Timestamp;
  name: string;
  color: string | null;
};

export type InboxType = { __type: 'inbox' };
export type TaskGroup = Project | InboxType;
export const Inbox: InboxType = { __type: 'inbox' };
