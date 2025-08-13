"use client";

import TimeAgoComponent from "react-timeago";
interface dateProps{
    date:Date
}
function TimeAgo(date:dateProps) {
    return <TimeAgoComponent date={date.date} />;
}

export default TimeAgo;