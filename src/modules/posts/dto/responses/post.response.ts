import { Resource } from '../../../common/resources/resources';

export class PostsResource extends Resource<any> {
  toArray() {
    const _self = this as this & any;
    console.log(_self);
    return {
      id: _self.post_id || _self.id || null,
      userId: _self.post_userId || _self.userId || null,
      movieId: _self.post_movieId || _self.movieId || null,
      content: _self.post_content || _self.content || null,
      time: _self.post_time || _self.time || null,
      point: _self.post_point || _self.point || null,
      user: _self.user || null,
    };
  }
}
