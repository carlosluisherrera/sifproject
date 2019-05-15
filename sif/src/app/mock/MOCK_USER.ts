import { User } from "../model/user";

export const MOCK_USERS:User[] = [
    {id:1, nickname:'admin', password:'admin', full_name: 'Admin Admin', level:2 },
    {id:2, nickname:'contribuitor', password:'contribuitor', full_name: 'Contribuitor Contribuitor', level:0 },
    {id:3, nickname:'supervisor', password:'supervisor', full_name: 'Supervisor Supervisor', level:1 }
];