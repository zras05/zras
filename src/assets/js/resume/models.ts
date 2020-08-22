export interface SkillModel {
  label: string[]
  type: string | null
}

export interface ProjectModel {
  functions: string[]
  introduction: string[]
  name: string
  pid: string
  skills: SkillModel[]
  time: number[]
  timeStr?: string
  link?: string
}

export interface JobModel {
  cid: string
  company: string
  logo: string
  project: ProjectModel[]
  describe: string[]
  label: string[]
  time: number[]
  work: string
}

export interface CompanyModel {
  cid: string
  company: string
  logo: string
  project: ProjectModel[]
}

export interface WorkModel {
  cid: string
  company: string
  describe: string[]
  label: string[]
  time: number[]
  work: string
}

export interface ResumeInfoModel {
  address: string,
  age: number,
  education: string[],
  email: string,
  experience: number,
  name: string,
  phone: string,
  work: string[]
}
