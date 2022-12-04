import * as React from "react";
import { MatchContext } from "../../App";
import { flags } from "../../services/flags";
import style from "./SchedulePage.module.scss";

const SchedulePage = () => {
  const matcheData = React.useContext(MatchContext);
  const getFlag = (name) => {
    const flagDetails = flags.filter((item) => {
      return item.name.toLocaleLowerCase() === name.toLocaleLowerCase();
    });
    return flagDetails[0]?.flag;
  };
  const getDateInFormate = (time) => {
    const t = new Date(time);
    const d = t.getDate();
    const m = t.getMonth();
    const y = t.getFullYear();
    const hh = t.getHours();
    const mm = t.getMinutes();
    return (
      <>
        <div>{`${d}.${m}.${y}`}</div>
        <div>{`${hh}:${mm}`}</div>
      </>
    );
  };
  return (
    <div className={style.tableContainer}>
      <h1>League Schedule</h1>
      <div className={style.tablewrapper} aria-label="table">
        <div className={style.tableHead}>
          <div className={style.tableHeadRow}>
            <div className={style.tableHeadRowData}>Date/Time</div>
            <div className={style.tableHeadRowData}>Stadim</div>
            <div className={style.tableHeadRowData}>Home Team</div>
            <div className={style.tableHeadRowData}></div>
            <div className={style.tableHeadRowData}>Away Team</div>
          </div>
        </div>
        <div className={style.tableBody}>
          {matcheData &&
            matcheData.length > 0 &&
            matcheData.map((row, index) => {
              return (
                <div className={style.tableBodyRow} key={row.matchDate + index}>
                  <div className={style.tableBodyRowData}>
                    {getDateInFormate(row.matchDate)}
                  </div>
                  <div className={style.tableBodyRowData}>{row.stadium}</div>
                  <div className={style.tableBodyRowData}>
                    <span className={style.flagWithName}>
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {row.homeTeam}
                      </span>
                      <span>
                        <img
                          src={getFlag(row.homeTeam)}
                          name={row.homeTeam}
                          alt={row.homeTeam}
                          className={style.flagImg}
                        />
                      </span>
                    </span>
                  </div>
                  <div className={style.tableBodyRowData}>
                    <span style={{ fontWeight: "bold" }}>
                      {row.homeTeamScore}
                    </span>{" "}
                    :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {row.awayTeamScore}
                    </span>
                  </div>
                  <div className={style.tableBodyRowData}>
                    <span className={style.flagWithName}>
                      <span>
                        <img
                          src={getFlag(row.awayTeam)}
                          name={row.awayTeam}
                          alt={row.awayTeam}
                          className={style.flagImg}
                        />
                      </span>
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {row.awayTeam}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default SchedulePage;
