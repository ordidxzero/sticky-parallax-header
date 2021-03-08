import React from 'react';
import {
  TABBED_HEADER_HEIGHT,
  TABBED_HEADER_IPHONE_X_HEIGHT,
  START_TABBED_HEADER_TITLE_FADE,
  FINISH_TABBED_HEADER_TITLE_FADE,
} from './constants';
import { AvatarHeader, TabbedHeader, DetailsHeader } from './predefinedComponents';
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

export default index;

export {
  TABBED_HEADER_HEIGHT,
  TABBED_HEADER_IPHONE_X_HEIGHT,
  START_TABBED_HEADER_TITLE_FADE,
  FINISH_TABBED_HEADER_TITLE_FADE,
};
