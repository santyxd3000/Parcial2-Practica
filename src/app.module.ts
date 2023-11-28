import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { PerformerModule } from './performer/performer.module';
import { TrackModule } from './track/track.module';
import { PerformerAlbumModule } from './performer-album/performer-album.module';

@Module({
  imports: [AlbumModule, PerformerModule, TrackModule, PerformerAlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
