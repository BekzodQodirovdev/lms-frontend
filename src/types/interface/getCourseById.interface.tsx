import { IGroup } from "./student.interface";


export interface ICourse {
  course_id: string;
  name: string;
  description: string;
  duration: string;
  status: string;
  created_at: string;
  updated_at: string;
  groups: IGroup[]
}
