import { PerformerEntity } from "src/performer/performer.entity";
import { TrackEntity } from "src/track/track..entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    cover:string

    @Column()
    launch_date: Date

    @Column()
    description: Date

    @OneToMany(() => TrackEntity, track => track.album)
    tracks: TrackEntity[];

    @ManyToMany(() => PerformerEntity, performer => performer.albums)
    performers: PerformerEntity[];



}
