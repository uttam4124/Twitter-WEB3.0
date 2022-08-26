import React from "react";
import "./TweetInFeed.css";
// import golf from "../images/golf.png";
// import canoe from "../images/canoe.png";
import { defaultImgs } from "../defaultimgs";
// import { Icons, Widget } from "web3uikit";
import { Icon } from "web3uikit";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const TweetInFeed = ({ profile }) => {
  const [tweetArr, setTweetArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();
        setTweetArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getTweets();
  }, [profile]);

  return (
    <>
      {tweetArr
        ?.map((e) => {
          return (
            <>
              <div className="feedTweet">
                <img
                  src={
                    e.attributes.tweeterPfp
                      ? e.attributes.tweeterPfp
                      : defaultImgs[0]
                  }
                  className="profilePic"
                ></img>
                <div className="completeTweet">
                  <div className="who">
                    {e.attributes.tweeterUsername.slice(0, 6)}
                    <div className="accWhen">
                      {`${e.attributes.tweeterAcc.slice(
                        0,
                        4
                      )}...${e.attributes.tweeterAcc.slice(38)}
                ${e.attributes.createdAt.toLocalestring("en-us", {
                  month: "short",
                })}

${e.attributes.createdAt.toLocalestring(`en-us`, { day: "numeric" })}
`}
                    </div>
                  </div>
                  <div className="tweetContent">
                    {" "}
                    .{e.attributes.tweetTxt}
                    {e.attributes.tweetImg && (
                      <img
                        src={e.attributes.tweetImg}
                        className="tweetImg"
                      ></img>
                    )}
                  </div>
                  <div className="interactions">
                    <div className="interactionNums">
                      <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                    </div>
                    <div className="interactionNums">
                      <Icon fill="#3f3f3f" size={20} svg="star" />
                      12
                    </div>
                    <div className="interactionNums">
                      <Icon fill="#3f3f3f" size={20} svg="matic" />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
        .reverse()}

      {/* /* <div className="feedTweet">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            hjhhk
            <div className="accWhen">0x2e456...678</div>
          </div>
          <div className="tweetContent">
            Nice day
            <img src={golf} className="tweeting"></img>
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div>
      <div className="feedTweet"></div> ?
     */}
    </>
  );
};
export default TweetInFeed;
