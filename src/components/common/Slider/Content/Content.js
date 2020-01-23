import React from 'react';
import IconCross from '../Icons/IconCross';

import styles from './Content.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Content = ({ media, onClose }) => (
  <div className={cx("content")}>
    <div className={cx("content__background")}>
      <div className={cx("content__background__shadow")} />
      <div
        className={cx("content__background__image")}
        style={{ 'backgroundImage': `url(https://image.tmdb.org/t/p/w300${media.backdrop_path})` }}
      />
    </div>
    <div className={cx("content__area")}>
      <div className={cx("content__area__container")}>
        <div className={cx("content__title")}>{media.title ? media.title : media.name}</div>
        <div className={cx("content__description")}>
          {media.overview}
        </div>
      </div>
      <button className={cx("content__close")} onClick={onClose}>
        <IconCross />
      </button>
    </div>
  </div>
);

export default Content;
