export interface Task {
    id: number;
    // userId: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    removedAt: Date;
    completedAt: Date;
    isCompleted: boolean;
  }
  