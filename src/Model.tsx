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

import {
  Timestamp,
  FirestoreDataConverter,
  DocumentData,
  serverTimestamp,
} from 'firebase/firestore';

// UI上、1行として表示されるものに一致する
export type Task = {
  __type: 'task';
  id?: string;
  createdAt?: Date;
  done: boolean;
  name: string;
  scheduledAt: Date | null;
};

export const newTask: () => Task = () => {
  return {
    __type: 'task',
    done: false,
    name: '',
    scheduledAt: null,
  };
};

export const TaskConverter: FirestoreDataConverter<Task> = {
  toFirestore: (task) => {
    return {
      __type: 'task',
      done: task.done,
      name: task.name,
      scheduledAt: task.scheduledAt
        ? Timestamp.fromDate(task.scheduledAt)
        : null,
      createdAt: task.createdAt
        ? Timestamp.fromDate(task.createdAt)
        : serverTimestamp(),
    };
  },
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    const task = {
      id: snapshot.id,
      ...data,
      scheduledAt: data.scheduledAt?.toDate(),
      createdAt: data.createdAt?.toDate(),
    } as Task;
    task.id = snapshot.id;
    return task;
  },
};

export type Project = {
  __type: 'project';
  id?: string;
  createdAt?: Timestamp;
  name: string;
  color: string | null;
};

export type InboxType = { __type: 'inbox'; name: '__inbox__' };
export type TodayFilterType = { __type: 'today'; name: '__today__' };
export type TaskGroup = Project | InboxType | TodayFilterType;
export const Inbox: InboxType = { __type: 'inbox', name: '__inbox__' };
export const TodayFilter: TodayFilterType = {
  __type: 'today',
  name: '__today__',
};
