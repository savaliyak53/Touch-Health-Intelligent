import React, {useState} from "react"
import "./index.scss"

const FloatLabel = (props: any) => {
    const [focus, setFocus] = useState(false);
    const { children, label, value, isUsername } = props;
    // const labelClass = focus || (value && value.length !== 0) ? "label label-float" : "label";
    return (
      <div
        className={`float-label `}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      >
        {children}
        {/* <label className={`${labelClass} ${isUsername ? 'username-float' : ''}`} style={{display:'none'}}>{label}</label> */}
      </div>  )
}

export default FloatLabel;