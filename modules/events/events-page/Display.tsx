import { useEffect, useState, ChangeEvent } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import styled from "@emotion/styled";
import Image from "next/image";

import { gridSpacing } from "@/modules/themes/Constants";
import colors from "assets/_themes-vars.module.css";
import { useAppDispatch, useAppSelector } from "@/modules/redux/app/hooks";
import {
  selectMultipleFilteredSortedEvts,
  selectEventsLoaded,
  fetchEvents,
  selectEventsPerPage,
  addLoadingTimes,
  resetLoadingTimes,
} from "@/modules/events/events.slice";
import paginateList from "@/modules/pagination/paginateList";
import MyPagination from "@/modules/pagination/Pagination";
import useTimeConverter from "@/modules/utilities/useTimeConverter";
import pageVisit from "@/public/images/sidebar_icons/web-design.png";
import cart from "@/public/images/sidebar_icons/buy.png";
import newOrder from "@/public/images/sidebar_icons/order-history.png";
import login from "@/public/images/sidebar_icons/password.png";
import useColorAssigner from "@/modules/utilities/useColorAssigner";
import useSetDate from "@/modules/utilities/useSetDate";
import useToDayName from "@/modules/utilities/useToDayName";
import useToMonthName from "@/modules/utilities/useToMonthName";
import DisplaySkeleton from './DisplaySkeleton'
import { Skeleton } from "@mui/material";

type Props = {};

