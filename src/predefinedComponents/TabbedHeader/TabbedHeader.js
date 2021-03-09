import React from 'react';
import { Text, View, Image, StatusBar, Animated, ViewPropTypes } from 'react-native';
import { arrayOf, bool, number, shape, string, func } from 'prop-types';
import StickyParallaxHeader from '../../index';
import {
  constants,
  colors,
  sizes,
  START_TABBED_HEADER_TITLE_FADE,
  FINISH_TABBED_HEADER_TITLE_FADE,
} from '../../constants';
import styles from './TabbedHeader.styles';
import RenderContent from './defaultProps/defaultProps';

const { event, ValueXY } = Animated;
export default class TabbedHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentHeight: {},
      foregroundHeight: 0,
      headerLayout: {
        height: 0,
      },
    };
    this.scrollY = new ValueXY();
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.scrollY.y.addListener(({ value }) => (this._value = value));
  }

  componentWillUnmount() {
    this.scrollY.y.removeListener();
  }

  setHeaderSize = (headerLayout) => this.setState({ headerLayout });

  scrollPosition = (value) => {
    const { headerLayout } = this.state;

    return constants.scrollPosition(headerLayout.height, value);
  };

  renderLogoHeader = () => {
    const { backgroundColor, logo, logoResizeMode, logoStyle, logoContainerStyle } = this.props;

    return (
      <View style={[logoContainerStyle, { backgroundColor }]}>
        <Image resizeMode={logoResizeMode} source={logo} style={logoStyle} />
      </View>
    );
  };

  renderHeader = () => {
    const { header, getForegroundHeight } = this.props;
    const renderHeader = header || this.renderLogoHeader;

    return renderHeader();
  };

  renderForeground = (scrollY) => {
    const { title, titleStyle, children } = this.props;
    const messageStyle = titleStyle || styles.message;
    const [startTitleFade, finishTitleFade] = [
      START_TABBED_HEADER_TITLE_FADE,
      FINISH_TABBED_HEADER_TITLE_FADE,
    ];

    const titleOpacity = scrollY.y.interpolate({
      inputRange: [0, startTitleFade, finishTitleFade],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View
        style={styles.foreground}
        onLayout={({ nativeEvent: { layout } }) => getForegroundHeight(layout.height)}>
        {children}
        <Animated.View
          style={[styles.messageContainer, { opacity: titleOpacity }]}
          onLayout={({ nativeEvent: { layout } }) => getForegroundHeight(layout.height)}>
          <Text style={messageStyle}>{title}</Text>
        </Animated.View>
      </View>
    );
  };

  onLayoutContent = (e, title) => {
    const { contentHeight } = this.state;
    const contentHeightTmp = { ...contentHeight };
    contentHeightTmp[title] = e.nativeEvent.layout.height;

    this.setState({
      contentHeight: { ...contentHeightTmp },
    });
  };

  calcMargin = (title) => {
    const { contentHeight } = this.state;
    let marginBottom = 50;

    if (contentHeight[title]) {
      const padding = 24;
      const isBigContent = constants.deviceHeight - contentHeight[title] < 0;

      if (isBigContent) {
        return marginBottom;
      }

      marginBottom =
        constants.deviceHeight - padding * 2 - sizes.headerHeight - contentHeight[title];

      return marginBottom;
    }

    return marginBottom;
  };

  render() {
    const {
      tabs,
      title,
      headerHeight,
      parallaxHeight,
      backgroundColor,
      backgroundImage,
      bounces,
      snapToEdge,
      scrollEvent,
      renderBody,
      tabTextStyle,
      tabTextActiveStyle,
      tabTextContainerStyle,
      tabTextContainerActiveStyle,
      tabWrapperStyle,
      tabsContainerStyle,
      onRef,
    } = this.props;

    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor={backgroundColor} translucent />
        <StickyParallaxHeader
          foreground={this.renderForeground(this.scrollY)}
          header={this.renderHeader()}
          deviceWidth={constants.deviceWidth}
          parallaxHeight={parallaxHeight}
          scrollEvent={event([{ nativeEvent: { contentOffset: { y: this.scrollY.y } } }], {
            useNativeDriver: false,
            listener: (e) => scrollEvent && scrollEvent(e),
          })}
          headerSize={this.setHeaderSize}
          headerHeight={headerHeight}
          tabs={tabs}
          tabTextStyle={tabTextStyle}
          tabTextActiveStyle={tabTextActiveStyle}
          tabTextContainerStyle={tabTextContainerStyle}
          tabTextContainerActiveStyle={tabTextContainerActiveStyle}
          tabsContainerBackgroundColor={backgroundColor}
          tabWrapperStyle={tabWrapperStyle}
          backgroundImage={backgroundImage}
          bounces={bounces}
          snapToEdge={snapToEdge}
          tabsContainerStyle={tabsContainerStyle}
          onRef={onRef}>
          {renderBody(title)}
        </StickyParallaxHeader>
      </>
    );
  }
}

TabbedHeader.propTypes = {
  backgroundColor: string,
  headerHeight: number,
  parallaxHeight: number,
  backgroundImage: Image.propTypes.source,
  title: string,
  bounces: bool,
  snapToEdge: bool,
  tabs: arrayOf(shape({})),
  renderBody: func,
  logo: Image.propTypes.source,
  logoResizeMode: string,
  logoStyle: ViewPropTypes.style,
  logoContainerStyle: ViewPropTypes.style,
  tabTextStyle: Text.propTypes.style,
  tabTextActiveStyle: Text.propTypes.style,
  tabTextContainerStyle: ViewPropTypes.style,
  tabTextContainerActiveStyle: ViewPropTypes.style,
  scrollEvent: func,
  tabWrapperStyle: ViewPropTypes.style,
  tabsContainerStyle: ViewPropTypes.style,
  foregroundImage: Image.propTypes.source,
  titleStyle: Text.propTypes.style,
  header: func,
  onRef: func,
};

TabbedHeader.defaultProps = {
  backgroundColor: colors.primaryGreen,
  headerHeight: sizes.headerHeight,
  parallaxHeight: sizes.homeScreenParallaxHeader,
  backgroundImage: null,
  title: "Mornin' Mark! \nReady for a quiz?",
  bounces: true,
  snapToEdge: true,
  logo: require('../../assets/images/logo.png'),
  logoResizeMode: 'contain',
  logoStyle: styles.logo,
  logoContainerStyle: styles.headerWrapper,
  renderBody: (title) => <RenderContent title={title} />,
  tabs: [
    {
      title: 'Popular',
      content: <RenderContent title="Popular Quizes" />,
    },
    {
      title: 'Product Design',
      content: <RenderContent title="Product Design" />,
    },
    {
      title: 'Development',
      content: <RenderContent title="Development" />,
    },
    {
      title: 'Project Management',
      content: <RenderContent title="Project Management" />,
    },
  ],
  tabTextStyle: styles.tabText,
  tabTextActiveStyle: styles.tabText,
  tabTextContainerStyle: styles.tabTextContainerStyle,
  tabTextContainerActiveStyle: styles.tabTextContainerActiveStyle,
  tabWrapperStyle: styles.tabsWrapper,
  onRef: null,
};
