import React, { useEffect, useState } from "react";
import "./Main.scss";
import Feed from "./Feed";

function Main() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetch("/data/feeds.json")
      .then((res) => res.json())
      .then((data) => {
        setFeeds(data.feedData);
      });
  }, []);

  return (
    <section>
      <div id="header">
        <div className="icon-and-logo-box">
          <span className="header-logo-text">Justgram</span>
        </div>
        <input className="search" type="text" placeholder="검색"></input>
        <div class="right-icons">
          <img src="/images/direction.png" alt="탐색" />
          <img src="/images/news.png" alt="소식" />
          <img src="/images/user-profile.png" alt="팔로워" />
        </div>
      </div>
      <div id="feed-story-wrapper">
        <img src="/images/그림1.png" alt="스토리1" />
        <img src="/images/story2.png" alt="스토리2" />
        <img src="/images/story3.png" alt="스토리3" />
      </div>
      <div className="Feed-wrapper">
        {feeds.map((feed) => {
          return <Feed key={feed.feedId} feedData={feed} />;
        })}
      </div>
    </section>
  );
}

export default Main;
