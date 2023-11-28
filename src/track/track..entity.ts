import { AlbumEntity } from "src/album/album.entity";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne } from "typeorm";

export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: String

    @Column()
    duration: number

    @ManyToOne(() => AlbumEntity, album => album.tracks)
    album: AlbumEntity;
}
