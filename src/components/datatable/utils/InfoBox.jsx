import { InfoContainer } from "../styles/TableUtilStyles";

function InfoBox({ title, count, children }) {
  return (
    <InfoContainer>
      <div className="info-box">
        <div className="title">{title}</div>
        <div className="count-box">
          <span>전체</span>
          <span className="count">{count}</span>
          <span>건</span>
        </div>
      </div>
      <div className="button-box">
        {children}
      </div>
    </InfoContainer>
  );
};

export default InfoBox;