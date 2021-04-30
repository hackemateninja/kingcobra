import styled, { keyframes } from 'styled-components';

const SkeletonShine = keyframes`
	100% {
		background-position-x: -200%;
	}
`;

const DealersSkeletonWrapper = styled.div`
  display: block;
  margin-top: 25px;
`;

const DealersSkeletonItem = styled.div<{ size: number }>`
  opacity: 0.7;
  margin: 0 0 50px 30px;
  border-radius: 3px;
  height: 20px;
  width: 92%;
  background: #e5e5e5;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZTVlNWU1IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTElIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjZTVlNWU1IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2U1ZTVlNSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=);
  background: -moz-linear-gradient(-45deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, #e5e5e5),
    color-stop(11%, #ffffff),
    color-stop(20%, #e5e5e5),
    color-stop(100%, #e5e5e5)
  );
  background: -webkit-linear-gradient(-45deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
  background: -o-linear-gradient(-45deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
  background: -ms-linear-gradient(-45deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
  background: linear-gradient(135deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e5e5e5', endColorstr='#e5e5e5',GradientType=1 );
  background-size: 200% 100%;
  animation: ${SkeletonShine} linear 1s infinite;
  box-shadow: inset ${(props) => `-${props.size}px`} 0px 0px 0px #fff;

  &:before {
    content: '';
    position: absolute;
    border-radius: 3px;
    top: 100%;
    margin: 5px 0 0;
    height: 18px;
    width: 100%;
    background: #e5e5e5;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZTVlNWU1IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTElIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMjAlIiBzdG9wLWNvbG9yPSIjZTVlNWU1IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2U1ZTVlNSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=);
    background: -moz-linear-gradient(-45deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      color-stop(0%, #e5e5e5),
      color-stop(11%, #ffffff),
      color-stop(20%, #e5e5e5),
      color-stop(100%, #e5e5e5)
    );
    background: -webkit-linear-gradient(-45deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
    background: -o-linear-gradient(-45deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
    background: -ms-linear-gradient(-45deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
    background: linear-gradient(135deg, #e5e5e5 0%, #ffffff 11%, #e5e5e5 20%, #e5e5e5 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#e5e5e5', endColorstr='#e5e5e5',GradientType=1 );
    background-size: 200% 100%;
    animation: ${SkeletonShine} linear 1s infinite;
  }
  &:after {
    content: '';
    position: absolute;
    border-radius: 3px;
    left: -30px;
    width: 20px;
    height: 20px;
    background: #e5e5e5;
  }
`;

const DealersSkeletonButton = styled.div`
  height: 50px;
  border-radius: 6px;
  background: #e5e5e5;
  opacity: 0.6;
`;

export { DealersSkeletonWrapper, DealersSkeletonItem, DealersSkeletonButton };
