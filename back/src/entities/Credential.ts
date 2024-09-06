import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({

    name: "credentials"

})

export class Credential {
 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, length: 50})
    username: string;

    @Column()
    password: string;

    

}
