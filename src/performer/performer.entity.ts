import { PrimaryGeneratedColumn,Column } from "typeorm";
import { ManyToMany } from "typeorm";
import { AlbumEntity } from "src/album/album.entity";

export class PerformerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: String

    @Column()
    image: String

    @Column()
    description: String

    @ManyToMany(() => AlbumEntity, album => album.performers)
    albums: AlbumEntity[];


}
