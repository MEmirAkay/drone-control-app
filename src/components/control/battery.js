import styled from 'styled-components';

const BatteryStyles = styled.div` 
  width: 100%;
  --color: ${props => (props.level > 20 ? '#1af21a' : '#bb0707')};
  border: 1px white;
  border-radius: 50px;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  box-shadow: 
    12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
  background: white;
  .batteryLevel {
    transition: all 0.5s;
    width: ${props => props.level}%;
    text-align: center;
    color: white;
    background: var(--color);
  }
`;

const Battery = props => (
  <BatteryStyles level={props.battery}>
    <span className="batteryLevel">{props.battery}%</span>
  </BatteryStyles>
);

Battery.defaultProps = {
  battery: 'LOADING...',
};

export default Battery;