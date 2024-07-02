export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Course {
  name: string;
  provider: string;
  issued: string;
  credentialUrl?: string;
  skills: string[];
}

export interface Technology {
  name: string;
  courses: Course[];
}