export default function Display({}: Props) {
  const dispatch = useAppDispatch();
  const timeConverter = useTimeConverter();
  const assignColor = useColorAssigner();
  const setDate = useSetDate();
  const toDayName = useToDayName();
  const toMonthName = useToMonthName();
  const multipleEvents = useAppSelector(selectMultipleFilteredSortedEvts);
  const eventsLoaded = useAppSelector(selectEventsLoaded);
  const eventsPerPage = useAppSelector(selectEventsPerPage);
  const loadingTimes = useAppSelector((state) => state.events.loadingCount);

  const [currentPage, setCurrentPage] = useState(1);
  const [firstEventTimestamp, setFirstEventTimestamp] = useState(0);
  let eventList = paginateList(multipleEvents, currentPage, eventsPerPage);
  const totalPages = Math.ceil(multipleEvents.length / eventsPerPage);

  useEffect(() => {
    // This is meant to reduce the endless loop that happens
    // when there no events in the database or when you filter
    // and there are no events for that filter
    if (multipleEvents.length === 0) {
      dispatch(fetchEvents());
    }

  }, [multipleEvents, dispatch]);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    if (eventsLoaded) setFirstEventTimestamp(eventList[0].meta.timestamp);
  }, [eventsLoaded]);

  const assignBorderColor = (event: string) => {
    if (
      event.includes("Page") ||
      event.includes("button") ||
      event.includes("search") ||
      event.includes("exit")
    ) {
      return "page-border";
    } else if (event.includes("Cart")) {
      return "cart-border";
    } else if (event.includes("Order") || event.includes("payment")) {
      return "order-border";
    } else if (
      event.includes("login") ||
      event.includes("register") ||
      event.includes("comment")
    ) {
      return "login-border";
    }
  };

  return (
    <Card
      sx={{
        border: "1px solid",
        borderColor: colors.primary200 + 75,
        ":hover": {
          boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)",
        },
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Timeline>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{
                  marginLeft: "-90%",
                }}
              ></TimelineOppositeContent>
              <TimelineSeparator className="mr-3">
                <TimelineDot className="rounded-full !bg-white !shadow-none !border-3 !border-[#0090d3] h-12 w-12 flex items-center justify-center">
                  <span className="text-sm font-bold text-black">
                    {eventsLoaded
                      ? setDate(eventList[0].meta.timestamp, "year")
                      : ""}
                  </span>
                </TimelineDot>
                <TimelineConnector className="h-6 bg-[#0090d3] w-1" />
              </TimelineSeparator>
              <TimelineContent></TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{
                  marginLeft: "-90%",
                }}
              ></TimelineOppositeContent>
              <TimelineSeparator className="mr-3">
                <TimelineDot className="rounded-full !bg-white h-5 w-5 !shadow-none !border-3 !border-[#0090d3]"></TimelineDot>
                <TimelineConnector className="h-14 bg-[#0090d3] w-1" />
              </TimelineSeparator>
              <TimelineContent className="bg-[#0090d3] h-10 flex items-center">
                <span className="font-bold text-base uppercase text-white ml-8">
                  {eventsLoaded
                    ? `${toMonthName(
                        setDate(firstEventTimestamp, "month")
                      )} ${setDate(firstEventTimestamp, "year")}`
                    : ""}
                </span>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent
                sx={{
                  marginLeft: "-90%",
                }}
              ></TimelineOppositeContent>
              <TimelineSeparator className="mr-3">
                <TimelineDot className="rounded-full !bg-white !text-black !font-bold flex items-center justify-center h-10 w-10 !shadow-none !border-3 !border-[#0090d3]">
                  {eventsLoaded ? setDate(firstEventTimestamp, "day") : ""}
                </TimelineDot>
                <TimelineConnector className="h-6 bg-[#0090d3] w-1" />
              </TimelineSeparator>
              <TimelineContent className="bg-white flex items-center h-14 mt-3">
                  {eventsLoaded
                    ? <Typography className="font-bold text-base uppercase text-black ml-7">{toDayName(setDate(firstEventTimestamp))}, {setDate(
                        firstEventTimestamp
                      )}</Typography>
                    : <Skeleton width='100%' height={60} />}
              </TimelineContent>
            </TimelineItem>
            {/* Information */}
            {eventsLoaded ?
              eventList.map((event, index) => (
                <Border>
                  <TimelineItem key={index}>
                    <TimelineOppositeContent
                      sx={{
                        marginLeft: "-90%",
                      }}
                    ></TimelineOppositeContent>
                    <TimelineSeparator className="mr-3">
                      <TimelineDot
                        className={`rounded-full flex items-center justify-center h-8 w-8 !shadow-none ${assignColor(
                          event.event
                        )}`}
                      >
                        {event.event.includes("Page") ||
                        event.event.includes("button") ||
                        event.event.includes("search") ||
                        event.event.includes("exit") ? (
                          <Image src={pageVisit} width={30} height={30} />
                        ) : null}

                        {event.event.includes("Cart") ? (
                          <Image src={cart} width={30} height={30} />
                        ) : null}

                        {event.event.includes("Order") ||
                        event.event.includes("payment") ? (
                          <Image src={newOrder} width={30} height={30} />
                        ) : null}

                        {event.event.includes("login") ||
                        event.event.includes("register") ||
                        event.event.includes("comment") || event.event.includes('contact') ? (
                          <Image src={login} width={30} height={30} />
                        ) : null}
                      </TimelineDot>
                      <TimelineConnector className="h-6 bg-[#0090d3] w-1" />
                    </TimelineSeparator>
                    <TimelineContent
                      className={`shadow-lg border-l-4 ${assignBorderColor(
                        event.event
                      )} flex items-center h-14 group mt-3`}
                    >
                      <Typography component="span" className="font-bold ml-7">
                        {timeConverter(event.meta.timestamp)}
                      </Typography>
                      <Typography className="!font-bold text-base text-black !ml-3">
                        <span>
                          {event.event} at {setDate(event.meta.timestamp)}
                        </span>
                      </Typography>
                      <Typography className="text-base text-black !ml-auto">
                        <span>{event.email}</span>
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Border>
              )) : <><DisplaySkeleton /> <DisplaySkeleton /> <DisplaySkeleton /></>}
            <Grid container justifyContent="center">
              <MyPagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Grid>
          </Timeline>
        </Grid>
      </Grid>
    </Card>
  );
}

export const Border = styled.div`
  .page {
    background-color: #2A97D7 !important;
  }

  .cart {
    background-color: #F36959 !important;
  }

  .order {
    background-color: #A24A92 !important;
  }

  .login {
    background-color: #fcc914 !important;
  }

  .page-border {
    border-color: #2a97d7 !important;
  }

  .cart-border {
    border-color: #f36959 !important;
  }

  .order-border {
    border-color: #a24a92 !important;
  }

  .login-border {
    border-color: #fcc914 !important;
  }
`;
