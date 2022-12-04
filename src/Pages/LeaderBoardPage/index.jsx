import React, { useEffect, useContext, useState } from "react";
import { MatchContext } from "../../App";
import { flags } from "../../services/flags";
import style from "./LeaderBoardPage.module.scss";
import LeagueService from "../../services/LeagueService";

const LeaderBoardPage = () => {
  const { setMatches, getMatches } = new LeagueService();
  const [standings, setStandings] = useState([]);
  const matcheData = useContext(MatchContext);
  const getFlag = (name) => {
    const flagDetails = flags.filter((item) => {
      return item?.name?.toLocaleLowerCase() === name?.toLocaleLowerCase();
    });
    return flagDetails[0]?.flag;
  };
  const sortMatches = (a, b) => {
    if (a.points > b.points) {
      return -1;
    }
    if (a.points < b.points) {
      return 1;
    }
    return 0;
  };
  useEffect(() => {
    if (matcheData?.length > 0) {
      let standing = [];
      matcheData.map((match, index) => {
        const awayTeamIndex = standing.findIndex(
          (item) => item?.name == match?.awayTeam
        );
        const homeTeamIndex = standing.findIndex(
          (item) => item?.name == match?.homeTeam
        );
        if (awayTeamIndex >= 0) {
          standing[awayTeamIndex] = {
            name: match.awayTeam,
            matchPlayed: standing[awayTeamIndex].matchPlayed + 1,
            goalsFor: standing[awayTeamIndex].goalsFor + match.awayTeamScore,
            goalsAgainst:
              standing[awayTeamIndex].goalsAgainst + match.homeTeamScore,
            points:
              standing[awayTeamIndex].points +
              (match.awayTeamScore == match.homeTeamScore
                ? 1
                : match.awayTeamScore > match.homeTeamScore
                ? 3
                : 0),
          };
        }
        if (homeTeamIndex >= 0) {
          standing[homeTeamIndex] = {
            name: match.homeTeam,
            matchPlayed: standing[homeTeamIndex].matchPlayed + 1,
            goalsFor: standing[homeTeamIndex].goalsFor + match.homeTeamScore,
            goalsAgainst:
              standing[homeTeamIndex].goalsAgainst + match.awayTeamScore,
            points:
              standing[homeTeamIndex].points +
              (match.homeTeamScore == match.awayTeamScore
                ? 1
                : match.awayTeamScore < match.homeTeamScore
                ? 3
                : 0),
          };
        }
        if (!(homeTeamIndex >= 0)) {
          standing = [
            ...standing,
            ...[
              {
                name: match?.homeTeam,
                matchPlayed: 1,
                goalsFor: match?.homeTeamScore,
                goalsAgainst: match?.awayTeamScore,
                points:
                  match?.homeTeamScore == match?.awayTeamScore
                    ? 1
                    : match?.awayTeamScore < match?.homeTeamScore
                    ? 3
                    : 0,
              },
            ],
          ];
        }
        if (!(awayTeamIndex >= 0)) {
          standing = [
            ...standing,
            ...[
              {
                name: match?.awayTeam,
                matchPlayed: 1,
                goalsFor: match?.awayTeamScore,
                goalsAgainst: match?.homeTeamScore,
                points:
                  match?.homeTeamScore == match?.awayTeamScore
                    ? 1
                    : match?.awayTeamScore > match?.homeTeamScore
                    ? 3
                    : 0,
              },
            ],
          ];
        }
      });
      setStandings([...standings, ...standing].sort(sortMatches));
    }
  }, [matcheData]);

  return (
    <div className={style.tableContainer}>
      <h1>League Standings</h1>
      <div className={style.tablewrapper} aria-label="table">
        <div className={style.tableHead}>
          <div className={style.tableHeadRow}>
            <div
              className={style.tableHeadRowData}
              style={{ width: "60%", textAlign: "left", marginLeft: "16px" }}
            >
              Team Name
            </div>
            <div className={style.tableHeadRowData} style={{ width: "10%" }}>
              MP
            </div>
            <div className={style.tableHeadRowData} style={{ width: "10%" }}>
              GF
            </div>
            <div className={style.tableHeadRowData} style={{ width: "10%" }}>
              GA
            </div>
            <div className={style.tableHeadRowData} style={{ width: "10%" }}>
              Points
            </div>
          </div>
        </div>
        <div className={style.tableBody}>
          {standings?.length > 0 &&
            standings.map((row, index) => {
              return (
                <div className={style.tableBodyRow} key={row.name + index}>
                  <div
                    className={style.tableBodyRowData}
                    style={{
                      width: "60%",
                      textAlign: "left",
                      marginLeft: "16px",
                      fontSize: "16px",
                    }}
                  >
                    <span className={style.flagWithName}>
                      <span className={style.flagImg}>
                        <img
                          src={getFlag(row.name)}
                          name={row.name}
                          alt={row.name}
                        />
                      </span>
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {row.name}
                      </span>
                    </span>
                  </div>
                  <div
                    className={style.tableBodyRowData}
                    style={{ width: "10%" }}
                  >
                    {row.matchPlayed}
                  </div>
                  <div
                    className={style.tableBodyRowData}
                    style={{ width: "10%" }}
                  >
                    {row.goalsFor}
                  </div>
                  <div
                    className={style.tableBodyRowData}
                    style={{ width: "10%" }}
                  >
                    {row.goalsAgainst}
                  </div>
                  <div
                    className={style.tableBodyRowData}
                    style={{ width: "10%", color: "blue", fontWeight: "bold" }}
                  >
                    {row.points}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default LeaderBoardPage;
