export interface Student {
   _id: string;
   name: string;
   email: string;
   cohort: string;
   phoneNumber: Number;
}

export interface StudentAcc {
   _id: string,
   student_id: string,
   bank: string,
   branch: string,
   account_num: string,
   status: string,
   account_type: string
}
