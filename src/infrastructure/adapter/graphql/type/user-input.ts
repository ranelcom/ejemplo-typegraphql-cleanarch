import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from '../../util/isEmailAlreadyExist';
import UserInputDomain from '../../../../domain/user-input';

@InputType()
export class UserInput {
  @Field()
  @Length(1, 255)
  firstName!: string;

  @Field()
  @Length(1, 255)
  lastName!: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'email en uso!!' })
  email!: string;

  @Field()
  password!: string;

  public toDomain(): UserInputDomain {
      return {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
      };
  }
}
