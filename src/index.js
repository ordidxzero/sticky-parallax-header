import React from 'react';
import { AvatarHeader, TabbedHeader, DetailsHeader } from './predefinedComponents';
import {
  TABBED_HEADER_HEIGHT,
  TABBED_HEADER_IPHONE_X_HEIGHT,
  START_TABBED_HEADER_TITLE_FADE,
  FINISH_TABBED_HEADER_TITLE_FADE,
  DEFAULT_PARALLAX_HEIGHT,
} from './constants';
import StickyParallaxHeader from './StickyParallaxHeader';

const index = (props) => {
  // eslint-disable-next-line react/prop-types
  switch (props.headerType) {
    case 'TabbedHeader':
      return <TabbedHeader {...props} />;
    case 'AvatarHeader':
      return <AvatarHeader {...props} />;
    case 'DetailsHeader':
      return <DetailsHeader {...props} />;
    default:
      return <StickyParallaxHeader {...props} />;
  }
};

export const getConstants = () => ({
  TABBED_HEADER_IPHONE_X_HEIGHT,
  TABBED_HEADER_HEIGHT,
  START_TABBED_HEADER_TITLE_FADE,
  FINISH_TABBED_HEADER_TITLE_FADE,
  DEFAULT_PARALLAX_HEIGHT,
});

export default index;
