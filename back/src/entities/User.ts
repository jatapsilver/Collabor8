import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Credential } from "./Credential"
import { Appointment } from "./Appointment"


@Entity({
     name: "users"
}) 

export class User{
    @PrimaryGeneratedColumn()
    id : number

    @Column({length: 50})
    name: string

    @Column({unique: true})
    email: string

    @Column()
    birthdate: string
    
    @Column("integer")
    nDni: number
    
    @OneToOne(() => Credential, {cascade: true})
    @JoinColumn({name: "credential_id"})
    credential: Credential;


    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];

}


