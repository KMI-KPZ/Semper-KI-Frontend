import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const SvgrMock = forwardRef((props, ref) => <span ref={ref} {...props} />);

SvgrMock.displayName = "SvgrMock";

export const ReactComponent = SvgrMock;
export default SvgrMock;