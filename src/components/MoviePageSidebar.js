/** @jsx jsx */
import { jsx, css } from '@emotion/core';

// styles
const sideContent = css`
    padding: 20px;
    border-left: 1px #555 solid;
    color: #fff;
    line-height: 22px;
    & > div {
        padding-bottom: 15px;
    }
    & h4 {
        font-size: 17px;
    }
    & li, p {
        font-size: 14px;
    }
`;
const otherCrewContainer = css`
    border-top: 1px #555 solid;
    padding: 15px 0;
    & ul > li {
        margin-bottom: 10px;
        & p {
            line-height: 18px;
        }
    }
`;
const crewName = css`
    font-weight: bold;
`;
const crewDepartment = css`
    font-style: italic;
`;
const crewTitle = css`
    margin-bottom: 15px;
`;
// end of styles

const MoviePageSidebar = (props) => {

    const formatBudget = () => {
        if (props.budget === "") return "-";
        return props.budget.toLocaleString();
    };

    const formatRevenue = () => {
        if (props.revenue === "") return "-";
        return props.revenue.toLocaleString();
    };

    const getProductionCompany = props.productionCompany.slice(0,4).map((company) => {
        return (
            <li key={company.id}>{company.name}</li>
        )
    });

    const getOtherCrew = props.credits.crew.slice(0,8).map((crew) => {
        if(crew.job !== "Director" && crew.job !== "Screenplay"){
            return (
                <li key={crew.credit_id}>
                    <p css={crewName}>{crew.name}</p>
                    <p css={crewDepartment}>{crew.job}</p>
                </li>
            )
        }
        return "";
    });

    return (
        <div css={sideContent}>
            <div>
                <h4>Budget</h4>
                <p>{ `$ ${formatBudget()}` }</p>
            </div>
            <div>
                <h4>Revenue</h4>
                <p>{ `$ ${formatRevenue()}` }</p>
            </div>
            <div>
                <h4>Status</h4>
                <p>{ props.status }</p>
            </div>
            <div>
                <h4>Production Company</h4>
                <ul>{ getProductionCompany }</ul>
            </div>
            <div css={otherCrewContainer}>
                <h4 css={crewTitle}>
                    Crews
                </h4>
                <ul>
                    { getOtherCrew }
                </ul>
            </div>
        </div>
    )
}

export default MoviePageSidebar