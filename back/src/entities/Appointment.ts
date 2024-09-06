import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppointmentStatus } from "../interfaces/IAppointment";
import { User } from "./User";


@Entity({

    name: "appointments"
})

export class Appointment {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    date : string

    @Column()    
    time : string

    @Column({
        type: "enum",
        enum: AppointmentStatus,
        default: AppointmentStatus.ACTIVE,
    })    
    status : AppointmentStatus

    @Column({
        length: 200
    })    
    description : string

    @ManyToOne(() => User, user => user.appointments)
    @JoinColumn({name: "user_id"})
    user: User;

};