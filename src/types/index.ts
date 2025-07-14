// Tipos globales de la aplicación
export type UserRole = 'student' | 'teacher' | 'coordinator' | 'rector';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  grade: string;
  subjects: Subject[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  specialization: string;
  subjects: Subject[];
  hireDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  grade: string;
  teacherId: string;
  teacher: Teacher;
  students: Student[];
  isActive: boolean;
  schedule: ClassSchedule[];
}

export interface ClassSchedule {
  id: string;
  subjectId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  classroom: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subject: Subject;
  dueDate: Date;
  maxGrade: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grade {
  id: string;
  studentId: string;
  student: Student;
  assignmentId: string;
  assignment: Assignment;
  grade: number;
  comments?: string;
  gradedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'presentation' | 'link' | 'quiz';
  subjectId: string;
  subject: Subject;
  fileUrl?: string;
  externalUrl?: string;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  subjectId: string;
  subject: Subject;
  authorId: string;
  author: User;
  isPinned: boolean;
  isLocked: boolean;
  views: number;
  likes: number;
  replies: ForumReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumReply {
  id: string;
  content: string;
  postId: string;
  post: ForumPost;
  authorId: string;
  author: User;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  userId: string;
  user: User;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentSchedule {
  id: string;
  studentId: string;
  student: Student;
  subjectId: string;
  subject: Subject;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  classroom: string;
  teacher: Teacher;
}

export interface SubmittedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadDate: Date;
  url?: string;
}

export interface StudentAssignment {
  id: string;
  studentId: string;
  student: Student;
  assignmentId: string;
  assignment: Assignment;
  status: 'pending' | 'submitted' | 'graded' | 'completed' | 'late';
  submittedAt?: Date;
  grade?: number;
  comments?: string;
  submittedFiles: SubmittedFile[];
  isLate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentGrade {
  id: string;
  studentId: string;
  student: Student;
  subjectId: string;
  subject: Subject;
  assignmentId: string;
  assignment: Assignment;
  grade: number;
  maxGrade: number;
  percentage: number;
  comments?: string;
  gradedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}