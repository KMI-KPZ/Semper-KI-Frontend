import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HomeContainer from "../../components/Container";
import { useFlatOrders } from "@/pages/Orders/hooks/useFlatOrders";
import AddIcon from "@mui/icons-material/Add";

interface HomeAnonymOrderProps {}

const HomeAnonymOrder: React.FC<HomeAnonymOrderProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { ordersQuery } = useFlatOrders();

  return (
    <HomeContainer data-testid="home-anonym-order">
      <div className="flex w-full max-w-4xl flex-col items-center gap-5 md:flex-row md:justify-between md:gap-40">
        <div className="flex w-full flex-col items-start justify-center gap-5">
          <Heading variant="h2" className="text-7xl">
            {t("Home.Home.Anonym.Order.title")}
          </Heading>
          <Heading variant="subtitle" className="pl-5">
            {t("Home.Home.Anonym.Order.subTitle")}
          </Heading>
        </div>
        <div className="flex w-fit flex-col items-end gap-5">
          {ordersQuery.data !== undefined && ordersQuery.data.length > 0 ? (
            <>
              <Button
                title={t("Home.Home.Anonym.Order.button.continue")}
                to="/orders"
                startIcon={<PlayArrowIcon fontSize="large" />}
              />
              <Button
                title={t("Home.Home.Anonym.Order.button.new")}
                to="/order/new"
                startIcon={<AddIcon fontSize="large" />}
              />
            </>
          ) : (
            <Button
              to="/order/new"
              title={t("Home.Home.Anonym.Order.button.demo")}
              startIcon={<PlayArrowIcon fontSize="large" />}
            />
          )}
        </div>
      </div>
    </HomeContainer>
  );
};

export default HomeAnonymOrder;
