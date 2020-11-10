import Container from '../../components/typ/container/index';
const PrimaryTheme = {
	fontFamily: 'Arial',
	colors: {
		primary: '#154175',
		primaryLight: '#2566b4',
		text: '#6B6B6B',
		background: '#FBFBFB',
	},
	container: {
		sm: '100%',
		md: '740px',
		lg: '1000px'
	},
	logo: {
		widthMobile: '43px',
		heightMobile: '20px',
		widthDesktop: '96px',
		heightDesktop: '42px'
	},
	header: {
		background: '#EBEBEB',
		marginMobile: '0 0 10px',
		marginDesktop: '0 0 42px',
		heightMobile: '28px',
		heightDesktop: '105px',
		decorationBackground: '#9B9B9B'
	},
	button: {
		background: '#E31818',
		border: '#D20F12',
		hover: 'linear-gradient( 90deg, #c61413 0, #9c0002 100% )'
	},
	quote: {
		background: '#F3F3F5',
		text: '#272727',
		name: '#787878'
	},
	typcontainer: {
		sm: '100%',
		md: '740px',
		lg: '1230px'
	},
	typHeaderLogo: {
		logoHeight: '62px',
	}
};

export default PrimaryTheme;