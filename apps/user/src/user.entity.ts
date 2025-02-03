import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;

    // I'm declaring the method async function to hash the password before saving it to the database
    async hashPassword(): Promise<void>{
        this.password = await bcrypt.hash(this.password, 10);
    };

    // I'm declaring the method async function to compare the password
    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}