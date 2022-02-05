import { Resource } from '../../../common/resources/resources';

export class PostsResource extends Resource<any> {
  toArray() {
    const _self = this as this & any;
    console.log(_self);
    return {
      id: _self.post_id || null,
      userId: _self.post_userId || null,
      movieId: _self.post_movieId || null,
      content: _self.post_content || null,
      time: _self.post_time || null,
      point: _self.post_point || null,
    };
  }
}
