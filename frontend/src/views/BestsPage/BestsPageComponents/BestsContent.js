import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import BestsTeamTable from "./BestsTeamTable";
import BestsPlayerTable from "./BestsPlayerTable";
import BestsSweepstakeTable from "./BestsSweepstakeTable";
import GroupIcon from "@material-ui/icons/Group";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CustomTabs from "../../../components/CustomTabs/CustomTabs";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

function BestsContent(props) {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} lg={12}>
          <CustomTabs
            headerColor="primary"
            tabs={[
              {
                tabName: "En İyi Takımlar",
                tabIcon: GroupIcon,
                tabContent: <BestsTeamTable />,
              },
              {
                tabName: "En İyi Oyuncular",
                tabIcon: AccountCircleIcon,
                tabContent: <BestsPlayerTable />,
              },
              {
                tabName: "Çekiliş Sıralaması",
                tabIcon: CardGiftcardIcon,
                tabContent: <BestsSweepstakeTable />
              }
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default BestsContent;
