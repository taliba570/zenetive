import { User } from '../user.entity';

export interface UpdateUserDTO extends Partial<User> {}
