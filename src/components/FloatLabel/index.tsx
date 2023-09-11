import React, {useState} from "react"
import "./index.scss"

const FloatLabel = (props: any) => {
    const [focus, setFocus] = useState(false);
    const { children, label, value, isUsername } = props;
    return (
      <div
        className={`float-label `}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      >
        {children}
      </div>  )
}

export default FloatLabel;