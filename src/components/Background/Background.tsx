import React from "react";
import Bubbles1TransURL from "../../assets/images/Bubbles1_Trans.png";
import Bubbles2TransURL from "../../assets/images/Bubbles2_Trans.png";
import Bubbles3TransURL from "../../assets/images/Bubbles3_Trans.png";

interface Props {}

const Background: React.FC<Props> = (props) => {
  return (
    <div
      className="fixed left-0 top-0 -z-10
     h-full min-h-[200px] w-full
     overflow-hidden bg-gradient-to-tr from-türkis-800 to-blau-800 brightness-125 grayscale-[30%]
     "
    >
      <div className="hidden h-full w-full opacity-10 grayscale-[40%]">
        <img
          alt=""
          className="absolute -left-[10%] -top-[10%] h-1/6 md:h-2/6 lg:h-3/6 xl:h-4/5 "
          src={Bubbles3TransURL}
        />
        <img
          alt=""
          className="absolute -right-[10%] top-20 h-1/6 md:h-2/6 lg:h-3/6 xl:-top-[10%] xl:h-4/6"
          src={Bubbles1TransURL}
        />
        <img
          alt=""
          className="absolute -bottom-[20%] right-[30%] hidden h-1/2 xl:block"
          src={Bubbles2TransURL}
        />
      </div>
      <svg
        className="opacity-10"
        id="patternId"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="72.69"
            height="42"
            patternTransform="scale(2) rotate(20)"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="hsla(0, 0%, 0%, 1)"
            />
            <path
              d="M0 0v9.09l19.4 11.2 4.83-2.8 3.03-5.24v-5.6L15.72 0Zm28.48 0v16.45L9.09 27.66v5.59l3.02 5.25 4.84 2.8 19.4-11.22L55.73 41.3l4.83-2.8 3.03-5.25v-5.58l-19.4-11.2V0Zm28.48 0L45.43 6.66v5.59l3.03 5.25 4.83 2.79 19.4-11.2V0ZM0 12.25V42h15.74l-7.87-4.55v-22.4l-4.84-2.8Zm69.66 0-4.84 2.8v22.4L56.95 42H72.7V12.25Zm-36.34 21-4.84 2.8V42H44.2v-5.96l-4.84-2.8z"
              strokeWidth="1"
              stroke="none"
              fill="hsla(180, 32%, 28%, 1)"
            />
            <path
              d="m18.17 0 9.09 5.25V0Zm27.26 0v5.25L54.52 0ZM63.6 15.74 54.5 21l9.1 5.25v-10.5Zm-54.51 0v10.5L18.17 21Zm18.17 21L18.16 42h9.1zm18.17 0V42h9.06l.02-.01zM54.5 42h.01z"
              strokeWidth="1"
              stroke="none"
              fill="hsla(224, 37%, 51%, 1)"
            />
            <path
              d="M0 0v3.5l24.23 14 3.02-1.75v-3.5L6.06 0Zm33.32 0v19.24l-24.23 14v3.5l3.02 1.76 24.23-14 24.23 14 3.03-1.75v-3.5l-24.23-14V0Zm33.31 0-21.2 12.25v3.5l3.03 1.74 24.23-14v.01V0Zm6.06 10.5-3.03 1.75v28L66.62 42h6.07V10.5ZM0 10.5V42h6.05l-3.02-1.74V12.25Zm36.34 21-3.02 1.74V42h6.05v-8.75Z"
              strokeWidth="1"
              stroke="none"
              fill="hsla(224, 37%, 18%, 1)"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#a)"
        />
      </svg>
    </div>
  );
};

export default Background;
